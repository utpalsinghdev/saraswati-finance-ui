import React from "react";
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

function Edit() {
  const user = JSON.parse(Cookies.get("gafs_user"));
  const _agent = useFetch(`api/auth/profile/${user?.user?.id}`);
  const navigate = useNavigate();
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
        <span>
          <Formik
            initialValues={{
              profilePic: "",
            }}
            onSubmit={async (values, action) => {
              const payload = { ...values };
              await new Promise((resolve) => {
                fileToBase64(values.profilePic, (base64Data) => {
                  payload.profilePic = base64Data;
                  resolve();
                });
              });
              try {
                const res = await axios.put(
                  `${import.meta.env.VITE_BASE_URL}/api/auth/profile/${
                    user?.user?.id
                  }`,
                  payload
                );
                toast.success(res.data.message);
                window.location.reload();
              } catch (error) {
                ToastBar.error(error.response.data.message);
              } finally {
                action.setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              setValues,
              touched,
              isSubmitting,
              handleChange,

              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  accept="image/*, png, jpeg, jpg"
                  icon={<ImagePlus className="w-4 text-indigo-500" />}
                  type={"file"}
                  name="profilePic"
                  onBlur={handleBlur}
                  disabled={isSubmitting}
                  required={true}
                  onChange={(e) => {
                    setValues({ ...values, profilePic: e.target.files[0] });
                  }}
                  label={"Update Profile Pic"}
                />{" "}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="p-2 rounded-full bg-green-400 self-end"
                >
                  {isSubmitting ? "Uploading..." : "Save"}
                </button>
              </form>
            )}
          </Formik>
        </span>
        {/* <span className="w-full mt-5">
          <Formik
            initialValues={{
              Oldpassword: "",
              password: "",
            }}
            onSubmit={async (values, action) => {
              const payload = { ...values };
              try {
                const res = await axios.put(
                  `${import.meta.env.VITE_BASE_URL}/api/auth/profile/${
                    user?.user?.id
                  }`,
                  payload
                );
                toast.success(res.data.message);
              } catch (error) {
                toast.error(error.response.data.message);
              }
            }}
          >
            {({
              values,
              errors,
              setValues,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form
                onSubmit={handleSubmit}
                className="flex gap-2 items-start flex-col justify-start"
              >
                <Input
                  name="Oldpassword"
                  type={"text"}
                  required={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.Oldpassword}
                  icon={<IdentificationIcon className="w-4 text-indigo-500" />}
                  label={"Old Password"}
                  placeholder={"Enter Old password"}
                />{" "}
                <Input
                  name="password"
                  type={"text"}
                  onSubmit={handleSubmit}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  icon={<IdentificationIcon className="w-4 text-indigo-500" />}
                  label={"New Password"}
                  placeholder={"Enter New password"}
                />{" "}
                <div className="flex items-end justify-end w-full">
                  <button
                    type="submit"
                    className="p-2 rounded-full bg-green-400 self-end"
                  >
                    Update
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </span> */}
      </div>
    </>
  );
}

export default Edit;
