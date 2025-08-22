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
import useSiteConfig from "../hooks/useSiteConfig";
function Contact() {
  const { config, loading } = useSiteConfig();

  if (loading) {
    return (
      <div className="mt-20">
        <ContainerWrapper>
          <div className="w-full pt-16">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    );
  }

  return (
    <div className="mt-20">
      <ContainerWrapper>
        <div className="w-full  pt-16">
          <section className="pb-10 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-6 px-2 items-center justify-between md:py-15">
            <Image src={"contact-us.jpg"} />
            <div className="flex flex-col gap-5 ">
              <h1 className="text-3xl text-center font-bold text-brick-800">
                Contact Us
              </h1>
              <div className="upper bg-red-500 rounded-2xl mt-8">
                <div className="lower bg-old-brick-700 rounded-2xl mr-1 pt-1 pb-4">
                  <h1 className="pl-4 text-2xl font-extrabold text-white flex items-center gap-2 border-b border-old-brick-900 mx-2">
                    Contact With Us
                  </h1>
                  <div className="text-gray-200 text-md  font-medium px-4 flex items-start flex-col gap-4 py-4">
                    {config?.phone?.map((e) => (
                      <a
                        key={e}
                        href={`tel:${e}`}
                        className="flex items-end text-md gap-2"
                      >
                        <Phone /> +91-{e}
                      </a>
                    ))}

                    <a
                      href={`mailto:${config?.email}`}
                      className="flex items-end text-md  gap-2"
                    >
                      <MailIcon /> {config?.email}
                    </a>
                  </div>
                </div>
              </div>

              {config?.address?.map((e) => (
                <div key={e} className="upper bg-red-500 rounded-2xl ">
                  <div className="lower bg-old-brick-700 rounded-2xl mr-1 pt-1 pb-4 ">
                    {/* <h1 className="pl-4 text-2xl font-extrabold text-white flex items-center gap-2 border-b border-old-brick-900 mx-2">
                    Office:
                  </h1> */}
                    <div className="text-gray-200 text-md  font-medium px-4 flex items-start flex-col gap-4 py-4">
                      {e}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </ContainerWrapper>
    </div>
  );
}

export default Contact;
