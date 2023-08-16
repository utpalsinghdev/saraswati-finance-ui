import React from "react";
import ContainerWrapper from "../components/ui/containtWrapper";
import HeadingWrapper from "../components/ui/heading Wrapper";
import CarouselBanner from "../components/CarouselBanner";
import Image from "../components/ui/Image/Index";
import Input from "../components/ui/input";
import {
  BiUser,
  BiPhone,
  BiConversation,
  BiSolidBusiness,
} from "react-icons/bi";
import TextArea from "../components/ui/textarea";
import Button from "../components/ui/button";
import { AiOutlineMail } from "react-icons/ai";
import { toast } from "react-toast";
import axios from "axios";
import { sendMessageDto } from "../schemas";
import { Formik } from "formik";
function Contact() {
  return (
    <div className="bg-gray-100">
      <CarouselBanner height="96" />
      <ContainerWrapper>
        <HeadingWrapper
          heading="Contact"
          title="Green Apple Financial Services Private Limited."
        >
          <div className="w-full bg-gray-100 pt-16">
            <section className="pb-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 px-2 items-center justify-between md:py-15">
              <div className="">
                <div className="relative w-full h-[500px]  gap-8 flex flex-col text-left  md:px-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d857.5812246991592!2d76.80891817090478!3d30.709265395327726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fecc4866daf91%3A0xe93293e7eb442304!2sRegus%20-%20Chandigarh%2C%20Harmony!5e0!3m2!1sen!2sin!4v1692183067788!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="0"
                  />
     
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <Image
                  className={"hidden md:block"}
                  src={"/contact_arrow.png"}
                />
              </div>
              <div className="flex flex-col text-left  ">
                <span className="W-full text-2xl  text-left font-medium text-white bg-indigo-500 rounded-t-md px-8 py-4 ">
                  Contact Us
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
                      className="w-full pt-4 rounded-b-md pb-8 flex flex-col gap-4 px-4 bg-white"
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
                      <Button
                        loadingText={"sending..."}
                        loading={formik.isSubmitting}
                        disabled={formik.isSubmitting}
                        type={"submit"}
                        size={"FULL"}
                      >
                        Send Message
                      </Button>
                    </form>
                  )}
                </Formik>
              </div>
            </section>
          </div>
        </HeadingWrapper>
      </ContainerWrapper>
    </div>
  );
}

export default Contact;
