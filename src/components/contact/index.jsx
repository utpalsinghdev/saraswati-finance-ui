import { Formik } from "formik";
import React from "react";
import { sendMessageDto } from "../../schemas";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../ui/input";
import { BiPhone, BiUser } from "react-icons/bi";
import { AiOutlineMail } from "react-icons/ai";
import TextArea from "../ui/textarea";

const Contact = () => {
  return (
    <div
      className="upper bg-blue-500 h-max rounded-3xl
        "
    >
      <div className="lower bg-white flex flex-col text-left  px-4 md:px-0 shadow-xl rounded-3xl hover:shadow-red-800  shadow-blue-700 w-full ">
        <span className="mt-10 text-4xl text-blue-800 text-center font-extrabold">
          Contact Us
        </span>
        <span className="text-sm px-6">
          have any Question, Feel free to ask your query
        </span>
        <Formik
          validationSchema={sendMessageDto}
          initialValues={{
            name: "",
            email: "",
            phone: "",
            message: "",
          }}
          onSubmit={async (values, action) => {
            try {
              const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/message`,
                values
              );
              if (res) toast.success(res.data.message);
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
              className="w-full pt-4 rounded-b-md pb-8 flex flex-col gap-4 px-4 "
            >
              <Input
                label={""}
                type={"text"}
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && formik.errors.name}
                placeholder={"Name"}
                icon={<BiUser className="text-indigo-600" />}
              />
              <Input
                label={""}
                type={"email"}
                name="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.email && formik.errors.email}
                placeholder={"Email"}
                icon={<AiOutlineMail className="text-indigo-600" />}
              />
              <Input
                label={""}
                type={"text"}
                name="phone"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.phone && formik.errors.phone}
                placeholder={"Phone"}
                icon={<BiPhone className="text-indigo-600" />}
              />
              <TextArea
                row={5}
                name="message"
                label={""}
                value={formik.values.message}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                error={formik.touched.message && formik.errors.message}
                placeholder={"Your Message"}
                icon={<BiPhone className="text-indigo-600" />}
              />
              {/* <Button
                  loadingText={"sending..."}
                  loading={formik.isSubmitting}
                  disabled={formik.isSubmitting}
                  type={"submit"}
                  size={"FULL"}
                >
                  Send Message
                </Button> */}
              <button
                type={"submit"}
                disabled={formik.isSubmitting}
                className="pushable rounded-3xl  bg-blue-400 hover:bg-blue-700 hover:text-blue-900 transform-cpu"
              >
                <span className="front bg-gray-400 px-4 py-2  rounded-3xl font-semibold">
                  {formik.isSubmitting ? "Sending..." : "Send Message"}
                </span>
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Contact;
