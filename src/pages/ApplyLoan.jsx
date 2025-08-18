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
import { Formik } from "formik";
import { customerSchema } from "../schemas";
import { ToWords } from "to-words";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import { toast } from "react-hot-toast";
import Modal from "../components/ui/modal";
import ComboBox from "../components/ui/comboBox";
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
function ApplyLoan() {
  const toWords = new ToWords({
    localeCode: "en-IN",
    converterOptions: {
      currency: true,
      ignoreDecimal: false,
      ignoreZeroCurrency: false,
      doNotAddOnly: false,
      currencyOptions: {
        name: "Rupee",
        plural: "Rupees",
        symbol: "₹",
        fractionalUnit: {
          name: "Paisa",
          plural: "Paise",
          symbol: "",
        },
      },
    },
  });
  const [sucess, setSucess] = React.useState({
    state: false,
    applicationId: null,
    applicant: null,
  });
  const allEmployees = useFetch(`api/agent`);
  const renderSucess = () => {
    return (
      <Modal
        title=" "
        open={sucess.state}
        setOpen={() => {
          setSucess((prev) => ({
            state: false,
            applicationId: null,
            applicant: null,
          }));
        }}
      >
        <div className="flex flex-col gap-4 items-center justify-center">
          <img src="/Success.jpg" className="h-48" />
          <h1 className="text-2xl font-bold text-green-600 text-center">
            Application Submitted Sucessfully
          </h1>
          <h1 className="text-2xl font-bold text-green-600 text-start w-full">
            Application Id : {sucess.applicationId}
          </h1>
          <h1 className="text-2xl font-bold text-green-600 text-start w-full">
            Applicant Name : {sucess.applicant}
          </h1>
        </div>
      </Modal>
    );
  };
  return (
    <div className="bg-gray-100 mt-20 md:mt-28">
      {renderSucess()}
      <ContainerWrapper>
        <div className="p-0 md:p-4">
          <h1 className="text-xl  py-4 border-b-4 px-2 rounded-2xl border-red-500 text-center font-extrabold">
            <span className="text-old-brick-700 text-2xl ">APPLY FOR LOAN</span>{" "}
          </h1>
        </div>
        <Formik
          enableReinitialize={true}
          validationSchema={customerSchema}
          initialValues={{
            agree: false,
            name: "",
            guardian_relation: "SONOF",
            guardian_name: "",
            phone: "",
            dob: null,
            email: "",
            loanInNumber: 0,
            loanInWords: "",
            loanYear: 0,
            address: "",
            district: "",
            State: "",
            pinCode: 0,
            agentId: "",
            bank: "",
            AccountNumber: "",
            ifsc: "",
            accountType: "",
            photo: "",
            AdharCard: null,
            adharNumber: "",
            panNumber: "",
            bankProof: "",
            proofDoc: null,
            panCard: null,
          }}
          onSubmit={async (values, action) => {
            const payload = { ...values };
            payload.dob = values.dob + "T00:00:00.985Z";
            payload.loanInNumber = Number(values.loanInNumber);
            payload.loanInWords = toWords.convert(values.loanInNumber);
            payload.loanYear = Number(values.loanYear);
            payload.pinCode = Number(values.pinCode);
            payload.agentId = Number(values.agentId);
            payload.AccountNumber = values.AccountNumber.toString();
            payload.adharNumber = values.adharNumber.toString();
            payload.panNumber = values.panNumber.toString();
            await new Promise((resolve) => {
              fileToBase64(values.AdharCard, (base64Data) => {
                payload.AdharCard = base64Data;
                resolve();
              });
            });
            await new Promise((resolve) => {
              fileToBase64(values.photo, (base64Data) => {
                payload.photo = base64Data;
                resolve();
              });
            });
            await new Promise((resolve) => {
              fileToBase64(values.panCard, (base64Data) => {
                payload.panCard = base64Data;
                resolve();
              });
            });
            await new Promise((resolve) => {
              fileToBase64(values.proofDoc, (base64Data) => {
                payload.proofDoc = base64Data;
                resolve();
              });
            });
            try {
              const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/customer`,
                payload
              );
              toast.success(res.data.message);
              setSucess({
                state: true,
                applicationId: res.data.data.loanId,
                applicant: res.data.data.name,
              });
            } catch (error) {
              toast.error(error.response.data.message);
            } finally {
              action.resetForm();
              // action.setSubmitting(false);
            }
          }}
        >
          {({
            values,
            errors,
            setValues,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex pb-4 items-start gap-4 md:gap-24 justify-start flex-col md:flex-row  mt-4 p-0 md:p-8 lg:px-20  "
            >
              <div className="flex  items-center  flex-col gap-2">
                <h3 className="text-3xl text-left w-full font-bold text-old-brick-800">
                  Personal Information
                </h3>
                <Input
                  name="name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                  error={touched.name && errors.name}
                  icon={<User2Icon className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Your Name"}
                />
                <span className="flex items-center justify-between w-full gap-8">
                  <Select
                    label={""}
                    name={"guardian_relation"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.guardian_relation}
                    error={
                      touched.guardian_relation && errors.guardian_relation
                    }
                    icon={<RiUserHeartLine className="w-4 text-indigo-500" />}
                  >
                    <option value={"SONOF"}>S/O</option>
                    <option value={"DOF"}>D/O</option>
                    <option value={"WOF"}>W/O</option>
                  </Select>
                  <Input
                    name="guardian_name"
                    type={"text"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.guardian_name}
                    error={touched.guardian_name && errors.guardian_name}
                    icon={<RiUser2Line className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"Guardian Name"}
                  />
                </span>
                <Input
                  name="phone"
                  type={"text"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                  error={touched.phone && errors.phone}
                  icon={<Phone className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Mobile Number"}
                />
                <span className="text-3xl text-left w-full font-bold text-old-brick-800">
                  Date of Birth
                </span>
                <Input
                  name="dob"
                  type={"date"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.dob}
                  error={touched.dob && errors.dob}
                  icon={<Calendar className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Date of Birth"}
                />
                <Input
                  name="email"
                  type={"email"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && errors.email}
                  icon={<MailIcon className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Email Address"}
                />
                <h3 className="text-3xl text-left w-full font-bold text-old-brick-800">
                  Loan Information
                </h3>
                <Input
                  name="loanInNumber"
                  type={"number"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.loanInNumber}
                  error={touched.loanInNumber && errors.loanInNumber}
                  icon={<BiRupee size={20} className="text-indigo-500" />}
                  label={""}
                  placeholder={"Loan Amount"}
                />
                <Input
                  name="loanInWords"
                  type={"text"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={true}
                  value={toWords.convert(Number(values.loanInNumber))}
                  error={touched.loanInWords && errors.loanInWords}
                  icon={<Wallet className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Loan Amount in words"}
                />
                <span className="flex items-center justify-between w-full gap-8">
                  <Input
                    name="loanYear"
                    type={"number"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.loanYear}
                    error={touched.loanYear && errors.loanYear}
                    icon={<Calendar className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"Loan Year"}
                  />
                  <Input
                    name="loanMonth"
                    type={"text"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={12 * values.loanYear + " Months"}
                    disabled={true}
                    icon={<Calendar className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"In Month"}
                  />
                </span>
                <h3 className="text-3xl text-left w-full font-bold text-old-brick-800">
                  Complete Address
                </h3>
                <TextArea
                  name="address"
                  type={"text"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.address}
                  error={touched.address && errors.address}
                  label={""}
                  row={3}
                  placeholder={"House No, Street City"}
                  icon={<GoLocation size={18} className=" text-indigo-500" />}
                />
                <Input
                  name="district"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.district}
                  error={touched.district && errors.district}
                  type={"text"}
                  icon={<MapIcon className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"District"}
                />
                <span className="flex items-center justify-between w-full gap-8">
                  <Input
                    name="State"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.State}
                    error={touched.State && errors.State}
                    type={"text"}
                    icon={<SlLocationPin className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"State"}
                  />
                  <Input
                    name="pinCode"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.pinCode}
                    error={touched.pinCode && errors.pinCode}
                    type={"number"}
                    icon={<FlagIcon className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"Pincode"}
                  />
                </span>
                {/* <Select
                  name={"agentId"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.agentId}
                  error={touched.agentId && errors.agentId}
                  label={""}
                  icon={<RiUserSearchLine className="w-4 text-indigo-500" />}
                >
                  <option>Select Agent</option>
                  {allEmployees.data?.map((a) => (
                    <option
                      key={a.id}
                      value={a.id}
                    >{`${a.firstName} ${a.LastName}`}</option>
                  ))}
                </Select> */}
                <ComboBox
                  people={allEmployees.data?.map((a) => ({
                    id: a.id,
                    name: `${a.firstName} ${a.LastName}`,
                  }))}
                  onChange={(e) => {
                    setValues({ ...values, agentId: Number(e) });
                  }}
                  name={"agentId"}
                  placeholder={"Select the Agent"}
                  value={values.agentId}
                  onBlur={handleBlur}
                  boxSize="w-full"
                  error={touched.agentId && errors.agentId}
                  icon={<RiUserSearchLine className="w-4 text-indigo-500" />}
                />
              </div>
              <div className="flex  items-center flex-col gap-2">
                <h3 className="text-3xl text-left w-full font-bold text-old-brick-800">
                  Banking Information
                </h3>
                <Input
                  name="bank"
                  type={"text"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.bank}
                  error={touched.bank && errors.bank}
                  icon={<User2Icon className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Bank Name"}
                />
                <Input
                  name="AccountNumber"
                  type={"number"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.AccountNumber}
                  error={touched.AccountNumber && errors.AccountNumber}
                  icon={<CreditCardIcon className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Account Number"}
                />
                <span className="flex items-center justify-between w-full gap-8">
                  <Input
                    name="ifsc"
                    type={"text"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.ifsc}
                    error={touched.ifsc && errors.ifsc}
                    icon={<BsBank className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"IFSC CODE"}
                  />
                  <Select
                    label={""}
                    name={"accountType"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.accountType}
                    error={touched.accountType && errors.accountType}
                    icon={<CreditCardIcon className="w-4 text-indigo-500" />}
                  >
                    <option>Account Type</option>
                    <option value={"SAVING"}>Saving</option>
                    <option value={"CURRENT"}>Current</option>
                  </Select>
                </span>
                <h3 className="text-3xl text-left w-full font-bold text-old-brick-800">
                  Identity Details
                </h3>
                <Input
                  label="Photo"
                  type={"file"}
                  name="photo"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setValues({ ...values, photo: e.target.files[0] });
                  }}
                  error={touched.photo && errors.photo}
                  icon={<ImagePlus className="w-4 text-indigo-500" />}
                  placeholder={"Mobile Number"}
                />
                <Input
                  label="Adhaar Card"
                  type={"file"}
                  name="AdharCard"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setValues({ ...values, AdharCard: e.target.files[0] });
                  }}
                  error={touched.AdharCard && errors.AdharCard}
                  icon={<ImagePlus className="w-4 text-indigo-500" />}
                  placeholder={"Mobile Number"}
                />

                <Input
                  name="adharNumber"
                  type={"number"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.adharNumber}
                  error={touched.adharNumber && errors.adharNumber}
                  icon={<IdentificationIcon className="w-4 text-indigo-500" />}
                  label={"Adhaar Number"}
                  placeholder={"Adhaar Number"}
                />
                <Input
                  label="PAN Card"
                  type={"file"}
                  name="panCard"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setValues({ ...values, panCard: e.target.files[0] });
                  }}
                  error={touched.panCard && errors.panCard}
                  icon={<ImagePlus className="w-4 text-indigo-500" />}
                  placeholder={"Mobile Number"}
                />
                <Input
                  name="panNumber"
                  type={"text"}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.panNumber}
                  error={touched.panNumber && errors.panNumber}
                  icon={<IdentificationIcon className="w-4 text-indigo-500" />}
                  label={"PAN Number"}
                  placeholder={"PAN Number"}
                />
                <Select
                  name={"bankProof"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.bankProof}
                  error={touched.bankProof && errors.bankProof}
                  label={""}
                  icon={<BsBank className="w-4 text-indigo-500" />}
                >
                  <option>Select Bank Proof</option>
                  <option value={"PASSBOOK"}>Bank Passbook</option>
                  <option value={"CHECQUE"}>Cheque</option>
                  <option value={"STATEMENT"}>6 Month Statement</option>
                </Select>
                <Input
                  label=""
                  type={"file"}
                  name="proofDoc"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    setValues({ ...values, proofDoc: e.target.files[0] });
                  }}
                  error={touched.proofDoc && errors.proofDoc}
                  icon={<ImagePlus className="w-4 text-indigo-500" />}
                  placeholder={"Mobile Number"}
                />

                <p className="text-md max-w-md font-medium text-left ">
                  I hereby declare that the information given in this
                  application is true and correct to the best of my knowledge
                  and belief. In case any information given in this application
                  proves to be false or incorrect, I shall be responsible for
                  the consequences.
                </p>
                <span className="flex items-center justify-start w-full mx-2 gap-4">
                  <input
                    checked={values.agree}
                    onClick={() => {
                      setValues((prev) => ({
                        ...prev,
                        agree: !values.agree,
                      }));
                    }}
                    id="other_document"
                    type="checkbox"
                  />{" "}
                  <label htmlFor="other_document" className="text-sm">
                    {" "}
                    I agree the terms and conditions
                  </label>
                </span>

                <button
                  type={"submit"}
                  disabled={!values.agree || isSubmitting}
                  className="pushable rounded-3xl bg-red-600 mt-2 disabled:cursor-not-allowed  hover:bg-red-900  block w-full"
                >
                  <span className="front bg-old-brick-700 hover:bg-old-brick-900 hover:text-white px-4 py-2  rounded-3xl font-semibold">
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </span>
                </button>
              </div>
            </form>
          )}
        </Formik>
      </ContainerWrapper>
    </div>
  );
}

export default ApplyLoan;
