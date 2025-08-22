import React, { useEffect, useState } from "react";
import Image from "../../components/ui/Image/Index";
import useFetch from "../../hooks/useFetch";
import Cookies from "js-cookie";
import Loader from "../../components/loader";
import { HomeIcon, ImagePlus, PencilIcon } from "lucide-react";
import { Formik } from "formik";
import Input from "../../components/ui/input";
import Button from "../../components/ui/button";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import toast, { ToastBar } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApiService from "../../services/Api_services";
import Table from "../../components/ui/table/Table";
import moment from "moment";

function PunchIN() {
    const user = JSON.parse(Cookies.get("gafs_user"));
    const _agent = useFetch(`api/auth/profile/${user?.user?.id}`);
    const navigate = useNavigate();
    const [agents, setAgents] = useState({
        loading: true,
        data: [],
    });
    useEffect(() => {
        FetchNews();
    }, []);
    async function FetchNews() {
        try {
            const res = await ApiService.fetchData({
                url: `api/attendence/one`,
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
    ];
    return _agent.loading ? (
        <Loader />
    ) : (
        <>
            <HomeIcon
                onClick={() => {
                    navigate("/agent/home");
                }}
                className="text-blue-800"
            />
            <div className="flex items-center flex-col justify-center gap-4">
                <Image
                    className={"rounded-full w-24 h-24"}
                    src={
                        _agent?.data?.profilePic
                            ? _agent?.data?.profilePic
                            : _agent?.data?.AppointmentSalary?.[0]?.photo
                    }
                />

                <button
                    onClick={async () => {
                        try {
                            const cnf = window.confirm("Are you sure you want to punch in?");
                            if (cnf) {
                                await ApiService.fetchData({
                                    url: `api/attendence/punch-in/${user?.user?.id}`,
                                    method: "GET",
                                });
                                await FetchNews();
                                toast.success("Punched In Successfully");
                            }
                        } catch (error) {
                            toast.error(error.response.data.message);
                        }
                    }}
                    className="flex mt-4 items-center flex-col justify-center gap-4 w-40 h-40 rounded-full bg-blue-500 text-white disabled:bg-gray-600"
                >
                    <h1>Punch In</h1>
                </button>
            </div>
            <div className="mt-4">
                <Table
                    title="Attendance"
                    subtitle={"Attendance Sheet"}
                    // dataName={"Your Attendance"}
                    data={agents.data}
                    columns={columns()}
                />
            </div>
        </>
    );
}

export default PunchIN;
