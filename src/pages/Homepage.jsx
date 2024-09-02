import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Ticker from "../components/ui/ticker";
import Image from "../components/ui/Image/Index";
import Input from "../components/ui/input";
import { BiRupee } from "react-icons/bi";
import { AiOutlineCalendar } from "react-icons/ai";
import CarouselBanner from "../components/CarouselBanner";
import { Formik } from "formik";
import useFetch from "../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import calculateEMI from "../utils/calculator";
import Select from "../components/ui/select";
import Contact from "../components/contact";
import metaData from "../utils/lib/site.config";
import Button from "../components/ui/button";
import Modal from "../components/ui/modal";
const Homepage = () => {
  const services = [
    {
      type: "Personal",
      link: "/services/personal-loan",
      img: "/personalLoan.jpg",
    },
    {
      type: "Home",
      link: "/services/home-loan",
      img: "/home.jpeg",
    },
    {
      type: "Education",
      link: "/services/education-loan",
      img: "/education.png",
    },
    {
      type: "Business",
      link: "/services/business-loan",
      img: "/businessLoan.png",
    },
    {
      type: "Property",
      link: "/services/property-loan",
      img: "/property.png",
    },
    {
      type: "ITR",
      link: "/services/itr-loan",
      img: "/ITRLoan.webp",
    },
    {
      type: "Agriculture",
      link: "/services/agriculture-loan",
      img: "/agriculture.jpeg",
    },
    {
      type: "Pay Slip",
      link: "/services/pay-slip-loan",
      img: "/payslip.jpg",
    },
    {
      type: "Mahila Group",
      link: "/services/group-loan",
      img: "/group.jpeg",
    },
  ];
  const navigator = useNavigate();

  const catalog = [
    {
      name: "24/7 Unlimited Support",
      img: "/time.png",
      desc: "Our customer support team is ready to help our clients all the time.",
    },
    {
      name: "We Are Committed",
      img: "/agreement.png",
      desc: "Skilled professionals are always ready to provide reliable services to our clients!...",
    },
    {
      name: "Customer Focused Team",
      img: "/medal.png",
      desc: "Our agency can only be as strong as our people & because of this, our team have designed....",
    },
  ];
  function ServiceCard({ img, type, link }) {
    return (
      <div className="flex w-[23rem] md:w-[18rem]  flex-col pt-8 pb-8 mb-4 shadow-lg shadow-old-brick-700 hover:shadow-red-800 rounded-2xl items-center md:justify-around justify-center px-2 gap-4">
        <Image src={img} className={"w-96 h-64 rounded-xl"} />
        <div className="flex flex-col items-center justify-between">
          <span className="text-3xl self-center font-bold text-old-brick-800">
            {type} Loan
          </span>
          <span className="mt-4 px-4 text-center font-sebmibold text-secondary-200 text-md">
            Get {type} Loan on Easy EMI basis from {metaData.title}
          </span>
          <span className="self-center mt-4 md:self-auto">
            <Link to={link}>
              <button className="pushable rounded-3xl  bg-old-brick-800 hover:bg-old-brick-700 hover:text-old-brick-900 transform-cpu">
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
  const [state, setState] = React.useState(false);
  const news = useFetch("/api/news");
  function noticeModal() {
    return (
      <Modal
        open={state}
        setOpen={() => {
          setState(false);
        }}
        title={
          <label className="font-bold text-red-500 text-2xl">
            Important Notice
          </label>
        }
      >
        <div className="mt-2 font-medium">
          <p className="my-2 border-b p-b-2 text-justify">
            हमारी कंपनी पूरे भारत मे एजूकेशन लोन, सैलरी स्लिप लोन, प्रोजेक्ट
            लोन, पर्सनल लोन, प्रॉपर्टी लोन, आईटीआर लोन, बिजनेस लोन एक लाख से
            पांच करोड तक का लोन देती है आज कल लोन के नाम पर बहुत फ्रॉड हो रहा है
            और बोलते है की हम बजाज फाइनेंस, मत्थुत फाइनेंस, मुद्रा लोन, महिंद्रा
            लोन से आपका लोन करा रहे और अपने पर्सनल बैंक खातों में पैसे जमा करा
            लेते हैं और फिर मोबाइल बंद कर लेते है उन लोगो के पास ना कंपनी ना कोई
            लाइसेंस होता है एक फर्जी वेबसाइट बना लेते है और लोन के नाम से ठगी
            स्टार्ट करते है ऐसे लोगो से सावधान रहें हमारी कंपनी भारत सरकार
            द्वारा मान्यता प्राप्त है और 100% लोन देती. आप हमारी कंपनी में लोन
            ले सकते हैं या एजेंट, फील्ड ऑफिसर, डीलरशिप लेकर काम कर सकते है नोट-
            हम आपको सलाह देते हैं की आप {metaData.title} कंपनी में काम करने वाले
            एजेंट, फील्ड ऑफिसर या डीलरशिप, एडवोकेट, या किसी भी पर्सनल बैंक खाते
            में पैसे जमा ना करे अगर ऐसा करता है उसकी जिम्मेदारी कंपनी की नही
            होगी। कोई भी लेनदेन केवल कंपनी के एकाउंट में मान्य होगा कोई भी
            जानकारी के लिए कंपनी के व्हाट्सएप नंबर {metaData.phone.at(1)} पर
            मैसेज या {metaData.email} पर मेल करे
          </p>
          <p className="my-2 border-b p-b-2 text-justify">
            Our company provides education loan, salary slip loan, project loan,
            personal loan, property loan, ITR loan, business loan from 1 lakh to
            5 crores all over India. Nowadays a lot of fraud is happening in the
            name of loan and it is said that we are getting you loan from Bajaj
            Finance, Muthoot Finance, Mudra Loan, Mahindra Loan and Asks to
            deposit money in his personal account and then switches off the
            mobile.Those people have neither company nor any license, they
            create a fake website and start cheating in the name of loan.Beware
            of such people. Our company is recognized by the Government of India
            and gives 100% loan. You can take loan in our company or work as an
            agent or field officer or you can work in our company by taking a
            dealership. Note- We advise you not to deposit money in{" "}
            {metaData.title} Company&rsquo;s agents, field officers,dealerships,
            advocates or any personal bank account.If anyone does this, so it
            will not be the responsibility of the company. Any transaction will
            be valid only in the account of the company. For any information,
            message on company&rsquo;s WhatsApp number {metaData.phone.at(1)} or
            mail to {metaData.email}
          </p>
          <div className="flex items-center justify-end mt-2">
            <Button
              className={"w-max"}
              type={"button"}
              onClick={() => setState(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <div className="w-full bg-gray-100 flex items-center justify-center flex-col">
      {noticeModal()}
      {/* <--------------------------Contact Section-----------------------------> */}
      <div className="relative text-white text-[20px] w-full  mx-auto">
        <CarouselBanner />

        <div className="absolute z-40 container mx-auto w-full md:w-[80%] left-1/2 transform -translate-x-1/2 overflow-hidden -bottom-7 text-black bg-old-brick-100  flex h-max  gap-2 ">
          <div className="bg-old-brick-600 w-4">
            <p className="text-old-brick-600">d</p>
          </div>

          <div className="flex flex-col py-2 z-50 ">
            <span className="py-1 px-2 text-black text-sm font-medium ">
              ABOUT COMPANY
            </span>
            {/* <span className="py-1 px-2 text-2xl font-semibold ">News</span> */}
          </div>
          <div className="flex flex-col justify-between w-full py-2">
            <span className="py-1 px-2 text-sm  ">
              <Ticker
                messages={
                  !news.loading
                    ? news.data.map((n) => n.lane === "FIRST" && n.text)
                    : [`${metaData.title}`]
                }
              />
            </span>
          </div>
        </div>
        <div className="absolute border-t-2 border-white z-40 container mx-auto w-full md:w-[80%] left-1/2 transform -translate-x-1/2 overflow-hidden -bottom-20 text-black bg-old-brick-100   flex h-max  gap-2 ">
          <div className="bg-old-brick-600 w-4">
            <p className="text-old-brick-600">d</p>
          </div>

          <div className="flex flex-col py-2 z-50 ">
            <span className="py-1 px-2 text-2xl font-semibold ">News</span>
            {/* <span className="py-1 px-2 text-2xl font-semibold ">News</span> */}
          </div>
          <div className="flex flex-col justify-between w-full py-2">
            <span className="py-1 px-2 text-sm  ">
              <Ticker
                messages={
                  !news.loading
                    ? news.data.map((n) => n.lane === "SECOND" && n.text)
                    : [`${metaData.title}`]
                }
              />
            </span>
          </div>
        </div>
      </div>
      {/* <--------------------About Section------------------------------> */}
      <div className="w-full md:hidden bg-old-brick-50 py-2 px-4 mt-20">
        <div className="w-full flex flex-row items-center gap-4">
          <img src="/mic.svg" className="w-9 h-auto text-green-800" />
          <span className="w-full flex flex-col ">
            {metaData.phone.map((e) => (
              <a
                key={e}
                href={`tel:${e}`}
                className="text-old-brick-800 font-medium"
              >
                +91-{e}
              </a>
            ))}
          </span>
        </div>
      </div>

      <section className="flex mt- bg-gray-100 items-center justify-between flex-col gap-8 md:flex-row mx-6 md:mx-14 lg:mx-32">
        <div className="flex flex-col self-start gap-4 w-full md:w-96">
          <h3 className="text-xl mt-4 font-bold">
            Company Registration Details
          </h3>
          {/* <h3 className="text-md font-bold">CIN: U65929UP2020PTC139094</h3> */}
          {/* <h3 className="text-md font-bold">Pan: AAECF3620J</h3> */}
          <h1 className="text-3xl font-extrabold text-old-brick-800">
            About Us
          </h1>
          <h1>CIN no U67120WB1995PLC075385</h1>

          <p className="md:mt-10 ">
            {metaData.title} is dealing in Home Loan, Personal Loan, Agriculture
            Loan, Shop Loan, Flat Loan, Project Loan, Education Loan, Pay Slip
            Loan, Car Loan, Machine Loan, Business Loans, Loan Against Property
            & Project Etc.
          </p>
          <div className="flex md:mt-10 mt-1 items-center gap-4">
            <button
              onClick={() => {
                navigator("/contact-us");
              }}
              className="pushable rounded-3xl  bg-old-brick-600 hover:bg-old-brick-700 hover:text-old-brick-500 transform-cpu"
            >
              <span className="front bg-gray-400 px-4 py-2  rounded-3xl font-semibold">
                Contact
              </span>
            </button>
            <button
              onClick={() => {
                navigator("/apply-loan");
              }}
              className="pushable rounded-3xl bg-old-brick-600   hover:bg-old-brick-900  "
            >
              <span className="front bg-old-brick-600 hover:bg-old-brick-700 px-4 py-2 text-white  rounded-3xl font-semibold">
                Apply
              </span>
            </button>
          </div>
        </div>
        <Image
          src={"/about.png"}
          className={"md:aspect-auto h-96  object-cover rounded-3xl"}
        />
        <div className="flex flex-col h-full items-center gap-1 justify-between w-full md:w-96">
          {catalog?.map((c, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-1  shadow-md rounded-lg w-full"
            >
              <img src={c.img} alt="" className="w-16 h-16" />
              <span className="flex flex-col justify-between py-1">
                <h2 className="font-semibold text-center text-lg text-red-800">
                  {c.name}
                </h2>
                <h4 className="text-gray-700 text-center font-medium">
                  {c.desc}
                </h4>
              </span>
            </div>
          ))}
        </div>
      </section>
      {/* <--------------------------Services Section-----------------------------> */}
      <section className="flex mt-10 bg-gray-100 items-center justify-center flex-col mx-8 md:mx-16 lg:mx-32">
        <h1 className="w-full md:text-left text-center text-5xl pl-2 font-bold mb-4 text-gray-800">
          <span className="underline">Our</span>{" "}
          <span className="text-old-brick-500">Services.</span>{" "}
        </h1>

        <div className="w-full px-2 md:grid md:grid-cols-2 lg:grid-cols-3  xl:grid-cols-4 gap-5 my-2 flex flex-col items-start justify-between ">
          {services?.map((s, i) => (
            <ServiceCard type={s.type} link={s.link} key={i} img={s.img} />
          ))}
        </div>
      </section>

      <div className="w-full my-10 ">
        <h1 className="text-center text-2xl font-bold">
          <span className="text-old-brick-800">Calculate EMI,</span> Send Your
          Message
        </h1>
      </div>
      <section className="mb-10 grid grid-cols-1 md:grid-cols-3 h-min bg-gray-100 gap-6  mx-2 md:mx-12 lg:mx-28 ">
        <div>
          <div className=" flex flex-col text-left h-full px-4 md:px-0 shadow-xl rounded-3xl hover:shadow-old-brick-800  shadow-old-brick-700 w-full ">
            <span className="mt-10 text-4xl text-old-brick-800 text-center font-extrabold">
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
                            <span className="text-old-brick-600">
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
                                <span className="text-old-brick-600">
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
                        className="pushable rounded-3xl  bg-old-brick-600 hover:bg-old-brick-700 hover:text-old-brick-900 transform-cpu"
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
          className={"w-auto h-[35rem] rounded-3xl"}
        />
        <Contact />
      </section>
    </div>
  );
};

export default Homepage;
