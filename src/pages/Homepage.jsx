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
import { toast } from "react-hot-toast";
import axios from "axios";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
const Homepage = () => {
  const services = [
    {
      type: "Personal",
      link: "/services/personal-loan",
      img: "/personal.jpeg",
    },
    {
      type: "Home",
      link: "/services/home-loan",
      img: "/home.jpeg",
    },
    {
      type: "Education",
      link: "/services/education-loan",
      img: "/education.jpeg",
    },
    {
      type: "Business",
      link: "/services/business-loan",
      img: "/business.jpeg",
    },
    {
      type: "Property",
      link: "/services/property-loan",
      img: "/property.jpeg",
    },
    {
      type: "ITR",
      link: "/services/itr-loan",
      img: "/itr.jpg",
    },
    {
      type: "Agriculture",
      link: "/services/agriculture-loan",
      img: "/agriculture.jpeg",
    },
    {
      type: "Pay Slip",
      link: "/services/pay-slip-loan",
      img: "/pay.jpg",
    },
  ];
  function ServiceCard({ img, type, link }) {
    return (
      <div className="flex w-[23rem] md:w-[18rem] flex-col pt-8 pb-8 mb-4 shadow-lg shadow-orange-700 hover:shadow-blue-800 rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl items-center md:justify-around justify-center px-2 gap-4">
        <Image src={img} className={"w-96 h-64 rounded-xl"} />
        <div className="flex flex-col items-center justify-between">
          <span className="text-3xl self-center font-bold text-blue-800">
            {type} Loan
          </span>
          <span className="mt-4 px-4 text-center font-semibold text-secondary-200 text-md">
            Get {type} Loan on Easy EMI basis from Vandham Finance Pvt. Ltd.
          </span>
          <span className="self-center mt-4 md:self-auto">
            <Link to={link}>
              <button className="pushable rounded-3xl  bg-orange-400 hover:bg-orange-700 hover:text-blue-900 transform-cpu">
                <span className="front bg-gray-400 px-4 py-2  rounded-3xl font-semibold">
                  Read More
                </span>
              </button>
            </Link>
          </span>
        </div>
      </div>
    );
  }
  const news = useFetch("/api/news");
  return (
    <div className="w-full bg-gray-100 flex items-center justify-center flex-col">
      {/* <--------------------------Contact Section-----------------------------> */}
      <div className="relative text-white text-[20px] w-full  mx-auto">
        <CarouselBanner />
        <div className="absolute w-full z-50 left-1/2 transform -translate-x-1/2 overflow-hidden -bottom-9 text-black bg-blue-800  flex h-max  gap-2 ">
          <div className="flex flex-col justify-between w-full py-2">
            <span className="py-1 px-2 text-sm font-semibold text-white w-full">
              <Ticker
                messages={
                  !news.loading
                    ? news.data.map((n) => n.lane === "SECOND" && n.text)
                    : ["Green Apple Financial Services Pvt. Ltd."]
                }
              />
            </span>
          </div>
        </div>
      </div>

      {/* <--------------------------Services Section-----------------------------> */}
      <section className="flex mt-10 bg-gray-100 items-center justify-center flex-col mx-8 md:mx-16 lg:mx-32">
        <h1 className="w-full text-left text-5xl pl-2 font-bold mb-4 text-gray-800">
          <span className="underline">Our</span>{" "}
          <span className="text-orange-500">Services.</span>{" "}
        </h1>

        <div className="w-full px-2 md:grid md:grid-cols-4 gap-5 my-2 flex flex-col items-start justify-between ">
          {services.map((s, i) => (
            <ServiceCard type={s.type} link={s.link} key={i} img={s.img} />
          ))}
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
                Green Apple Financial Services PVT. LTD.
              </h1>
              <p className="text-gray-700 text-sm font-medium md:text-left ">
                Green Apple Financial Services Private Limited is dealing in
                Personal Loan, Loan against Property, Project Loan & Gold Loan.
                We Believe in fair dealing and prompt disbursement of founds on
                priority Basis.
              </p>
              <span className="text-gray-700 text-sm font-semibold md:text-left ">
                Green Apple Financial Services Pvt Ltd is an organization that
                motivates people to fulfill their dreams, which otherwise would
                be difficult to achieve due to the inaccessibility to right
                financial consulting and solutions.
              </span>
              <span className="text-gray-900 text-lg font-semibold md:text-left ">
                We are registered Private Limited Company:
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
            <Image className={"hidden md:block"} src={"/contact_arrow.png"} />
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
