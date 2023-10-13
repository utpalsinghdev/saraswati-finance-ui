import React, { useEffect, useState } from "react";
import Table from "../../../components/ui/table/Table";
import ApiService from "../../../services/Api_services";
import { toast } from "react-hot-toast";
import Badge, { enums } from "../../../components/ui/badge";
import Modal from "../../../components/ui/modal";
import { Formik } from "formik";
import Input from "../../../components/ui/input";
import { BiUser } from "react-icons/bi";
import Select from "../../../components/ui/select";
import { RiUserSearchLine } from "react-icons/ri";
import Button from "../../../components/ui/button";
import { NewspaperIcon } from "@heroicons/react/24/outline";
import { Link2Icon } from "lucide-react";
import { addNewsDto } from "../../../schemas";
import ConfirmationModal from "../../../components/confirmationModal";
import Loader from "../../../components/loader";
import TextArea from "../../../components/ui/textarea";

const initialModalState = {
  state: false,
  edit_id: "",
  data: {
    text: "",
    lane: "FIRST",
  },
};
function News() {
  const [modal, setModal] = useState(initialModalState);
  const [confirmModal, setConfirmModal] = useState({
    state: false,
    id: null,
  });
  function renderModal() {
    const { state, edit_id, data } = modal;

    return (
      <Modal
        title="Add News"
        open={state}
        setOpen={() => setModal(initialModalState)}
      >
        <Formik
          validationSchema={addNewsDto}
          initialValues={data}
          onSubmit={async (values, action) => {
            try {
              if (edit_id) {
                const res = await ApiService.fetchData({
                  url: `api/news/${edit_id}`,
                  method: "PATCH",
                  data: values,
                });
                if (res) toast.success(res.data.message);
                setNews((prev) => ({
                  ...prev,
                  data: prev.data.map((n) =>
                    n.id === +edit_id ? res.data.data : n
                  ),
                }));
                setModal(initialModalState);
              } else {
                const res = await ApiService.fetchData({
                  url: `api/news`,
                  method: "POST",
                  data: values,
                });
                if (res) toast.success(res.data.message);
                setNews((prev) => ({
                  ...prev,
                  data: [...prev.data, res.data.data],
                }));
                setModal(initialModalState);
              }
            } catch (error) {
              toast.error(error.response.data.message);
            } finally {
              action.resetForm();
              action.setSubmitting(false);
            }
          }}
        >
          {(formik) => (
            <form
              onSubmit={formik.handleSubmit}
              className="w-full pt-4 rounded-b-md pb-8 flex flex-col gap-4 px-4 bg-white"
            >
              <TextArea
                row={3}
                label={""}
                type={"text"}
                name="text"
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.text && formik.errors.text}
                placeholder={"Enter Your News"}
                icon={<NewspaperIcon className="text-indigo-600 w-[18px]" />}
              />

              <Button
                loading={formik.isSubmitting}
                loadingText={modal.edit_id ? "Updating..." : "Saving..."}
                disabled={formik.isSubmitting}
                size={"NORMAL"}
                type={"submit"}
              >
                {modal.edit_id ? "Update" : "Save"}
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
    );
  }

  function edit(id) {
    const OneNews = news.data.find((n) => Number(n.id) === id);
    setModal((prev) => ({
      ...prev,
      edit_id: id,
      state: true,
      data: {
        text: OneNews.text,
        lane: OneNews.lane,
      },
    }));
  }

  const [news, setNews] = useState({
    loading: true,
    data: [],
  });

  useEffect(() => {
    FetchNews();
  }, []);
  async function FetchNews() {
    try {
      const res = await ApiService.fetchData({
        url: `api/news`,
        method: "GET",
      });
      setNews((prev) => ({
        ...prev,
        loading: false,
        data: res.data.data,
      }));
    } catch (error) {
      toast.error(error.response.data.message);
      setNews((prev) => ({
        ...prev,
        loading: false,
        data: [],
      }));
    }
  }

  const columns = () => [
    {
      Header: "News",
      accessor: "text",
    },
    {
      Header: "Created At",
      accessor: "createdAt",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (cell) => (
        <span className="flex items-center justify-start gap-4">
          <Badge onClick={() => edit(cell.row.original.id)} type={enums.GREEN}>
            Edit
          </Badge>
          <Badge
            onClick={() =>
              setConfirmModal((prev) => ({
                state: true,
                id: Number(cell.row.original.id),
              }))
            }
            type={enums.RED}
          >
            Delete
          </Badge>
        </span>
      ),
    },
  ];

  return news.loading ? (
    <Loader />
  ) : (
    <>
      {renderModal()}
      <ConfirmationModal
        description="Do you really want to delete this news?"
        isDelete
        open={confirmModal.state}
        setOpen={() => {
          setConfirmModal({
            state: false,
            id: null,
          });
        }}
        onDelete={async () => {
          const res = await ApiService.fetchData({
            url: `api/news/${confirmModal.id}`,
            method: "DELETE",
          });
          if (res) toast.success(res.data.message);
          setNews((prev) => ({
            ...prev,
            data: prev.data.filter((n) => n.id !== Number(confirmModal.id)),
          }));
          setConfirmModal((prev) => ({
            state: false,
            id: null,
          }));
        }}
      />

      <Table
        btnText={"Add News"}
        btnfunc={() =>
          setModal((prev) => ({
            ...prev,
            state: true,
            data: initialModalState.data,
          }))
        }
        title="News"
        subtitle={"News to display on website"}
        dataName={"News"}
        data={news.data}
        columns={columns()}
      />
    </>
  );
}

export default News;
