import { toast } from "react-hot-toast";
import Button from "../../components/ui/button";
import axios from "axios";
import { Formik } from "formik";
import Input from "../../components/ui/input";
import { RiLockPasswordLine } from "react-icons/ri";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { adminLoginDto } from "../../schemas";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function AdminLogin() {
  const navigator = useNavigate();
  let user = {};
  useEffect(() => {
    if (!!Cookie?.get("gafs_user")) {
      user = JSON?.parse(Cookie?.get("gafs_user"));
    }
  }, [Cookie?.get("gafs_user")]);
  useEffect(() => {
    if (!!Cookie?.get("gafs_user")) {
      navigator("/admin/dashboard");
    }
  }, [user]);
  return (
    <>
      <div className="flex h-screen min-h-full flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-10">
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src="/logo_full.png"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Admin Login
            </h2>
          </div>
          <Formik
            validationSchema={adminLoginDto}
            initialValues={{
              Id: "",
              password: "",
            }}
            onSubmit={async (values, action) => {
              try {
                const res = await axios.post(
                  `${import.meta.env.VITE_BASE_URL}/api/auth/admin`,
                  values
                );
                if (res) {
                  Cookie.set("gafs_user", JSON.stringify(res.data.data));
                  toast.success(res.data.message);
                  navigator("/admin/dashboard");
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
                className="space-y-6"
                action="#"
                method="POST"
              >
                <div className="relative  rounded-md ">
                  <div className="pointer-events-none absolute inset-0 z-10 rounded-md " />
                  <div className="my-2">
                    <label htmlFor="email-address" className="sr-only">
                      ID
                    </label>
                    <Input
                      name="Id"
                      label=""
                      type="text"
                      placeholder="ID"
                      value={formik.values.Id}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      icon={
                        <IdentificationIcon className="text-indigo-600 w-[18px]" />
                      }
                      error={formik.touched.Id && formik.errors.Id}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Input
                      name="password"
                      label=""
                      type="password"
                      placeholder="Password"
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      icon={<RiLockPasswordLine className="text-indigo-600" />}
                      error={formik.touched.password && formik.errors.password}
                    />
                  </div>
                </div>

                <div>
                  <Button
                    loading={formik.isSubmitting}
                    disabled={formik.isSubmitting}
                    loadingText={"logging you in..."}
                    size={"NORMAL"}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
