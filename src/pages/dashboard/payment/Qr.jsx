import React from "react";
import useFetch from "../../../hooks/useFetch";
import { PhotoIcon } from "@heroicons/react/24/outline";

import { useFormik } from "formik";
import toast from "react-hot-toast";
import ApiService from "../../../services/Api_services";
import Button from "../../../components/ui/button";

function Qr() {
  const qr = useFetch("api/payment-qr");
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
  const { values, handleSubmit, isSubmitting, errors, handleBlur, touched } =
    useFormik({
      initialValues: {
        file: {},
      },
      validate: (values) => {
        const errors = {};
        if (!values.file) {
          errors.file = "Please enter a valid qr code";
        }
        if (values.file.size > 2097152) {
          errors.file = "File size must be less than 2mb";
        }

        return errors;
      },
      onSubmit: async (values, action) => {
        const payload = {};
        await new Promise((resolve) => {
          fileToBase64(values.file, (base64Data) => {
            payload.qr = base64Data;
            resolve();
          });
        });
        try {
          const res = await ApiService.fetchData({
            url: `api/payment-qr`,
            method: "POST",
            data: payload,
          });
          toast.success(res.data.message);
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
      },
    });
  return (
    <div className="w-full flex flex-col">
      <h1>
        {qr.data.length ? `Add at ${qr.data[0].createdAt}` : "No Qr Code"}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center w-full flex-col h-[75vh]"
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
        <Button type={"submit"}>Upload</Button>
      </form>
    </div>
  );
}

export default Qr;
