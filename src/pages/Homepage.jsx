import React from "react";
import Button from "../components/ui/button";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Ticker from "../components/ui/ticker";
import Image from "../components/ui/Image/Index";
import Input from "../components/ui/input";
import {
  BiUser,
  BiPhone,
  BiConversation,
  BiSolidBusiness,
} from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineRequestPage, MdSchool } from "react-icons/md";
import { ImParagraphLeft } from "react-icons/im";
import { LiaUsersCogSolid } from "react-icons/lia";
import { GiFamilyHouse, GiHighGrass } from "react-icons/gi";
import {
  AiOutlineHome,
  AiOutlineMail,
  AiOutlineSafety,
  AiOutlineStar,
  AiOutlineUser,
} from "react-icons/ai";
import TextArea from "../components/ui/textarea";
import LinkButton from "../components/ui/link";
import ContainerWrapper from "../components/ui/containtWrapper";
import CarouselBanner from "../components/CarouselBanner";
import { Formik } from "formik";
import { sendMessageDto } from "../schemas";
import ApiService from "../services/Api_services";
import { toast } from "react-toast";
import axios from "axios";
const Homepage = () => {
  return (
    <div className="w-full bg-gray-100 flex items-center justify-center flex-col">
      {/* <--------------------------Contact Section-----------------------------> */}
      <div className="relative text-white text-[20px] w-full  mx-auto">
        <CarouselBanner  />
        <div className="absolute container mx-auto w-[80%] z-50 left-1/2 transform -translate-x-1/2 overflow-hidden -bottom-14 text-black bg-white  flex h-max  gap-2 ">
          <div className="bg-green-200 w-4">
            <p className="text-green-200">d</p>
          </div>

          <div className="flex flex-col py-2 z-50 ">
            <span className="py-1 px-2 text-black text-sm font-medium ">
              ABOUT COMPANY
            </span>
            <span className="py-1 px-2 text-2xl font-semibold ">News</span>
          </div>
          <div className="flex flex-col justify-between w-full py-2">
            <span className="py-1 px-2 text-sm  ">
              <Ticker>
                CALL FOR ANY TYPE OF LOAN ON: 9540542272 IN CORPORATION NO:
                -Green Apple Financial Services PAN NO: - Green Apple Financial
                Services Private Limited TAN: - Green Apple Financial Services
                Private Limited.
              </Ticker>
            </span>
            <span className="py-1 px-2 text-sm">
              <Ticker>
                WELCOME TO Green Apple Financial Services Private Limited. LTD.
                TO CHECK ELIGIBILITY PLEASE CALL US ON OUR HELPLINE NUMBER.
              </Ticker>
            </span>
          </div>
        </div>
      </div>

      {/* <--------------------------Services Section-----------------------------> */}
      <section className="flex mt-10 bg-gray-100 items-center justify-center flex-col mx-8 md:mx-16 lg:mx-32">
        <span className="text-xl mt-16 font-semibold mb-5 text-primary-500">
          WHAT WE DO FOR YOU
        </span>
        <h1 className="w-full text-center text-5xl font-bold text-gray-800">
          Services <span className="text-green-500">Benefits.</span>{" "}
        </h1>
        {/* <p className="max-w-128 mt-4 text-gray-700 font-medium mb-12 text-center ">
          Enhance SEO: Keyword search boosts rankings, visibility, and relevance
          for improved online performance.
        </p> */}
        <div className="w-full md:grid md:grid-cols-3  flex flex-col items-start justify-between ">
          <div className="flex flex-col md:flex-row pt-8 pb-8  items-center md:justify-around justify-center px-2 gap-4">
            <span className="border self-auto md:self-start rounded-full p-4">
              <AiOutlineHome className="w-8 h-8 text-green-500" />
            </span>
            <div className="flex flex-col items-start justify-between">
              <span className="text-3xl self-center md:self-start font-bold text-indigo-500">
                Home Loan
              </span>
              <span className="mt-2 mb-1 text-center font-semibold md:text-left text-secondary-200 text-lg">
                Green Apple Financial Services Offers Home Loan on Easy EMI
                basis
              </span>
              <span className="self-center md:self-auto">
                <LinkButton to="/home-loan" size={"small"}>
                  Apply Now
                </LinkButton>
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row pt-8 pb-8  items-center md:justify-around justify-center px-2 gap-4">
            <span className="border self-auto md:self-start rounded-full p-4">
              <AiOutlineUser className="w-8 h-8 text-green-500" />
            </span>
            <div className="flex flex-col items-start justify-between">
              <span className="text-3xl self-center md:self-start font-bold text-indigo-500">
                Personal Loan
              </span>
              <span className="mt-4 text-center md:text-left font-semibold text-secondary-200 text-lg">
                Green Apple Financial Services Offers Personal Loan on Easy EMI
                basis
              </span>
              <span className="self-center md:self-auto">
                <LinkButton to="/personal-loan" size={"small"}>
                  Apply Now
                </LinkButton>
              </span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row pt-8 pb-8  items-center md:justify-around justify-center px-2 gap-4">
            <span className="border self-auto md:self-start rounded-full p-4">
              <BiSolidBusiness className="w-8 h-8 text-green-500" />
            </span>
            <div className="flex flex-col items-start justify-between">
              <span className="text-3xl self-center md:self-start font-bold text-indigo-500">
                Business Loan
              </span>
              <span className="mt-4 text-center md:text-left font-semibold text-secondary-200 text-lg">
                Green Apple Financial Services Offers Business Loan on Easy EMI
                basis
              </span>
              <span className="self-center md:self-auto">
                <LinkButton to="/business-loan" size={"small"}>
                  Apply Now
                </LinkButton>
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row pt-8 pb-8  items-center md:justify-around justify-center px-2 gap-4">
            <span className="border self-auto md:self-start rounded-full p-4">
              <MdSchool className="w-8 h-8 text-green-500" />
            </span>
            <div className="flex flex-col items-start justify-between">
              <span className="text-3xl self-center md:self-start font-bold text-indigo-500">
                Education Loan
              </span>
              <span className="mt-4 text-center md:text-left font-semibold text-secondary-200 text-lg">
                Green Apple Financial Services Offers Education Loan on Easy EMI
                basis
              </span>
              <span className="self-center md:self-auto">
                <LinkButton to="/education-loan" size={"small"}>
                  Apply Now
                </LinkButton>
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row pt-8 pb-8  items-center md:justify-around justify-center px-2 gap-4">
            <span className="border self-auto md:self-start rounded-full p-4">
              <GiFamilyHouse className="w-8 h-8 text-green-500" />
            </span>
            <div className="flex flex-col items-start justify-between">
              <span className="text-3xl self-center md:self-start font-bold text-indigo-500">
                Property Loan
              </span>
              <span className="mt-4 text-center md:text-left font-semibold text-secondary-200 text-lg">
                Green Apple Financial Services Offers Property Loan on Easy EMI
                basis
              </span>
              <span className="self-center md:self-auto">
                <LinkButton to="/property-loan" size={"small"}>
                  Apply Now
                </LinkButton>
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row pt-8 pb-8  items-center md:justify-around justify-center px-2 gap-4">
            <span className="border self-auto md:self-start rounded-full p-4">
              <GiHighGrass className="w-8 h-8 text-green-500" />
            </span>
            <div className="flex flex-col items-start justify-between">
              <span className="text-3xl self-center md:self-start font-bold text-indigo-500">
                Agriculture
              </span>
              <span className="mt-4 text-center md:text-left font-semibold text-secondary-200 text-lg">
                Green Apple Financial Services Offers Agriculture Loan on Easy
                EMI basis
              </span>
              <span className="self-center md:self-auto">
                <LinkButton to="/agriculture-loan" size={"small"}>
                  Apply Now
                </LinkButton>
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row pt-8 pb-8  items-center md:justify-around justify-center px-2 gap-4">
            <span className="border self-auto md:self-start rounded-full p-4">
              <MdOutlineRequestPage className="w-8 h-8 text-green-500" />
            </span>
            <div className="flex flex-col items-start justify-between">
              <span className="text-3xl self-center md:self-start font-bold text-indigo-500">
                ITR Loan
              </span>
              <span className="mt-4 text-center md:text-left font-semibold text-secondary-200 text-lg">
                Green Apple Financial Services Offers ITR Loan on Easy EMI basis
              </span>
              <span className="self-center md:self-auto">
                <LinkButton to="/itr-loan" size={"small"}>
                  Apply Now
                </LinkButton>
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row pt-8 pb-8  items-center md:justify-around justify-center px-2 gap-4">
            <span className="border self-auto md:self-start rounded-full p-4">
              <MdOutlineRequestPage className="w-8 h-8 text-green-500" />
            </span>
            <div className="flex flex-col items-start justify-between">
              <span className="text-3xl self-center md:self-start font-bold text-indigo-500">
                Pay Slip Loan
              </span>
              <span className="mt-4 text-center md:text-left font-semibold text-secondary-200 text-lg">
                Green Apple Financial Services Offers Pay Slip Loan on Easy EMI
                basis
              </span>
              <span className="self-center md:self-auto">
                <LinkButton to="/pay-slip-loan" size={"small"}>
                  Apply Now
                </LinkButton>
              </span>
            </div>
          </div>
          <div className="flex flex-col md:flex-row pt-8 pb-8  items-center md:justify-around justify-center px-2 gap-4">
            <span className="border self-auto md:self-start rounded-full p-4">
              <LiaUsersCogSolid className="w-8 h-8 text-green-500" />
            </span>
            <div className="flex flex-col items-start justify-between">
              <span className="text-3xl self-center md:self-start font-bold text-indigo-500">
                Group Loan
              </span>
              <span className="mt-4 text-center md:text-left font-semibold text-secondary-200 text-lg">
                Green Apple Financial Services Offers Home Loan on Easy EMI
                basis
              </span>
              <span className="self-center md:self-auto">
                <LinkButton to="/group-loan" size={"small"}>
                  Apply Now
                </LinkButton>
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* <--------------------------About Section-----------------------------> */}
      <div className="w-full bg-gray-100">
        <ContainerWrapper>
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 px-2 py-20 md:py-15">
            <div className=" h-[500px]">
              <Image
                className=" h-[500px] md:w-[500px]  md:aspect-auto object-cover rounded-md"
                src={"/about.webp"}
                alt="about-section"
              />
            </div>

            <div className="flex flex-col text-left px-0 md:px-0 gap-6 ">
              <span className="W-full text-2xl  text-left font-medium text-green-600 text-primary-500">
                About Us
              </span>
              <h1 className="text-4xl lg:text-3xl text-indigo-500 font-bold md:text-left ">
                Green Apple Financial Service PVT. LTD.
              </h1>
              <p className="text-gray-700 text-sm font-medium md:text-left text-center">
                Green Apple Financial Service Private Limited is dealing in
                Personal Loan, Loan against Property, Project Loan & Gold Loan.
                We Believe in fair dealing and prompt disbursement of founds on
                priority Basis.
              </p>
              <span className="text-gray-700 text-sm font-semibold md:text-left ">
                Green Apple Financial Service Pvt Ltd is an organization that
                motivates people to fulfill their dreams, which otherwise would
                be difficult to achieve due to the inaccessibility to right
                financial consulting and solutions.
              </span>
              <span className="text-gray-900 text-lg font-semibold md:text-left ">
                We are registerd Private Limited Company:
              </span>
              <span className="text-gray-500 text-lg font-semibold md:text-left ">
                IN CORPORATION NO: U69202HR2023PTC112412
              </span>
              <span className="text-gray-500 text-lg font-semibold md:text-left ">
                PAN NO: AAKCG5265C
              </span>
              <span className="text-gray-500 text-lg font-semibold md:text-left ">
                TAN NO: RTKG17932F
              </span>
            </div>
          </section>
        </ContainerWrapper>
      </div>
      {/* <--------------------------Contact Section-----------------------------> */}
      <div className="w-full bg-gray-100">
        <ContainerWrapper>
          <section className="pb-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 px-2 items-center justify-between md:py-15">
            <div className="">
              <div className="w-full h-[500px] flex flex-col gap-8 flex flex-col text-left  md:px-0">
                <p className="text-2xl text-indigo-500 font-medium text-left">
                  {">"} Easy Application
                </p>
                <p className="text-2xl text-indigo-500 font-medium text-left">
                  {">"} Fast Approval
                </p>
                <p className="text-2xl text-indigo-500 font-medium text-left">
                  {">"} Low interest rate
                </p>
                <p className="text-2xl text-indigo-500 font-medium text-left">
                  {">"} Free consultation
                </p>
                <p className="text-2xl text-indigo-500 font-medium text-left">
                  {">"} Flexible repayment
                </p>
                <p className="text-2xl text-indigo-500 font-medium text-left">
                  {">"} Blacklisted accepted
                </p>
                <p className="text-2xl text-indigo-500 font-medium text-left">
                  {">"} Get Approval in one day
                </p>
              </div>
            </div>
            <Image src={"/contact_arrow.png"} />
            <div className="flex flex-col text-left  px-4 md:px-0    ">
              <span className="W-full text-2xl  text-left font-medium text-white bg-indigo-800 rounded-t-md px-8 py-4 ">
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
        </ContainerWrapper>
      </div>
    </div>
  );
};

export default Homepage;
