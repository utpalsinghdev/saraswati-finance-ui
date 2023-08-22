import React from "react";
import ContainerWrapper from "../components/ui/containtWrapper";
import HeadingWrapper from "../components/ui/heading Wrapper";
import Select from "../components/ui/select";
import { BiIdCard } from "react-icons/bi";
import Input from "../components/ui/input";
import { ImagePlus, MailIcon, Phone, User2Icon } from "lucide-react";
import Button from "../components/ui/button";
import { SlLocationPin } from "react-icons/sl";
import Image from "../components/ui/Image/Index";
import { Formik } from "formik";
import axios from "axios";
import { toast } from "react-hot-toast";
import { agentApplicationSchema } from "../schemas";
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
function Career() {
  // AGENT
  // DEALERSHIP
  // FEILDOFFICER
  return (
    <div className="bg-gray-100">
      <ContainerWrapper>
        <HeadingWrapper
          heading={"Career Application Form"}
          title={"Career With Us"}
        >
          <Formik
            enableReinitialize
            validationSchema={agentApplicationSchema}
            initialValues={{
              title: "",
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              role: "",
              city: "",
              resume: "",
              agree: false,
            }}
            onSubmit={async (values, action) => {
              const payload = { ...values };
              await new Promise((resolve) => {
                fileToBase64(values.resume, (base64Data) => {
                  payload.resume = base64Data;
                  resolve();
                });
              });
              try {
                const res = await axios.post(
                  `${import.meta.env.VITE_BASE_URL}/api/agent-application`,
                  payload
                );
                toast.success(res.data.message);
              } catch (error) {
                toast.error(
                  typeof error.response.data.message !== "string"
                    ? error.response.data?.[0]
                    : error.response.data.message
                );
              } finally {
                action.resetForm();
                action.setSubmitting(false);
              }
            }}
          >
            {(f) => (
              <form
                onSubmit={f.handleSubmit}
                className="flex pb-4 items-start gap-4 md:gap-12 justify-start flex-col md:flex-row  mt-4 p-0 md:p-8 lg:px-20  "
              >
                <Image
                  src={"/job.jpg"}
                  alt={"career"}
                  className={
                    "h-[500px] md:w-[370px]  md:aspect-auto object-fill rounded-md"
                  }
                />

                <div className="flex w-full md:w-96 md:gap-4 items-center flex-col gap-1">
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
                    name="lastName"
                    onChange={f.handleChange}
                    value={f.values.lastName}
                    onBlur={f.handleBlur}
                    error={f.touched.lastName && f.errors.lastName}
                    icon={<User2Icon className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"Last Name"}
                  />
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
                    name="phone"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.phone}
                    error={f.touched.phone && f.errors.phone}
                    icon={<Phone className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"Mobile Number"}
                  />
                  <Input
                    label="Upload Resume (pdf only)"
                    type={"file"}
                    name={"resume"}
                    required={true}
                    onChange={(e) => {
                      f.setValues((prev) => ({
                        ...prev,
                        resume: e.target.files[0],
                      }));
                    }}
                    // value={f.values.phone}
                    onBlur={f.handleBlur}
                    error={f.touched.resume && f.errors.resume}
                    icon={<ImagePlus className="w-4 text-indigo-500" />}
                    placeholder={"Mobile Number"}
                  />
                  <Input
                    name="email"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.email}
                    error={f.touched.email && f.errors.email}
                    icon={<MailIcon className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"Email Address"}
                  />
                  <span className="h-full w-full mb-2 md:mb-4 flex items-center justify-start gap-4">
                    <input
                      id="other_document"
                      checked={f.values.agree}
                      onClick={() => {
                        f.setValues((prev) => ({
                          ...prev,
                          agree: !f.values.agree,
                        }));
                      }}
                      type="checkbox"
                      className="self-start mt-[6px]"
                    />{" "}
                    <label htmlFor="other_document" className="text-sm w-[95%]">
                      {" "}
                      I authorize that Company & its representatives to call me
                      or SMS me with reference to my application.
                    </label>
                  </span>

                  <Button
                    loading={f.isSubmitting}
                    loadingText={"Submitting"}
                    type={"submit"}
                    disabled={!f.values.agree || f.isSubmitting}
                    size={"FULL"}
                  >
                    Submit{" "}
                  </Button>
                </div>
                <div className="flex  items-center flex-col gap-2">
                  <h3 className="text-2xl text-left text-green-500 w-full font-extrabold ">
                    About Career
                  </h3>

                  <p className="text-sm max-w-md text-left ">
                    Green Apple Financial Services pvt ltd, a loan franchise,
                    has been in existence for years now. You can bridge the gap
                    between your applicant and us by partnering with our
                    institution. Your journey with us will be one long road of
                    opportunities. Our support team is always there to mentor
                    you along the way. We ensure 100% transparency by keeping
                    you updated about your clients through digital means. We
                    have also eliminated the need for going through any kind of
                    paperwork; if you are above 21 and have a passion for the
                    role, partner with us and earn the highest payouts.
                  </p>
                  <p className="text-sm max-w-md text-left ">
                    Once you partner with us by filling out the online
                    franchise, field officer, agent registration form, we guide
                    and support you on how to move the leads through the funnel.
                    We would be delighted to get you onboard and have you
                    trained professionally. Whatever product you are selling or
                    are interested in selling, we can assist you in the process
                    with our expert guidance. With our marketing material, you
                    can become a recognized loan franchise by increasing your
                    earning.
                  </p>
                  <p className="text-sm max-w-md text-left ">
                    anyone (salaried/self-employed/freelancer/students) above 21
                    years and willing to enhance the monthly income can become
                    the business partner of Green Apple Financial Services pvt
                    Ltd.
                  </p>
                  <h3 className="text-2xl text-green-500 text-left w-full font-extrabold ">
                    How to Become our Partner
                  </h3>
                  <p className="text-md max-w-md w-full text-left ">
                    Sign up using KYC and basic details
                  </p>
                  <p className="text-md mt-2 max-w-md text-left ">
                    Wait and relax while our team verifies your details once
                    done start selling&lsquo;s
                  </p>
                  <h3 className="text-2xl text-green-500 text-left w-full font-extrabold ">
                    Some of the best features
                  </h3>
                  <h2 className="text-md text-left mt-1 w-full font-extrabold ">
                    Anybody Can Earn
                  </h2>
                  <p className="text-md w-full  mt-2 max-w-md text-left ">
                    A platform where anybody can earn through uss
                  </p>
                  <h2 className="text-md text-left w-full font-extrabold ">
                    Highest Payout
                  </h2>
                  <p className="text-md mt-2 max-w-md w-full text-left ">
                    Highest agent payout in industry
                  </p>
                  <h2 className="text-md text-left w-full font-extrabold ">
                    Commissions
                  </h2>
                  <p className="text-md mt-2 max-w-md w-full text-left ">
                    Partners will get 5% of the total earnings by the team
                  </p>
                </div>
              </form>
            )}
          </Formik>
        </HeadingWrapper>
      </ContainerWrapper>
    </div>
  );
}

export default Career;
