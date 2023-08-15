import React from "react";
import HeadingWrapper from "../components/ui/heading Wrapper";
import ContainerWrapper from "../components/ui/containtWrapper";
import Input from "../components/ui/input";
import {
  Calendar,
  CreditCardIcon,
  FlagIcon,
  ImagePlus,
  IndentIcon,
  Locate,
  LocateFixedIcon,
  MailIcon,
  MapIcon,
  Phone,
  User2Icon,
  Wallet,
} from "lucide-react";
import { RiUser2Line, RiUserHeartLine, RiUserSearchLine } from "react-icons/ri";
import Select from "../components/ui/select";
import { BiRupee } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import { SlLocationPin } from "react-icons/sl";
import TextArea from "../components/ui/textarea";
import { BsBank } from "react-icons/bs";
import { IdentificationIcon } from "@heroicons/react/20/solid";
import Button from "../components/ui/button";

function ApplyLoan() {
  return (
    <div className="bg-gray-100">
      <ContainerWrapper>
        <HeadingWrapper
          heading={"Loan Application Form"}
          title={"Apply Online"}
        >
          <form className="flex pb-4 items-start gap-4 md:gap-24 justify-start flex-col md:flex-row  mt-4 p-0 md:p-8 lg:px-20  ">
            <div className="flex  items-center  flex-col gap-2">
              <h3 className="text-2xl text-left w-full font-normal">
                Personal Information
              </h3>
              <Input
                name="name"
                icon={<User2Icon className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Your Name"}
              />
              <span className="flex items-center justify-between w-full gap-8">
                <Select
                  label={""}
                  icon={<RiUserHeartLine className="w-4 text-indigo-500" />}
                >
                  <option>S/O</option>
                  <option>D/O</option>
                  <option>W/O</option>
                </Select>
                <Input
                  name="guardian_name"
                  icon={<RiUser2Line className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Guardian Name"}
                />
              </span>
              <Input
                name="guardian_name"
                icon={<Phone className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Mobile Number"}
              />
              <span className="text-sm text-normal w-full text-left">
                Date of Birth
              </span>
              <Input
                name="dob"
                type={"date"}
                icon={<Calendar className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Date of Birth"}
              />
              <Input
                name="email"
                icon={<MailIcon className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Email Address"}
              />
              <h3 className="text-2xl text-left w-full font-normal">
                Loan Information
              </h3>
              <Input
                name="amount"
                icon={<BiRupee size={20} className="text-indigo-500" />}
                label={""}
                placeholder={"Loan Amount"}
              />
              <Input
                name="amount in words"
                icon={<Wallet className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Loan Amount in words"}
              />
              <span className="flex items-center justify-between w-full gap-8">
                <Input
                  name="dob"
                  type={"text"}
                  icon={<Calendar className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Loan Year"}
                />
                <Input
                  name="dob"
                  type={"text"}
                  icon={<Calendar className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"In Month"}
                />
              </span>
              <h3 className="text-2xl text-left w-full font-normal">
                Complete Address
              </h3>
              <TextArea
                label={""}
                row={3}
                placeholder={"House No, Street City"}
                icon={<GoLocation size={18} className=" text-indigo-500" />}
              />
              <Input
                name="dob"
                type={"text"}
                icon={<MapIcon className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"District"}
              />
              <span className="flex items-center justify-between w-full gap-8">
                <Input
                  name="test"
                  type={"text"}
                  icon={<SlLocationPin className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"State"}
                />
                <Input
                  name="dob"
                  type={"text"}
                  icon={<FlagIcon className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Pincode"}
                />
              </span>
              <Select
                label={""}
                icon={<RiUserSearchLine className="w-4 text-indigo-500" />}
              >
                <option>Select Agent</option>
              </Select>
            </div>
            <div className="flex  items-center flex-col gap-2">
              <h3 className="text-2xl text-left w-full font-normal">
                Banking Information
              </h3>
              <Input
                name="name"
                icon={<User2Icon className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Bank Name"}
              />
              <Input
                name="name"
                icon={<CreditCardIcon className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Account Number"}
              />
              <span className="flex items-center justify-between w-full gap-8">
                <Input
                  name="name"
                  icon={<BsBank className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"IFSC CODE"}
                />
                <Select
                  label={""}
                  icon={<CreditCardIcon className="w-4 text-indigo-500" />}
                >
                  <option>Account Type</option>
                  <option>Saving</option>
                  <option>Current</option>
                </Select>
              </span>
              <h3 className="text-2xl text-left w-full font-normal">
                Identity Details
              </h3>
              <Input
                label="Photo"
                type={"file"}
                name="guardian_name"
                icon={<ImagePlus className="w-4 text-indigo-500" />}
                placeholder={"Mobile Number"}
              />
              <Input
                label="Adhaar Card"
                type={"file"}
                name="guardian_name"
                icon={<ImagePlus className="w-4 text-indigo-500" />}
                placeholder={"Mobile Number"}
              />

              <Input
                name="dob"
                type={"number"}
                icon={<IdentificationIcon className="w-4 text-indigo-500" />}
                label={"Adhaar Number"}
                placeholder={"Adhaar Number"}
              />
              <Input
                label="PAN Card"
                type={"file"}
                name="guardian_name"
                icon={<ImagePlus className="w-4 text-indigo-500" />}
                placeholder={"Mobile Number"}
              />
              <Input
                name="dob"
                type={"number"}
                icon={<IdentificationIcon className="w-4 text-indigo-500" />}
                label={"PAN Number"}
                placeholder={"PAN Number"}
              />
              <Select
                label={""}
                icon={<BsBank className="w-4 text-indigo-500" />}
              >
                <option>Select Bank Proof</option>
                <option>Bank Passbook</option>
                <option>Cheque</option>
                <option>6 Month Statement</option>
              </Select>
              <Input
                label=""
                type={"file"}
                name="guardian_name"
                icon={<ImagePlus className="w-4 text-indigo-500" />}
                placeholder={"Mobile Number"}
              />
              <span className="flex items-center justify-start w-full mx-2 gap-4">
                <input id="other_document" type="checkbox" />{" "}
                <label htmlFor="other_document" className="text-sm">
                  {" "}
                  Other Documents
                </label>
              </span>

              <p className="text-md max-w-md text-left ">
                I hereby declare that the information given in this application
                is true and correct to the best of my knowledge and belief. In
                case any information given in this application proves to be
                false or incorrect, I shall be responsible for the consequences.
              </p>
              <span className="flex items-center justify-start w-full mx-2 gap-4">
                <input id="other_document" type="checkbox" />{" "}
                <label htmlFor="other_document" className="text-sm">
                  {" "}
                  I agree the terms and conditions
                </label>
              </span>
              <Button size={"FULL"}>Submit </Button>
            </div>
          </form>
        </HeadingWrapper>
      </ContainerWrapper>
    </div>
  );
}

export default ApplyLoan;
