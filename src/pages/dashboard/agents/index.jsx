import React, { useEffect, useState } from "react";
import Table from "../../../components/ui/table/Table";
import ApiService from "../../../services/Api_services";
import { toast } from "react-hot-toast";
import Badge, { enums } from "../../../components/ui/badge";
import Modal from "../../../components/ui/modal";
import { Formik } from "formik";
import Input from "../../../components/ui/input";
import { BiIdCard } from "react-icons/bi";
import Select from "../../../components/ui/select";
import { RiLockPasswordLine } from "react-icons/ri";
import Button from "../../../components/ui/button";
import { Link2Icon, MailIcon, Phone, User2Icon } from "lucide-react";
import { addNewsDto, agentSchema, agentUpdateSchema } from "../../../schemas";
import ConfirmationModal from "../../../components/confirmationModal";
import { SlLocationPin } from "react-icons/sl";
import useFetch from "../../../hooks/useFetch";

const initialModalState = {
  state: false,
  edit_id: "",
  data: {
    title: "",
    firstName: "",
    LastName: "",
    role: "",
    Email: "",
    Phone: "",
    city: "",
    password: "",
    workUnder: "",
    designation: "",
  },
};
function Agents() {
  const [modal, setModal] = useState(initialModalState);
  const [agents, setAgents] = useState({
    loading: true,
    data: [],
  });
  const [confirmModal, setConfirmModal] = useState({
    state: false,
    id: null,
  });
  function renderModal() {
    const { state, edit_id, data } = modal;

    return (
      <Modal
        title={edit_id ? "Update Agent" : "Add Agent"}
        open={state}
        setOpen={() => setModal(initialModalState)}
      >
        <Formik
          enableReinitialize={true}
          validationSchema={edit_id ? agentUpdateSchema : agentSchema}
          initialValues={data}
          onSubmit={async (values, action) => {
            try {
              if (!edit_id) {
                if (!values.workUnder) delete values.workUnder;
                const payload = values;
                if (values.workUnder)
                  payload.workUnder = Number(values.workUnder);
                const res = await ApiService.fetchData({
                  url: `api/agent/employee`,
                  method: "POST",
                  data: payload,
                });
                if (res) toast.success(res.data.message);
                setAgents((prev) => ({
                  ...prev,
                  data: [...prev.data, res.data.data],
                }));
                setModal(initialModalState);
              } else {
                const payload = values;
                payload.workUnder = Number(values.workUnder);
                if (!values.workUnder) delete payload.workUnder;
                if (!values.password) delete payload.password;
                const res = await ApiService.fetchData({
                  url: `api/agent/${edit_id}`,
                  method: "PUT",
                  data: payload,
                });
                if (res) toast.success(res.data.message);
                setAgents((prev) => ({
                  ...prev,
                  data: prev.data.map((n) =>
                    n.id === +edit_id ? res.data.data : n
                  ),
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
          {(f) => (
            <form
              onSubmit={f.handleSubmit}
              className="w-full pt-4 rounded-b-md pb-8 flex flex-col gap-4 px-4 bg-white"
            >
              <Select
                onChange={f.handleChange}
                name={"title"}
                value={f.values.title}
                onBlur={f.handleBlur}
                error={f.touched.title && f.errors.title}
                label={""}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              >
                <option value={" "}>Select title</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Miss.</option>
                <option>Dr.</option>
              </Select>
              <Input
                name="firstName"
                onChange={f.handleChange}
                value={f.values.firstName}
                onBlur={f.handleBlur}
                error={f.touched.firstName && f.errors.firstName}
                icon={<User2Icon className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"First Name"}
              />
              <Input
                name="LastName"
                onChange={f.handleChange}
                value={f.values.LastName}
                onBlur={f.handleBlur}
                error={f.touched.LastName && f.errors.LastName}
                icon={<User2Icon className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Last Name"}
              />
              <Select
                label={""}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                name={"role"}
                value={f.values.role}
                error={f.touched.role && f.errors.role}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              >
                <option value={" "}>Select Post</option>
                <option value={"AGENT"}>Agent</option>
                <option value={"DEALERSHIP"}>Dealership</option>
                <option value={"FEILDOFFICER"}>Field Officer</option>
              </Select>
              <Input
                name="city"
                onChange={f.handleChange}
                value={f.values.city}
                onBlur={f.handleBlur}
                error={f.touched.city && f.errors.city}
                type={"text"}
                icon={<SlLocationPin className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"City"}
              />
              <Input
                name="designation"
                onChange={f.handleChange}
                value={f.values.designation}
                onBlur={f.handleBlur}
                error={f.touched.designation && f.errors.designation}
                icon={<User2Icon className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Designation"}
              />
              <Input
                name="Phone"
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.Phone}
                error={f.touched.Phone && f.errors.Phone}
                icon={<Phone className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Mobile Number"}
              />
              <Input
                name="Email"
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.Email}
                error={f.touched.Email && f.errors.Email}
                icon={<MailIcon className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Email Address"}
              />
              <Select
                onChange={f.handleChange}
                name={"workUnder"}
                value={f.values.workUnder}
                onBlur={f.handleBlur}
                error={f.touched.workUnder && f.errors.workUnder}
                label={""}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              >
                <option value={" "}>Work Under</option>
                {agents.data.map((a) => (
                  <option
                    key={a.id}
                    value={a.id}
                  >{`${a.firstName} ${a.LastName} (${a.employeeCode})`}</option>
                ))}
              </Select>
              <Input
                name="password"
                label=""
                type="password"
                placeholder="Password"
                value={f.values.password}
                onBlur={f.handleBlur}
                onChange={f.handleChange}
                icon={<RiLockPasswordLine className="text-indigo-600" />}
                error={f.touched.password && f.errors.password}
              />
              <Button
                loading={f.isSubmitting}
                loadingText={edit_id ? "Updating..." : "Adding..."}
                disabled={f.isSubmitting}
                size={"NORMAL"}
                type={"submit"}
              >
                {edit_id ? "Update" : "Add Agent"}
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
    );
  }

  function edit(id) {
    const OneNews = agents.data.find((n) => Number(n.id) === id);
    setModal((prev) => ({
      ...prev,
      edit_id: id,
      state: true,
      data: {
        title: OneNews.title,
        firstName: OneNews.firstName,
        LastName: OneNews.LastName,
        role: OneNews.role,
        Email: OneNews.email,
        Phone: OneNews.phone,
        city: OneNews.city,
        password: "",
        designation: OneNews.designation,
        workUnder: OneNews.managedById || "",
      },
    }));
  }

  useEffect(() => {
    FetchNews();
  }, []);
  async function FetchNews() {
    try {
      const res = await ApiService.fetchData({
        url: `api/agent/employee`,
        method: "GET",
      });
      setAgents((prev) => ({
        ...prev,
        loading: false,
        data: res.data.data,
      }));
    } catch (error) {
      toast.error(error.response.data.message);
      setAgents((prev) => ({
        ...prev,
        loading: false,
        data: [],
      }));
    }
  }

  const columns = () => [
    {
      Header: "Employee id",
      accessor: "employeeCode",
    },
    {
      Header: "name",
      accessor: (e) => `${e.title} ${e.firstName} ${e.LastName}`,
    },
    {
      Header: "role",
      accessor: "role",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "designation",
      accessor: "designation",
    },
    {
      Header: "city",
      accessor: "city",
    },
    {
      Header: "phone",
      accessor: "phone",
    },
    {
      Header: "Working Under",
      accessor: (e) =>
        e.managedBy
          ? `${e.managedBy.firstName} ${e.managedBy.LastName} ( ${e.managedBy.employeeCode} ) `
          : "N/A",
    },
    // {
    //   Header: "resume",
    //   accessor: (e) =>
    //     e?.resume ? (
    //       <a className="hover:underline text-blue-800" href={e?.resume?.url}>
    //         resume
    //       </a>
    //     ) : (
    //       "N/A"
    //     ),
    // },
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
            Remove
          </Badge>
        </span>
      ),
    },
  ];

  return (
    <>
      {renderModal()}
      <ConfirmationModal
        description="Do you really want to Reject this Agent?"
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
            url: `api/agent/${confirmModal.id}`,
            method: "DELETE",
          });
          if (res) toast.success(res.data.message);
          FetchNews();
          setConfirmModal((prev) => ({
            state: false,
            id: null,
          }));
        }}
      />

      <Table
        btnText={"Add Agent"}
        btnfunc={() =>
          setModal((prev) => ({
            state: true,
            data: initialModalState.data,
            edit_id: initialModalState.edit_id,
          }))
        }
        title="Employee"
        subtitle={"Employees of your company"}
        dataName={"Employees"}
        data={agents.data}
        columns={columns()}
      />
    </>
  );
}

export default Agents;
