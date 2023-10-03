import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Ticker from "../components/ui/ticker";
import Image from "../components/ui/Image/Index";
import Input from "../components/ui/input";
import { BiRupee } from "react-icons/bi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlineRequestPage, MdSchool } from "react-icons/md";
import { ImParagraphLeft } from "react-icons/im";
import { LiaUsersCogSolid } from "react-icons/lia";
import { GiFamilyHouse, GiHighGrass } from "react-icons/gi";
import {
  AiOutlineCalendar,
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
import { Link, useNavigate } from "react-router-dom";
import calculateEMI from "../utils/calculator";
import Select from "../components/ui/select";
import HeadingWrapper from "../components/ui/heading Wrapper";
import Contact from "../components/contact";
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
  const navigator = useNavigate();
  function aboutNav() {
    navigator("/about-us");
  }
  function ServiceCard({ img, type, link }) {
    return (
      <div className="flex w-[23rem] md:w-[18rem] flex-col pt-8 pb-8 mb-4 shadow-lg shadow-orange-700 hover:shadow-blue-800 rounded-tr-[3rem] rounded-bl-[3rem] rounded-tl-xl rounded-br-xl items-center md:justify-around justify-center px-2 gap-4">
        <Image src={img} className={"w-96 h-64 rounded-xl"} />
        <div className="flex flex-col items-center justify-between">
          <span className="text-3xl self-center font-bold text-blue-800">
            {type} Loan
          </span>
          <span className="mt-4 px-4 text-center font-semibold text-secondary-200 text-md">
            Get {type} Loan on Easy EMI basis from vandhnam Finance Pvt. Ltd.
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
        <div className="absolute w-full z-40 left-1/2 transform -translate-x-1/2 overflow-hidden -bottom-9 text-black bg-blue-800  flex h-max  gap-2 ">
          <div className="flex flex-col justify-between w-full py-2">
            <span className="py-1 px-2 text-sm font-semibold text-white w-full">
              <Ticker
                messages={
                  !news.loading
                    ? news.data.map((n) => n.lane === "FIRST" && n.text)
                    : ["Vandhnam Finance Pvt. Ltd."]
                }
              />
            </span>
          </div>
        </div>
      </div>
      {/* <--------------------About Section------------------------------> */}
      <section className="flex mt-20 bg-gray-100 items-center justify-between flex-col gap-8 md:flex-row mx-6 md:mx-14 lg:mx-32">
        <div className="flex flex-col self-start gap-4 w-full md:w-96">
          <h3 className="text-xl font-bold">WHY CHOOSE US</h3>
          <h1 className="text-3xl font-extrabold text-blue-800">About Us</h1>
          <p className="mt-10 ">
            vandhnam Finance Services Pvt. Ltd. is dealing in Home Loan,
            Personal Loan, Agriculture Loan, Shop Loan, Flat Loan, Project Loan,
            Education Loan, Pay Slip Loan, Car Loan, Machine Loan, Business
            Loans, Loan Against Property & Project Etc.
          </p>
          <div className="flex md:mt-10 mt-1 items-center gap-4">
            <button
              onClick={() => {
                navigator("/contact-us");
              }}
              className="pushable rounded-3xl  bg-orange-400 hover:bg-orange-700 hover:text-orange-500 transform-cpu"
            >
              <span className="front bg-gray-400 px-4 py-2  rounded-3xl font-semibold">
                Contact
              </span>
            </button>
            <button
              onClick={aboutNav}
              className="pushable rounded-3xl bg-blue-600   hover:bg-blue-900  "
            >
              <span className="front bg-orange-600 hover:bg-orange-700 px-4 py-2  rounded-3xl font-semibold">
                Apply
              </span>
            </button>
          </div>
        </div>
        <Image
          src={"/about.png"}
          className={"md:aspect-auto h-96  object-cover rounded-3xl"}
        />
        <div className="flex flex-col h-full items-center gap-8 justify-between w-full md:w-96">
          <div className="flex gap-2 w-full">
            <img src="/time.png" alt="" className="w-20 h-20" />
            <span className="flex flex-col justify-between py-1">
              <h2 className="font-semibold text-lg text-blue-800">
                24/7 Unlimited Support
              </h2>
              <h4 className="text-gray-700 font-medium">
                Our customer support team is ready to help our clients all the
                time.
              </h4>
            </span>
          </div>
          <div className="flex gap-2">
            <img src="/agreement.png" alt="" className="w-20 h-20" />
            <span className="flex flex-col justify-between py-1">
              <h2 className="font-semibold text-lg text-blue-800">
                We Are Committed
              </h2>
              <h4 className="text-gray-700 font-medium">
                Skilled professionals are always ready to provide reliable
                services to our clients!...
              </h4>
            </span>
          </div>
          <div className="flex gap-2">
            <img src="/medal.png" alt="" className="w-20 h-20" />
            <span className="flex flex-col justify-between py-1">
              <h2 className="font-semibold text-lg text-blue-800">
                Customer Focused Team
              </h2>
              <h4 className="text-gray-700 font-medium">
                Our agency can only be as strong as our people & because of
                this, our team have designed....
              </h4>
            </span>
          </div>
        </div>
      </section>
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

      {/* <--------------------------Contact Section-----------------------------> */}
      {/* <div className="w-full bg-gray-100">
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
      </div> */}
      <div className="w-full my-10 ">
        <h1 className="text-center text-2xl font-bold">
          <span className="text-blue-800">Calculate EMI,</span> Send Your
          Message
        </h1>
      </div>
      <section className="mb-10 grid grid-cols-1 md:grid-cols-3 bg-gray-100 gap-6  mx-2 md:mx-12 lg:mx-28 ">
        <div>
          <div className=" flex flex-col text-left h-full px-4 md:px-0 shadow-xl rounded-3xl hover:shadow-blue-800  shadow-orange-700 w-full ">
            <span className="mt-10 text-4xl text-blue-800 text-center font-extrabold">
              Loan EMI Calculator
            </span>
            <span className="text-sm px-6">
              Enter loan amount and select year to Calculate EMI and check you
              eligibility
            </span>
            <div className="w-full pt-4 rounded-b-md pb-8   flex flex-col gap-4 px-4 ">
              <Formik
                initialValues={{
                  amount: "",
                  years: "",
                  intrestRate: 5,
                }}
              >
                {(e) => (
                  <>
                    <Input
                      label={"Enter Loan Amount"}
                      type="number"
                      value={e.values.amount}
                      name="amount"
                      onChange={e.handleChange}
                      placeholder={"Enter Amount"}
                      icon={<BiRupee className="text-indigo-600" />}
                    />
                    <Select
                      icon={<AiOutlineCalendar className="text-indigo-600" />}
                      label={"Select Loan Tenure"}
                      value={e.values.years}
                      onChange={e.handleChange}
                      name="years"
                    >
                      <option value="null">Select a year</option>
                      {Array.from({ length: 17 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1} Year{index !== 0 ? "s" : ""}
                        </option>
                      ))}
                    </Select>

                    <p className="text-sm mt-8 font-medium text-center text-gray-700">
                      You have to pay
                      {calculateEMI(
                        Number(e.values.amount),
                        Number(e.values.intrestRate),
                        Number(e.values.years)
                      )?.emi && (
                        <>
                          <span className="text-green-600">
                            {" "}
                            Rs.{" "}
                            {
                              calculateEMI(
                                Number(e.values.amount),
                                Number(e.values.intrestRate),
                                Number(e.values.years)
                              )?.emi
                            }
                            <span className="text-gray-700">
                              {" "}
                              / Month at the interest Rate of{" "}
                              <span className="text-green-600">
                                5%
                              </span> for{" "}
                              <span className="text-indigo-600">
                                {
                                  calculateEMI(
                                    Number(e.values.amount),
                                    Number(e.values.intrestRate),
                                    Number(e.values.years)
                                  )?.totalMonths
                                }
                              </span>{" "}
                              Months
                            </span>
                          </span>
                        </>
                      )}
                    </p>
                    <div className="flex items-start justify-center mt-4 w-full">
                      <Link
                        to="/apply-loan"
                        className="pushable rounded-3xl  bg-orange-400 hover:bg-orange-700 hover:text-blue-900 transform-cpu"
                      >
                        <span className="front bg-gray-400 px-4 py-2  rounded-3xl font-semibold">
                          Apply Now
                        </span>
                      </Link>
                    </div>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
        <Image
          src={"/contact.jpg"}
          className={"md:aspect-auto   object-cover rounded-3xl"}
        />
        <Contact />
      </section>
    </div>
  );
};

export default Homepage;
