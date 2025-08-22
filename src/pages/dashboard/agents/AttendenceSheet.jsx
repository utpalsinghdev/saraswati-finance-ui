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
import { RiLockPasswordLine, RiRestartLine } from "react-icons/ri";
import { GiReturnArrow } from "react-icons/gi";
import Button from "../../../components/ui/button";
import { Link2Icon, MailIcon, Phone, User2Icon } from "lucide-react";
import { addNewsDto, agentSchema, agentUpdateSchema } from "../../../schemas";
import ConfirmationModal from "../../../components/confirmationModal";
import { SlLocationPin } from "react-icons/sl";
import useFetch from "../../../hooks/useFetch";
import Loader from "../../../components/loader";
import moment from "moment";
import Image from "../../../components/ui/Image/Index";
import ComboBox from "../../../components/ui/comboBox";
const generateRandomSixDigitNumber = () =>
    `${Math.floor(100000 + Math.random() * 900000)}`;
// const randomSixDigitNumber = ;

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
        password: generateRandomSixDigitNumber(),
        workUnder: "",
        designation: "",
        profilePic: "",
    },
};
function fileToBase64(file, callback) {
    if (!file) {
        callback("");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        callback(event.target.result.split(",")[1]);
    };

    reader.onerror = function () {
        callback("");
    };

    reader.readAsDataURL(file);
}
function AgentSheeet() {
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
                                if (values.profilePic) {
                                    await new Promise((resolve) => {
                                        fileToBase64(values.profilePic, (base64Data) => {
                                            payload.profilePic = base64Data;
                                            resolve();
                                        });
                                    });
                                }
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
                                if (values.profilePic) {
                                    await new Promise((resolve) => {
                                        fileToBase64(values.profilePic, (base64Data) => {
                                            payload.profilePic = base64Data;
                                            resolve();
                                        });
                                    });
                                }
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
                                    data: prev.data?.map((n) =>
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
                            <Input
                                name="profilePic"
                                type={"file"}
                                accept="image/*, png, jpeg, jpg"
                                onChange={(e) =>
                                    f.setValues((prev) => ({
                                        ...prev,
                                        profilePic: e.target.files[0],
                                    }))
                                }
                                onBlur={f.handleBlur}
                                required={edit_id ? false : true}
                                icon={<BiIdCard className="w-4 text-indigo-500" />}
                                label={"Profile Pic"}
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
                            <ComboBox
                                people={agents.data?.map((a) => ({
                                    id: a.id,
                                    name: `${a.firstName} ${a.LastName} (${a.employeeCode})`,
                                }))}
                                onChange={(e) => {
                                    console.log(e);
                                    f.setValues((prev) => ({
                                        ...prev,
                                        workUnder: e,
                                    }));
                                }}
                                name={"workUnder"}
                                value={f.values.workUnder}
                                onBlur={f.handleBlur}
                                error={f.touched.workUnder && f.errors.workUnder}
                                label={""}
                                icon={<BiIdCard className="w-4 text-indigo-500" />}
                            />
                            <span className="flex items-center gap-2 justify-between">
                                <Input
                                    name="password"
                                    label=""
                                    type="text"
                                    placeholder="Password"
                                    value={f.values.password}
                                    onBlur={f.handleBlur}
                                    onChange={f.handleChange}
                                    icon={<RiLockPasswordLine className="text-indigo-600" />}
                                    error={f.touched.password && f.errors.password}
                                />
                                <GiReturnArrow
                                    onClick={() => {
                                        f.setValues((prev) => ({
                                            ...prev,
                                            password: generateRandomSixDigitNumber(),
                                        }));
                                    }}
                                    className="text-indigo-500 cursor-pointer"
                                />
                            </span>
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
                url: `api/attendence`,
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
            accessor: (e) => e.employee.employeeCode,
        },

        {
            Header: "name",
            accessor: (e) =>
                `${e.employee.title} ${e.employee.firstName} ${e.employee.LastName}`,
        },

        {
            Header: "designation",
            accessor: (e) => e.employee.designation,
        },

        {
            Header: "Status",
            accessor: (s) => (
                <span
                    className={`px-2 py-1 rounded-md text-white text-xs ${s.status === "PENDING"
                            ? "bg-yellow-500"
                            : s.status === "PRESENT"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                >
                    {s.status}
                </span>
            ),
        },

        {
            Header: "Punched at",
            accessor: (e) => moment(e.createdAt).format("DD/MM/YYYY h:mm a"),
        },
        {
            Header: "Action",
            accessor: "action",
            Cell: (cell) => (
                <span className="flex items-center justify-start gap-4">
                    <Badge
                        onClick={async () => {
                            const cnf = window.confirm(
                                "Are you sure you want to confirm this punch?"
                            );
                            if (cnf) {
                                const res = await ApiService.fetchData({
                                    url: `api/attendence/mark-present/${cell.row.original.id}`,
                                    method: "GET",
                                });
                                if (res) toast.success(res.data.message);
                                FetchNews();
                            }
                        }}
                        type={enums.GREEN}
                    >
                        Confirm Punch
                    </Badge>
                    {cell.row.original.status !== "ABSENT" && (
                        <Badge
                            onClick={async () => {
                                const cnf = window.confirm(
                                    "Are you sure you want to reject this punch?"
                                );
                                if (cnf) {
                                    const res = await ApiService.fetchData({
                                        url: `api/attendence/mark-absent/${cell.row.original.id}`,
                                        method: "GET",
                                    });
                                    if (res) toast.success(res.data.message);
                                    FetchNews();
                                }
                            }}
                            type={enums.RED}
                        >
                            Reject Punch
                        </Badge>
                    )}
                </span>
            ),
        },
    ];

    return agents.loading ? (
        <Loader />
    ) : (
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
                title="Attendance"
                subtitle={"Attendance Sheet"}
                dataName={"Employees Attendance"}
                data={agents.data}
                columns={columns()}
            />
        </>
    );
}

export default AgentSheeet;
