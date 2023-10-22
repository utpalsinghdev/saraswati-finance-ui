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
              <h1 className="text-3xl text-center font-bold text-green-500">
                Contact Us
              </h1>
              <div className="upper bg-green-500 rounded-2xl mt-8">
                <div className="lower bg-blue-800 rounded-2xl mr-1 pt-1 pb-4">
                  <h1 className="pl-4 text-2xl font-extrabold text-green-600 flex items-center gap-2 border-b border-blue-900 mx-2">
                    Contact With Us
                  </h1>
                  <div className="text-gray-200 text-md  font-medium px-4 flex items-start flex-col gap-4 py-4">
                    <a
                      href="tel:8475059101"
                      className="flex items-end text-md gap-2"
                    >
                      <Phone /> +91-8475059101 (Complaint & Help)
                    </a>
                    <a
                      href="tel:7900700989"
                      className="flex items-end text-md  gap-2"
                    >
                      <Phone /> +91-7900700989
                    </a>
                    <a
                      href="mailto:caslonservices.com"
                      className="flex items-end text-md  gap-2"
                    >
                      <MailIcon /> info@caslonservices.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="upper bg-green-500 rounded-2xl ">
                <div className="lower bg-blue-800 rounded-2xl mr-1 pt-1 pb-4 ">
                  <h1 className="pl-4 text-2xl font-extrabold text-green-600 flex items-center gap-2 border-b border-blue-900 mx-2">
                    Office Address
                  </h1>
                  <div className="text-gray-200 text-md  font-medium px-4 flex items-start flex-col gap-4 py-4">
                    D-288,Gali No.10, Laxmi Nagar, Delhi-110092
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
