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
function Contact() {
  return (
    <div className="bg-gray-100">
      <CarouselBanner height="350px" />
      <ContainerWrapper>
        <HeadingWrapper
          heading="Contact"
          title="Green Apple Financial Services Private Limited."
        >
           <div className="w-full bg-gray-100">
          <section className="py-10 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 px-2 items-center justify-between md:py-15">
            <div className="max-w-[500px] min-w-[500px] h-[430px]">
              <div className="w-[500px] h-[500px] flex flex-col gap-8 flex flex-col text-left px-8 md:px-0">
                <p className="text-2xl text-indigo-500 font-medium md:text-left text-center">
                  {">"} Easy Application
                </p>
                <p className="text-2xl text-indigo-500 font-medium md:text-left text-center">
                  {">"} Fast Approval
                </p>
                <p className="text-2xl text-indigo-500 font-medium md:text-left text-center">
                  {">"} Low interest rate
                </p>
                <p className="text-2xl text-indigo-500 font-medium md:text-left text-center">
                  {">"} Free consultation
                </p>
                <p className="text-2xl text-indigo-500 font-medium md:text-left text-center">
                  {">"} Flexible repayment
                </p>
                <p className="text-2xl text-indigo-500 font-medium md:text-left text-center">
                  {">"} Blacklisted accepted
                </p>
                <p className="text-2xl text-indigo-500 font-medium md:text-left text-center">
                  {">"} Get Approval in one day
                </p>
              </div>
            </div>
            <Image src={"/contact_arrow.png"} />
            <div className="flex flex-col text-left  px-4 md:px-0    ">
              <span className="W-full text-2xl  text-left font-medium text-white bg-indigo-500 rounded-t-md px-8 py-4 ">
                About Us
              </span>
              <div className="w-full pt-4 rounded-b-md pb-8 flex flex-col gap-4 px-4 bg-white">
                <Input
                  label={""}
                  type={"text"}
                  name="name"
                  placeholder={"Name"}
                  icon={<BiUser className="text-indigo-600" />}
                />
                <Input
                  label={""}
                  type={"email"}
                  name="email"
                  placeholder={"Email"}
                  icon={<AiOutlineMail className="text-indigo-600" />}
                />
                <Input
                  label={""}
                  type={"text"}
                  name="phone"
                  placeholder={"Phone"}
                  icon={<BiPhone className="text-indigo-600" />}
                />
                <TextArea
                  row={5}
                  name="phone"
                  label={""}
                  placeholder={"Your Message"}
                  icon={<BiPhone className="text-indigo-600" />}
                />
                <Button size={"FULL"}>Send Message</Button>
              </div>
            </div>
          </section>
      </div>
        </HeadingWrapper>
      </ContainerWrapper>
    </div>
  );
}

export default Contact;
