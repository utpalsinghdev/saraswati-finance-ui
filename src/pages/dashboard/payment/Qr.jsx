import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { PhotoIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";

import { Formik, useFormik } from "formik";
import toast from "react-hot-toast";
import ApiService from "../../../services/Api_services";
import Button from "../../../components/ui/button";
import moment from "moment";
import { GoLocation } from "react-icons/go";
import Input from "../../../components/ui/input";
import { Building2Icon, PhoneIcon, MapPinIcon } from "lucide-react";

function Qr() {
  const [formData, setFormData] = useState({
    file: {},
    title: "",
    email: "",
    bankName: "",
    accountNo: "",
    ifsc: "",
    holderName: "",
    fileCharge: "",
    phoneNumbers: [""],
    addresses: [""],
  });
  const [general, setGeneral] = useState({
    data: {},
    loading: true,
  });
  async function fetchData() {
    try {
      const res = await ApiService.fetchData({
        url: "api/payment-qr",
        method: "GET",
      });
      setGeneral({ data: res.data.data[0] || null, loading: false });
      setFormData({
        file: {},
        title: res.data.data[0]?.title || "",
        email: res.data.data[0]?.email || "",
        bankName: res.data.data[0]?.bankName || "",
        accountNo: res.data.data[0]?.accountNo || "",
        ifsc: res.data.data[0]?.ifsc || "",
        holderName: res.data.data[0]?.holderName || "",
        fileCharge: res.data.data[0]?.fileCharge || "",
        phoneNumbers: res.data.data[0]?.phoneNumbers || [""],
        addresses: res.data.data[0]?.addresses || [""],
      });
    } catch (error) {
      toast.error(
        typeof error.response.data.message !== "string"
          ? error.response.data?.[0]
          : error.response.data.message
      );
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
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

  return (
    <div className="w-full  flex flex-col">
      <h1>
        {general.data
          ? `Last Updated on ${moment(general.data.updatedAt).format("ll")}`
          : "No Bank Details added Yet"}
      </h1>
      <h1 className=" text-xl font-bold  ">Pyament Qr Code</h1>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={async (values, action) => {
          const payload = {
            ...values,
          };
          try {
            const uploadFile = new FormData();
            uploadFile.append("file", values.file);
            const resFile = await ApiService.fetchData({
              url: `api/payment-qr/upload-qr-code`,
              method: "POST",
              data: uploadFile,
            });
            payload.qr =
              `${import.meta.env.VITE_BASE_URL}/` + resFile.data.data.url;
            const res = await ApiService.fetchData({
              url: `api/payment-qr`,
              method: "POST",
              data: payload,
            });
            toast.success(res.data.message);
            fetchData();
          } catch (error) {
            toast.error(
              typeof error.response.data.message !== "string"
                ? error.response.data?.[0]
                : error.response.data.message
            );
          } finally {
            action.resetForm();
            action.setSubmitting(false);
          }
        }}
      >
        {({
          values,
          handleSubmit,
          isSubmitting,
          errors,
          handleBlur,
          touched,
          handleChange,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="flex relative items-center justify-center w-full flex-col h-[30vh]"
          >
            <div className="w-[50%]">
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>
                        {values.file.name ? values.file.name : "Upload a file"}
                      </span>
                      <input
                        accept="image/*"
                        id="file-upload"
                        name="file"
                        type="file"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          values.file = e.target.files[0];
                        }}
                        className="sr-only"
                      />
                    </label>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 2MB
                  </p>
                </div>
              </div>
            </div>
            <span>{touched.file && errors.file}</span>
            <Button disabled={isSubmitting} type={"submit"} className={"w-max"}>
              {isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </form>
        )}
      </Formik>

      <h1 className=" text-xl font-bold">Site Configuration & Bank Details</h1>
      <Formik
        initialValues={formData}
        enableReinitialize={true}
        onSubmit={async (values, action) => {
          const payload = {
            ...values,
          };
          try {
            const res = await ApiService.fetchData({
              url: `api/payment-qr`,
              method: "POST",
              data: payload,
            });
            toast.success(res.data.message);
            fetchData();
          } catch (error) {
            toast.error(
              typeof error.response.data.message !== "string"
                ? error.response.data?.[0]
                : error.response.data.message
            );
          } finally {
            action.resetForm();
            action.setSubmitting(false);
          }
        }}
      >
        {({
          values,
          handleSubmit,
          isSubmitting,
          errors,
          handleBlur,
          touched,
          handleChange,
          setFieldValue,
        }) => (
          <form
            onSubmit={handleSubmit}
            className="relative pt-4 rounded-b-md pb-8 border-t border-gray-300 flex flex-col gap-4 px-4 bg-white"
          >
            <div className="max-w-md">
              <Input
                name="title"
                type={"text"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                error={touched.title && errors.title}
                icon={<Building2Icon size={18} className=" text-indigo-500" />}
                label={"Company Title"}
                placeholder={"Enter Company Title"}
              />
              <Input
                name="email"
                type={"email"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && errors.email}
                icon={<Building2Icon size={18} className=" text-indigo-500" />}
                label={"Email"}
                placeholder={"Enter Email"}
              />
              <Input
                name="bankName"
                type={"text"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.bankName}
                error={touched.location && errors.bankName}
                icon={<Building2Icon size={18} className=" text-indigo-500" />}
                label={"Bank Name"}
                placeholder={"Enter Bank Name"}
              />
              <Input
                name="accountNo"
                type={"text"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.accountNo}
                error={touched.accountNo && errors.accountNo}
                icon={<Building2Icon size={18} className=" text-indigo-500" />}
                label={"Account Number"}
                placeholder={"Enter Account Number"}
              />
              <Input
                name="ifsc"
                type={"text"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.ifsc}
                error={touched.ifsc && errors.ifsc}
                icon={<Building2Icon size={18} className=" text-indigo-500" />}
                label={"IFSC"}
                placeholder={"Enter IFSC"}
              />
              <Input
                name="holderName"
                type={"text"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.holderName}
                error={touched.holderName && errors.holderName}
                icon={<Building2Icon size={18} className=" text-indigo-500" />}
                label={"Account Holder Name"}
                placeholder={"Enter Account Holder Name"}
              />
              <Input
                name="fileCharge"
                type={"text"}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.fileCharge}
                error={touched.fileCharge && errors.fileCharge}
                icon={<Building2Icon size={18} className=" text-indigo-500" />}
                label={"File Charge"}
                placeholder={"Enter File Charge"}
              />
            </div>

            {/* Phone Numbers Section */}
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <PhoneIcon size={20} className="text-indigo-500" />
                Phone Numbers
              </h3>
              {values.phoneNumbers.map((phone, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    name={`phoneNumbers.${index}`}
                    type={"text"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={phone}
                    error={touched.phoneNumbers?.[index] && errors.phoneNumbers?.[index]}
                    label={`Phone Number ${index + 1}`}
                    placeholder={"Enter Phone Number"}
                    className="flex-1"
                  />
                  {values.phoneNumbers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newPhones = values.phoneNumbers.filter((_, i) => i !== index);
                        setFieldValue("phoneNumbers", newPhones);
                      }}
                      className="mt-6 p-2 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFieldValue("phoneNumbers", [...values.phoneNumbers, ""]);
                }}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                <PlusIcon size={16} />
                Add Phone Number
              </button>
            </div>

            {/* Addresses Section */}
            <div className="max-w-md">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MapPinIcon size={20} className="text-indigo-500" />
                Addresses
              </h3>
              {values.addresses.map((address, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    name={`addresses.${index}`}
                    type={"text"}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={address}
                    error={touched.addresses?.[index] && errors.addresses?.[index]}
                    label={`Address ${index + 1}`}
                    placeholder={"Enter Address"}
                    className="flex-1"
                  />
                  {values.addresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const newAddresses = values.addresses.filter((_, i) => i !== index);
                        setFieldValue("addresses", newAddresses);
                      }}
                      className="mt-6 p-2 text-red-500 hover:text-red-700"
                    >
                      <TrashIcon size={20} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => {
                  setFieldValue("addresses", [...values.addresses, ""]);
                }}
                className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                <PlusIcon size={16} />
                Add Address
              </button>
            </div>

            <Button type={"submit"} className={"w-max"}>
              {isSubmitting ? "Uploading..." : "Upload"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Qr;
