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
import { AiFillInfoCircle, AiOutlineMail } from "react-icons/ai";
import { toast } from "react-hot-toast";
import axios from "axios";
import { sendMessageDto } from "../schemas";
import { Formik } from "formik";
import { MailIcon, Phone } from "lucide-react";
function Contact() {
  return (
    <div>
      <ContainerWrapper>
        <div className="w-full  pt-16">
          <section className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 px-2 items-center justify-between md:py-15">
            <Image src={"contact-us.jpg"} />
            <div className="flex flex-col gap-5 ">
              <h1 className="text-3xl text-center font-bold text-green-800">
                Contact Us
              </h1>
              <div className="upper bg-green-500 rounded-2xl mt-8">
                <div className="lower bg-orange-800 rounded-2xl mr-1 pt-1 pb-4">
                  <h1 className="pl-4 text-2xl font-extrabold text-green-600 flex items-center gap-2 border-b border-blue-900 mx-2">
                    Contact With Us
                  </h1>
                  <div className="text-gray-200 text-md  font-medium px-4 flex items-start flex-col gap-4 py-4">
                    <a
                      href="tel:7253978410"
                      className="flex items-end text-md gap-2"
                    >
                      <Phone /> +91-7253978410
                    </a>
                    <a
                      href="tel:7253978410"
                      className="flex items-end text-md  gap-2"
                    >
                      <Phone /> +91-7253978410
                    </a>
                    <a
                      href="mailto:info@futurefinancial.in"
                      className="flex items-end text-md  gap-2"
                    >
                      <MailIcon /> info@futurefinancial.in
                    </a>
                  </div>
                </div>
              </div>
              <div className="upper bg-green-500 rounded-2xl ">
                <div className="lower bg-orange-800 rounded-2xl mr-1 pt-1 pb-4 ">
                  <h1 className="pl-4 text-2xl font-extrabold text-green-600 flex items-center gap-2 border-b border-blue-900 mx-2">
                    Branch Office:
                  </h1>
                  <div className="text-gray-200 text-md  font-medium px-4 flex items-start flex-col gap-4 py-4">
                    Plot No.330, Bus stand Rd, Opp. Acharya Puri, Prem Nagar,
                    Sector 12, Gurugram, Haryana 122001
                  </div>
                </div>
              </div>
              <div className="upper bg-green-500 rounded-2xl ">
                <div className="lower bg-orange-800 rounded-2xl mr-1 pt-1 pb-4 ">
                  <h1 className="pl-4 text-2xl font-extrabold text-green-600 flex items-center gap-2 border-b border-blue-900 mx-2">
                    Head Office:
                  </h1>
                  <div className="text-gray-200 text-md  font-medium px-4 flex items-start flex-col gap-4 py-4">
                    17/1, GRA Tower, Ambalipura Main Road Off Sarjapur Road,
                    Agara Post Bengaluru, Karnataka 560103
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </ContainerWrapper>
    </div>
  );
}

export default Contact;
