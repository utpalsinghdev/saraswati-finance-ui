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
import { addNewsDto, agentSchema } from "../../../schemas";
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
function LoanApplication() {
  const [modal, setModal] = useState(initialModalState);
  const [applications, setApplications] = useState({
    loading: true,
    data: [],
  });
  const [confirmModal, setConfirmModal] = useState({
    state: false,
    id: null,
  });

  //   const allEmployees = useFetch(`api/agent/employee`);
  //   function renderModal() {
  //     const { state, edit_id, data } = modal;

  //     return (
  //       <Modal
  //         title="Approve Agent"
  //         open={state}
  //         setOpen={() => setModal(initialModalState)}
  //       >
  //         <Formik
  //           enableReinitialize={true}
  //           validationSchema={agentSchema}
  //           initialValues={data}
  //           onSubmit={async (values, action) => {
  //             try {
  //               const payload = values;
  //               if (values.workUnder)
  //                 payload.workUnder = Number(values.workUnder);
  //               const res = await ApiService.fetchData({
  //                 url: `api/agent-application/${edit_id}`,
  //                 method: "POST",
  //                 data: payload,
  //               });
  //               if (res) toast.success(res.data.message);
  //               setApplications((prev) => ({
  //                 ...prev,
  //                 data: prev.data.filter((n) => n.id !== Number(edit_id)),
  //               }));
  //               setModal(initialModalState);
  //             } catch (error) {
  //               toast.error(error.response.data.message);
  //             } finally {
  //               action.resetForm();
  //               action.setSubmitting(false);
  //             }
  //           }}
  //         >
  //           {(f) => (
  //             <form
  //               onSubmit={f.handleSubmit}
  //               className="w-full pt-4 rounded-b-md pb-8 flex flex-col gap-4 px-4 bg-white"
  //             >
  //               <Select
  //                 onChange={f.handleChange}
  //                 name={"title"}
  //                 value={f.values.title}
  //                 onBlur={f.handleBlur}
  //                 error={f.touched.title && f.errors.title}
  //                 label={""}
  //                 icon={<BiIdCard className="w-4 text-indigo-500" />}
  //               >
  //                 <option value={" "}>Select title</option>
  //                 <option>Mr.</option>
  //                 <option>Mrs.</option>
  //                 <option>Miss.</option>
  //                 <option>Dr.</option>
  //               </Select>
  //               <Input
  //                 name="firstName"
  //                 onChange={f.handleChange}
  //                 value={f.values.firstName}
  //                 onBlur={f.handleBlur}
  //                 error={f.touched.firstName && f.errors.firstName}
  //                 icon={<User2Icon className="w-4 text-indigo-500" />}
  //                 label={""}
  //                 placeholder={"First Name"}
  //               />
  //               <Input
  //                 name="LastName"
  //                 onChange={f.handleChange}
  //                 value={f.values.LastName}
  //                 onBlur={f.handleBlur}
  //                 error={f.touched.LastName && f.errors.LastName}
  //                 icon={<User2Icon className="w-4 text-indigo-500" />}
  //                 label={""}
  //                 placeholder={"Last Name"}
  //               />
  //               <Select
  //                 label={""}
  //                 onChange={f.handleChange}
  //                 onBlur={f.handleBlur}
  //                 name={"role"}
  //                 value={f.values.role}
  //                 error={f.touched.role && f.errors.role}
  //                 icon={<BiIdCard className="w-4 text-indigo-500" />}
  //               >
  //                 <option value={" "}>Select Post</option>
  //                 <option value={"AGENT"}>Agent</option>
  //                 <option value={"DEALERSHIP"}>Dealership</option>
  //                 <option value={"FEILDOFFICER"}>Field Officer</option>
  //               </Select>
  //               <Input
  //                 name="city"
  //                 onChange={f.handleChange}
  //                 value={f.values.city}
  //                 onBlur={f.handleBlur}
  //                 error={f.touched.city && f.errors.city}
  //                 type={"text"}
  //                 icon={<SlLocationPin className="w-4 text-indigo-500" />}
  //                 label={""}
  //                 placeholder={"City"}
  //               />
  //               <Input
  //                 name="designation"
  //                 onChange={f.handleChange}
  //                 value={f.values.designation}
  //                 onBlur={f.handleBlur}
  //                 error={f.touched.designation && f.errors.designation}
  //                 icon={<User2Icon className="w-4 text-indigo-500" />}
  //                 label={""}
  //                 placeholder={"Designation"}
  //               />
  //               <Input
  //                 name="Phone"
  //                 onChange={f.handleChange}
  //                 onBlur={f.handleBlur}
  //                 value={f.values.Phone}
  //                 error={f.touched.Phone && f.errors.Phone}
  //                 icon={<Phone className="w-4 text-indigo-500" />}
  //                 label={""}
  //                 placeholder={"Mobile Number"}
  //               />
  //               <Input
  //                 name="Email"
  //                 onChange={f.handleChange}
  //                 onBlur={f.handleBlur}
  //                 value={f.values.Email}
  //                 error={f.touched.Email && f.errors.Email}
  //                 icon={<MailIcon className="w-4 text-indigo-500" />}
  //                 label={""}
  //                 placeholder={"Email Address"}
  //               />
  //               <Select
  //                 onChange={(e) => {
  //                   f.setValues((prev) => ({
  //                     ...prev,
  //                     workUnder: Number(e.target.value),
  //                   }));
  //                   f.handleChange(e);
  //                 }}
  //                 name={"title"}
  //                 value={f.values.workUnder}
  //                 onBlur={f.handleBlur}
  //                 error={f.touched.workUnder && f.errors.workUnder}
  //                 label={""}
  //                 icon={<BiIdCard className="w-4 text-indigo-500" />}
  //               >
  //                 <option value={""}>Select A Agent</option>
  //                 {allEmployees.data.map((a) => (
  //                   <option
  //                     key={a.id}
  //                     value={a.id}
  //                   >{`${a.firstName} ${a.LastName} (${a.employeeCode})`}</option>
  //                 ))}
  //               </Select>
  //               <Input
  //                 name="password"
  //                 label=""
  //                 type="password"
  //                 placeholder="Password"
  //                 value={f.values.password}
  //                 onBlur={f.handleBlur}
  //                 onChange={f.handleChange}
  //                 icon={<RiLockPasswordLine className="text-indigo-600" />}
  //                 error={f.touched.password && f.errors.password}
  //               />
  //               <Button
  //                 loading={f.isSubmitting}
  //                 loadingText={"Approving..."}
  //                 disabled={f.isSubmitting}
  //                 size={"NORMAL"}
  //                 type={"submit"}
  //               >
  //                 Approve
  //               </Button>
  //             </form>
  //           )}
  //         </Formik>
  //       </Modal>
  //     );
  //   }

  function approve(id) {
    const OneNews = applications.data.find((n) => Number(n.id) === id);
    setModal((prev) => ({
      ...prev,
      edit_id: id,
      state: true,
      data: {
        title: OneNews.title,
        firstName: OneNews.firstName,
        LastName: OneNews.LastName,
        role: OneNews.role,
        Email: OneNews.Email,
        Phone: OneNews.Phone,
        city: OneNews.city,
        password: "",
        designation: OneNews.designation,
        workUnder: "",
      },
    }));
  }

  useEffect(() => {
    FetchNews();
  }, []);
  async function FetchNews() {
    try {
      const res = await ApiService.fetchData({
        url: `api/customer`,
        method: "GET",
      });
      setApplications((prev) => ({
        ...prev,
        loading: false,
        data: res.data.data,
      }));
    } catch (error) {
      toast.error(error.response.data.message);
      setApplications((prev) => ({
        ...prev,
        loading: false,
        data: [],
      }));
    }
  }

  const columns = () => [
    {
      Header: "loan id",
      accessor: "loanId",
    },
    {
      Header: "name",
      accessor: "name",
    },
    {
      Header: "guardian relation",
      accessor: (e) =>
        e.guardian_relation === "SONOF"
          ? "S/O"
          : e.guardian_relation === "DOF"
          ? "D/O"
          : "W/O",
    },
    {
      Header: "guardian_name",
      accessor: "guardian_name",
    },
    {
      Header: "amount",
      accessor: "loanInNumber",
    },
    {
      Header: "amount (In words)",
      accessor: "loanInWords",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "dob",
      accessor: "dob",
    },
    {
      Header: "phone",
      accessor: "phone",
    },
    {
      Header: "loan FYear",
      accessor: "loanYear",
    },
    {
      Header: "address",
      accessor: "address",
    },
    {
      Header: "district",
      accessor: "district",
    },
    {
      Header: "State",
      accessor: "State",
    },
    {
      Header: "bank",
      accessor: "bank",
    },
    {
      Header: "AccountNumber",
      accessor: "AccountNumber",
    },
    {
      Header: "ifsc",
      accessor: "ifsc",
    },
    {
      Header: "accountType",
      accessor: "accountType",
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
    // {
    //   Header: "Action",
    //   accessor: "action",
    //   Cell: (cell) => (
    //     <span className="flex items-center justify-start gap-4">
    //       <Badge
    //         onClick={() => approve(cell.row.original.id)}
    //         type={enums.GREEN}
    //       >
    //         Approve
    //       </Badge>
    //       <Badge
    //         onClick={() =>
    //           setConfirmModal((prev) => ({
    //             state: true,
    //             id: Number(cell.row.original.id),
    //           }))
    //         }
    //         type={enums.RED}
    //       >
    //         Reject
    //       </Badge>
    //     </span>
    //   ),
    // },
  ];

  return (
    <>
      {/* {renderModal()} */}
      <ConfirmationModal
        description="Do you really want to Reject this Application?"
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
            url: `api/agent-application/${confirmModal.id}`,
            method: "DELETE",
          });
          if (res) toast.success(res.data.message);
          setApplications((prev) => ({
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
        title="Loan Applications"
        subtitle={"Application requested from website"}
        dataName={"Applications"}
        data={applications.data}
        columns={columns()}
      />
    </>
  );
}

export default LoanApplication;
