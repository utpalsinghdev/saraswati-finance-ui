import React, { useEffect, useState } from "react";
import {
  BsFilePersonFill,
  BsFillTelephoneFill,
  BsGenderAmbiguous,
} from "react-icons/bs";
import { RiEarthFill } from "react-icons/ri";
import { FaHospitalAlt, FaUserAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import moment, { isMoment } from "moment/moment";
import Table from "../../../components/ui/table/Table";
import Modal from "../../../components/ui/modal";
import { Formik } from "formik";
import ApiService from "../../../services/Api_services";
import toast from "react-hot-toast";
import Input from "../../../components/ui/input";
import Button from "../../../components/ui/button";
import { CalculatorIcon } from "lucide-react";
import Select from "../../../components/ui/select";
import Badge, { enums } from "../../../components/ui/badge";
import ConfirmationModal from "../../../components/confirmationModal";
const initialModalState = {
  state: false,
  edit_id: "",
  data: {
    name: "EMI",
    date: "",
    status: "done",
    amount: "",
  },
};
const CustomerProfile = () => {
  const { id } = useParams();
  const [fetching, setFetching] = useState(true);
  const customer = useFetch(`api/customer/get-one/${id}`, [fetching]);
  const [modal, setModal] = useState(initialModalState);
  const [delteId, setDeleteId] = useState();
  const [news, setNews] = useState({
    loading: true,
    data: [],
  });
  const terms = [
    "EMI",
    "PAYMENT",
    "SUBSIDY",
    "login_fee",
    "Disburse",
    "Emi_date",
    "Closed",
    "Disburse_verify",
    "sanction",
    "bank_verification",
    "sing_kit",
  ];

  function renderModal() {
    const { state, edit_id, data } = modal;

    return (
      <Modal
        title="Add Event"
        open={state}
        setOpen={() => setModal(initialModalState)}
      >
        <Formik
          initialValues={data}
          onSubmit={async (values, action) => {
            try {
              const payload = {
                ...values,
                customerId: Number(id),
                date: values.date + "T00:00:00.985Z",
              };
              if (values.date && values.name !== "Emi_date")
                delete payload.date;
              if (edit_id) {
                if (values.date === "") delete payload.date;
                if (payload.date === "nullT00:00:00.985Z") delete payload.date;
                const res = await ApiService.fetchData({
                  url: `api/event/${edit_id}`,
                  method: "PUT",
                  data: payload,
                });
                setFetching((prev) => !prev);
                toast.success(res.data.message);
              } else {
                if (values.date === "") delete payload.date;
                const res = await ApiService.fetchData({
                  url: `api/event`,
                  method: "post",
                  data: payload,
                });
                setFetching((prev) => !prev);
                toast.success(res.data.message);
              }
              setModal(initialModalState);
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
              className="w-full pt-4 rounded-b-md pb-8 flex flex-col gap-3 px-4 bg-white"
            >
              <Select
                label={""}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required={true}
              >
                {terms.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Select>

              {formik.values.name === "Emi_date" ? (
                <Input
                  label={""}
                  type={"date"}
                  name={"date"}
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required={true}
                />
              ) : (
                <Input
                  label={""}
                  type={"text"}
                  name={"amount"}
                  placeholder={"Enter the Amount"}
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required={true}
                />
              )}
              <Select
                label={""}
                name="status"
                value={formik.values.status}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required={true}
              >
                <option value="done">done</option>
                <option value="pending">pending</option>
              </Select>
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
  const columns = () => [
    {
      Header: "event",
      accessor: "name",
    },
    {
      Header: "status",
      accessor: "status",
    },
    {
      Header: "amount",
      accessor: "amount",
    },
    {
      Header: "date",
      accessor: (e) =>
        moment(e.date).format("DD/MM/YYYY")
          ? moment(e.date).format("DD/MM/YYYY")
          : e.date,
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: ({ row }) => (
        <div className="flex flex-row gap-4">
          <Badge
            onClick={() => {
              setModal((prev) => ({
                ...prev,
                state: true,
                edit_id: row.original.id,
                data: {
                  name: row.original.name,
                  date: row.original.date,
                  status: row.original.status,
                  amount: row.original.amount,
                },
              }));
            }}
            type={enums.GREEN}
          >
            Edit
          </Badge>
          <Badge
            onClick={() => {
              setDeleteId(row.original.id);
            }}
            type={enums.RED}
          >
            Delete
          </Badge>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-row gap-5 mt-5 w-full mb-10">
        {renderModal()}
        <div className=" border-solid border w-full flex  border-gray-200 bg-gray-50 h-auto pb-4  rounded-md">
          <div className="flex-1">
            <div className="block text-lg font-bold  px-4 py-4 sm:px-6">
              <h1 className="hover:underline text-gray-900 text-lg  font-medium leading-6">
                {customer.data?.name}
              </h1>
              <span className="font-bold text-gray-700 text-sm">
                Date OF Birth:{" "}
                <span className="text-gray-500 text-sm">
                  {" "}
                  {moment(customer.data?.dob).format("DD/MM/YYYY")}{" "}
                </span>
              </span>
            </div>
            <div className="text-sm  text-gray-500">
              <div className="px-4 py-1 space-y-1 sm:px-6">
                <p className="text-sm flex items-center gap-2">
                  {" "}
                  <BsFillTelephoneFill /> Mobile : +91 {customer.data?.phone}
                </p>
                <p className="text-sm flex items-center gap-2">
                  {" "}
                  <RiEarthFill /> Address : {customer.data?.address}
                </p>
              </div>
            </div>
          </div>

          <div className="w-[30%] flex items-center justify-center">
            {customer.data?.photo?.url ? (
              <img src={customer.data.photo.url} className="w-32" />
            ) : (
              <FaUserAlt size={100} className="text-gray-400" />
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isDelete={true}
        open={!!delteId}
        setOpen={() => setDeleteId(null)}
        onDelete={async () => {
          try {
            const res = await ApiService.fetchData({
              url: `api/event/${delteId}`,
              method: "delete",
            });
            if (res) toast.success("Event Deleted Successfully");
            setFetching((prev) => !prev);
          } catch (error) {
            toast.error(error.response.data.message);
          } finally {
            setDeleteId(null);
          }
        }}
      />
      <Table
        btnText={"Add Event"}
        btnfunc={() =>
          setModal((prev) => ({
            ...prev,
            state: true,
            data: initialModalState.data,
          }))
        }
        title="Event"
        subtitle={"Events to display on website"}
        dataName={"Events"}
        data={customer.data.events ? customer.data.events : []}
        columns={columns()}
      />
    </>
  );
};

export default CustomerProfile;
