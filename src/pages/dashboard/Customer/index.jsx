import React, { useEffect, useState } from "react";
import Table from "../../../components/ui/table/Table";
import ApiService from "../../../services/Api_services";
import { toast } from "react-hot-toast";
import Badge, { enums } from "../../../components/ui/badge";
import Modal from "../../../components/ui/modal";
import { Formik } from "formik";
import Input from "../../../components/ui/input";
import { BiIdCard, BiRupee } from "react-icons/bi";
import Select from "../../../components/ui/select";
import {
  RiLockPasswordLine,
  RiUser2Line,
  RiUserHeartLine,
  RiUserSearchLine,
} from "react-icons/ri";
import Button from "../../../components/ui/button";
import { Link2Icon, MailIcon, Phone, User2Icon } from "lucide-react";
import {
  UpdatecustomerSchema,
  addNewsDto,
  agentSchema,
} from "../../../schemas";
import ConfirmationModal from "../../../components/confirmationModal";
import { SlLocationPin } from "react-icons/sl";
import useFetch from "../../../hooks/useFetch";
import moment from "moment";
import { ToWords } from "to-words";
import {
  Calendar,
  CreditCardIcon,
  FlagIcon,
  ImagePlus,
  IndentIcon,
  Locate,
  LocateFixedIcon,
  MapIcon,
  Wallet,
} from "lucide-react";
import TextArea from "../../../components/ui/textarea";
import { GoLocation } from "react-icons/go";
import { BsBank } from "react-icons/bs";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { GiReturnArrow } from "react-icons/gi";
const generateRandomSixDigitNumber = () =>
  `${Math.floor(100000 + Math.random() * 900000)}`;
const initialModalState = {
  state: false,
  edit_id: "",
  data: {
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
    password: "",
  },
};
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
function Cutomers() {
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
  const [modal, setModal] = useState(initialModalState);
  const [applications, setApplications] = useState({
    loading: true,
    data: [],
  });
  const [DconfirmModal, setDConfirmModal] = useState({
    state: false,
    id: null,
  });

  function edit(id) {
    const customer = applications.data.find((c) => c.id === id);
    setModal((prevModal) => ({
      ...prevModal,
      state: true,
      edit_id: id,
      data: {
        ...prevModal.data,
        name: customer.name || "",
        guardian_relation: customer.guardian_relation || "",
        guardian_name: customer.guardian_name || "",
        phone: customer.phone || "",
        dob: customer.dob ? customer.dob.split("T00:00:00.985Z")[0] : "",
        email: customer.email || "",
        loanInNumber: customer.loanInNumber || "",
        loanInWords: customer.loanInWords || "",
        loanYear: customer.loanYear || "",
        address: customer.address || "",
        district: customer.district || "",
        State: customer.State || "",
        pinCode: customer.pinCode || "",
        agentId: customer.employeeId || "",
        bank: customer.bank || "",
        bankProof: customer.bankProof || "",
        AccountNumber: customer.AccountNumber || "",
        ifsc: customer.ifsc || "",
        accountType: customer.accountType || "",
        adharNumber: customer.adharNumber || "",
        panNumber: customer.panNumber || "",
      },
    }));
  }

  const allEmployees = useFetch(`api/agent/employee`);
  function renderModal() {
    const { state, edit_id, data } = modal;

    return (
      <Modal
        size="max-w-5xl"
        title={
          <lable>
            <span>Mange Customer</span>
            <p className="text-sm font-normal text-red-600">
              ( Upload only those document which you want you update )
            </p>
          </lable>
        }
        open={state}
        setOpen={() => setModal(initialModalState)}
      >
        <Formik
          enableReinitialize={true}
          validationSchema={UpdatecustomerSchema}
          initialValues={data}
          onSubmit={async (values, action) => {
            try {
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
              if (values.password === "") delete payload.password;
              const updatedPayload = { ...payload };

              if (values.AdharCard) {
                await new Promise((resolve) => {
                  fileToBase64(values.AdharCard, (base64Data) => {
                    updatedPayload.AdharCard = base64Data;
                    resolve();
                  });
                });
              }

              if (values.photo) {
                await new Promise((resolve) => {
                  fileToBase64(values.photo, (base64Data) => {
                    updatedPayload.photo = base64Data;
                    resolve();
                  });
                });
              }

              if (values.panCard) {
                await new Promise((resolve) => {
                  fileToBase64(values.panCard, (base64Data) => {
                    updatedPayload.panCard = base64Data;
                    resolve();
                  });
                });
              }

              if (values.proofDoc) {
                await new Promise((resolve) => {
                  fileToBase64(values.proofDoc, (base64Data) => {
                    updatedPayload.proofDoc = base64Data;
                    resolve();
                  });
                });
              }

              const res = await ApiService.fetchData({
                url: `api/customer/${edit_id}`,
                method: "PUT",
                data: updatedPayload,
              });

              if (res) {
                toast.success(res.data.message);
                FetchNews();
                setModal(initialModalState);
              }
            } catch (error) {
              toast.error(error.response.data.message);
            } finally {
              // action.resetForm();
              action.setSubmitting(false);
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
                <h3 className="text-2xl text-left w-full font-normal">
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
                <span className="text-sm text-normal w-full text-left">
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
                <h3 className="text-2xl text-left w-full font-normal">
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
                <h3 className="text-2xl text-left w-full font-normal">
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
                <Select
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
                    >{`${a.firstName} ${a.LastName} (${a.employeeCode})`}</option>
                  ))}
                </Select>
              </div>
              <div className="flex  items-center flex-col gap-2">
                <h3 className="text-2xl text-left w-full font-normal">
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
                <h3 className="text-2xl text-left w-full font-normal">
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

                <span className="flex items-center gap-2 w-full justify-between">
                  <Input
                    name="password"
                    label=""
                    type="text"
                    placeholder="Password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    icon={<RiLockPasswordLine className="text-indigo-600" />}
                    error={touched.password && errors.password}
                  />
                  <GiReturnArrow
                    onClick={() => {
                      setValues((prev) => ({
                        ...prev,
                        password: generateRandomSixDigitNumber(),
                      }));
                    }}
                    className="text-indigo-500 cursor-pointer"
                  />
                </span>
                <Button
                  loading={isSubmitting}
                  loadingText={"Submitting"}
                  type={"submit"}
                  disabled={isSubmitting}
                  size={"FULL"}
                >
                  Update{" "}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    );
  }

  useEffect(() => {
    FetchNews();
  }, []);
  async function FetchNews() {
    try {
      const res = await ApiService.fetchData({
        url: `api/customer`,
        method: "GET",
      });
      setApplications((prev) => ({
        ...prev,
        loading: false,
        data: res.data.data,
      }));
    } catch (error) {
      toast.error(error.response.data.message);
      setApplications((prev) => ({
        ...prev,
        loading: false,
        data: [],
      }));
    }
  }

  const columns = () => [
    {
      Header: "loan id",
      accessor: (e) => (e.customerId ? e.customerId : "N/A"),
    },
    {
      Header: "amount",
      accessor: (e) => (e.loanInNumber ? e.loanInNumber : "N/A"),
    },
    {
      Header: "amount (In words)",
      accessor: (e) => (e.loanInWords ? e.loanInWords : "N/A"),
    },
    {
      Header: "name",
      accessor: (e) => (e.name ? e.name : "N/A"),
    },
    {
      Header: "Photo",
      accessor: (a) => (
        <a className="text-blue-600 underline" href={a.photo?.url}>
          {a.photo?.url ? "Download" : "N/A"}
        </a>
      ),
    },
    {
      Header: "guardian relation",
      accessor: (e) =>
        e.guardian_relation === "SONOF"
          ? "S/O"
          : e.guardian_relation === "DOF"
          ? "D/O"
          : "W/O",
    },
    {
      Header: "guardian_name",
      accessor: (e) => (e.guardian_name ? e.guardian_name : "N/A"),
    },
    {
      Header: "phone",
      accessor: (e) => (e.phone ? e.phone : "N/A"),
    },
    {
      Header: "Email",
      accessor: (e) => (e.email ? e.email : "N/A"),
    },
    {
      Header: "dob",
      accessor: (e) => (e.dob ? moment(e.dob).format("DD/MM/YYYY") : "N/A"),
    },
    {
      Header: "loan FYear",
      accessor: (e) => (e.loanYear ? e.loanYear : "N/A"),
    },
    {
      Header: "address",
      accessor: (e) => (e.address ? e.address : "N/A"),
    },
    {
      Header: "district",
      accessor: (e) => (e.district ? e.district : "N/A"),
    },
    {
      Header: "State",
      accessor: (e) => (e.State ? e.State : "N/A"),
    },
    {
      Header: "pin code",
      accessor: (e) => (e.pinCode ? e.pinCode : "N/A"),
    },
    {
      Header: "bank",
      accessor: (e) => (e.bank ? e.bank : "N/A"),
    },
    {
      Header: "AccountNumber",
      accessor: (e) => (e.AccountNumber ? e.AccountNumber : "N/A"),
    },
    {
      Header: "ifsc",
      accessor: (e) => (e.ifsc ? e.ifsc : "N/A"),
    },
    {
      Header: "account Type",
      accessor: (e) => (e.accountType ? e.accountType : "N/A"),
    },
    {
      Header: "adhar Number",
      accessor: (e) => (e.adharNumber ? e.adharNumber : "N/A"),
    },
    {
      Header: "Adhar Card",
      accessor: (a) => (
        <a className="text-blue-600 underline" download={a.AdharCard?.url}>
          {a.AdharCard?.url ? "Download" : "N/A"}
        </a>
      ),
    },
    {
      Header: "pan Number",
      accessor: (e) => (e.panNumber ? e.panNumber : "N/A"),
    },
    {
      Header: "Pan Card",
      accessor: (a) => (
        <a className="text-blue-600 underline" download={a.panCard?.url}>
          {a.panCard?.url ? "Download" : "N/A"}
        </a>
      ),
    },
    {
      Header: "Proof Doc",
      accessor: (e) => (e.bankProof ? e.bankProof : "N/A"),
    },
    {
      Header: "Proof",
      accessor: (a) => (
        <a className="text-blue-600 underline" download={a.proofDoc?.url}>
          {a.proofDoc?.url ? "Download" : "N/A"}
        </a>
      ),
    },
    {
      Header: "Tracking By",
      accessor: (a) =>
        a.agent
          ? a.agent.firstName +
            " " +
            a.agent.LastName +
            "(" +
            a.agent.employeeCode +
            ")"
          : "N/A",
    },
    {
      Header: "Applied On",
      accessor: (e) =>
        e.createdAt ? moment(e.createdAt).format("DD/MM/YYYY") : "N/A",
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (cell) => (
        <span className="flex items-center justify-start gap-4">
          <Badge onClick={() => edit(cell.row.original.id)} type={enums.GREEN}>
            Manage
          </Badge>
          <Badge
            onClick={() =>
              setDConfirmModal((prev) => ({
                state: true,
                id: Number(cell.row.original.id),
              }))
            }
            type={enums.RED}
          >
            Delete
          </Badge>
        </span>
      ),
    },
  ];

  return (
    <>
      {renderModal()}
      <ConfirmationModal
        description="Do you really want to delete this Customer?"
        isDelete
        open={DconfirmModal.state}
        setOpen={() => {
          setDConfirmModal({
            state: false,
            id: null,
          });
        }}
        onDelete={async () => {
          const res = await ApiService.fetchData({
            url: `api/customer/${DconfirmModal.id}`,
            method: "DELETE",
          });
          if (res) toast.success(res.data.message);
          setApplications((prev) => ({
            ...prev,
            data: prev.data.filter((n) => n.id !== Number(DconfirmModal.id)),
          }));
          setDConfirmModal((prev) => ({
            state: false,
            id: null,
          }));
        }}
      />

      <Table
        title="Customer"
        subtitle={"Our Customer"}
        dataName={"customers"}
        data={applications.data}
        columns={columns()}
      />
    </>
  );
}

export default Cutomers;
