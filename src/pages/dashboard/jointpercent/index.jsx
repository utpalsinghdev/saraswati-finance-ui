import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  PDFViewer,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import useFetch from "../../../hooks/useFetch";
import Modal from "../../../components/ui/modal";
import { Formik } from "formik";
import { JointSchema, generateAppointmentLetter } from "../../../schemas";
import ApiService from "../../../services/Api_services";
import { toast } from "react-hot-toast";
import Input from "../../../components/ui/input";
import {
  ImagePlus,
  MailIcon,
  Phone,
  TargetIcon,
  User2Icon,
} from "lucide-react";
import Select from "../../../components/ui/select";
import { BiIdCard, BiRupee } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import Button from "../../../components/ui/button";
import Badge, { enums } from "../../../components/ui/badge";
import ConfirmationModal from "../../../components/confirmationModal";
import Table from "../../../components/ui/table/Table";
import moment from "moment";
import Loader from "../../../components/loader";
import bold from "../../../assets/bold.ttf";
import { SlLocationPin } from "react-icons/sl";
import TextArea from "../../../components/ui/textarea";
Font.register({
  family: "Roboto",
  fonts: [{ src: bold, fontWeight: "bold" }],
});
const company_name = "Capital Group Business Solution Pvt. Ltd.";
const PdfFile = ({ data }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          paddingBottom: 20,
        }}
      >
        <View style={{}}>
          <Image src={"/pdfBanner.png"} />
        </View>
        <View
          style={{
            paddingHorizontal: 30,
            paddingBottom: 30,

            fontFamily: "Helvetica",
            position: "relative",
          }}
        >
          <Image
            style={{
              position: "absolute",
              top: 100,
              right: 30,
              width: 500,
              height: 500,
              opacity: 0.1,
            }}
            src={"/watermark.png"}
          />
          {/* <Text
            style={{
              textAlign: "center",
              color: "#0531B1",
              fontSize: 12,
              marginTop: 5,
              fontWeight: "light",
              marginBottom: 20,
            }}
          >
            Deals in HomeLoan, PersonalLoan, Agriculture Loan, Education Loan,
            PaySlip Loan, Business Loans, Loan Against Property, ITR Loan etc.{" "}
          </Text> */}
          <Text
            style={{
              textAlign: "center",
              marginRight: 25,
              fontSize: 21,
              color: "#FF0000",
              fontFamily: "Roboto",
            }}
          >
            Letter of Appointment
          </Text>
          <Text
            style={{
              textAlign: "right",
              color: "#FF0000",
              fontSize: 12,
              fontWeight: "light",
            }}
          >
            Date : {moment(data.createdAt?.split("T")[0]).format("DD-MM-YY")}
          </Text>
          <View
            style={{
              fontSize: 12,
              marginTop: 10,
              fontWeight: "light",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                marginBottom: 5,
                marginTop: 5,
                fontFamily: "Roboto",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    width: 130,
                  }}
                >
                  Employee Name:-
                </Text>
                <Text>
                  {data?.agent?.title} {data?.agent?.firstName}{" "}
                  {data?.agent?.LastName}
                </Text>
              </View>

              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    width: 130,
                  }}
                >
                  Employee Post:-
                </Text>
                <Text>{data?.agent?.designation}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    width: 130,
                  }}
                >
                  Employee Address:-
                </Text>
                <Text>{data?.address}</Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    width: 130,
                  }}
                >
                  Employee Mobile:-
                </Text>
                <Text>{data?.agent?.phone}</Text>
              </View>
            </View>
            <Image
              style={{
                position: "absolute",
                top: -5,
                right: 0,
                width: 100,
                height: 100,
              }}
              src={data?.photo}
            />
            <Image
              src={"/stamp.png"}
              style={{
                position: "absolute",
                top: 30,
                right: 50,
                width: 90,
                height: 90,
                backgroundColor: "transparent",
              }}
            />
          </View>

          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 10,
              fontSize: 12,
              fontWeight: "light",
            }}
          >
            Dear{" "}
            <Text
              style={{
                fontFamily: "Roboto",
              }}
            >
              {data?.agent?.title} {data?.agent?.firstName}{" "}
              {data?.agent?.LastName}
            </Text>
          </Text>
          <View
            style={{
              paddingBottom: 5,
            }}
          >
            <Text
              style={{
                textAlign: "left",
                marginTop: 8,
                fontSize: 12,
                lineHeight: 1.5,
                fontWeight: "light",
              }}
            >
              This is to inform you that after a prolong discussion with you and
              after your repeated request{" "}
              <Text
                style={{
                  fontFamily: "Roboto",
                }}
              >
                {company_name}
              </Text>
              has considered your request and authorized you work for our
              financial concern under following guidelines as per our terms and
              conditions:
            </Text>
          </View>
          <Text
            style={{
              textAlign: "left",
              marginTop: 4,
              fontSize: 12,
              fontFamily: "Roboto",
              textTransform: "uppercase",
            }}
          >
            GUIDELINES:
          </Text>
          <View
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 10,
              marginLeft: 8,
              fontSize: 12,
              lineHeight: 1.5,
              fontWeight: "bold",
            }}
          >
            <Text>
              1. The file of your customers will be directly to our firm&apos;s
              control for which our fund will be used
            </Text>
            <Text>
              2. The file of your customers will be in our control till the loan
              is refund in total, where our fund will be used and all the rights
              or that particular file for legal action will be in our firms,
              control, in case of any dispute arise at any time
            </Text>
            <Text>
              3. In case if it is found that or your agent is working against
              our firms in any aspects, then your authority to work will
              automatically be canceled with simple notice and there will be no
              further consideration for the same.
            </Text>
          </View>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 10,
              fontSize: 12,
            }}
          >
            So, we hope that you will agree with our all the terms and
            conditions and abide by your above guidelines without going against
            it.
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 15,
              fontSize: 12,
            }}
          >
            Valid for Six Months
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 15,
              fontSize: 12,
              fontFamily: "Roboto",
            }}
          >
            Dated : {moment(data.createdAt).format("DD-MMM-YYYY")} -{" "}
            {moment(data.createdAt).add(6, "months").format("DD-MMM-YYYY")}
          </Text>
          <Text
            style={{
              textAlign: "left",
              marginTop: 15,
              fontSize: 12,
              fontFamily: "Roboto",
              fontWeight: "700",
            }}
          >
            {company_name}
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 15,
              fontSize: 12,
            }}
          >
            NOTE: Any kind of public deposit will not be allowed to be collected
            by the D.M.A/D.S.A/SUB D.S.A/AGENT on behalf of{" "}
            <Text
              style={{
                fontFamily: "Roboto",
              }}
            >
              {company_name}
            </Text>
          </Text>
          <Text
            style={{
              textAlign: "right",
              color: "black",
              marginTop: 10,
              fontSize: 12,
            }}
          >
            Your Faithfully
          </Text>
          <Text
            style={{
              borderTop: "1px solid black",
              textAlign: "right",
              color: "black",
              marginTop: 20,
              paddingTop: 4,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            SIGNATURE & THUMB IMPRESSION PAGE-1
          </Text>
          <View
            style={{
              marginTop: 10,
              gap: 10,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                fontSize: 12,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  marginBottom: 3,
                }}
              >
                For D.M.A
              </Text>
              <View>
                <Text
                  style={{
                    marginBottom: 6,
                  }}
                >
                  1. Security Amount for D.M.A(Rs. One Lakh Only, 100,000){" "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  2. File Charge
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {data?.agent?.designation == "DMA" ? data?.file_charge : " "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  3. Loan Amount
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {data?.agent?.designation == "DMA" ? data?.loan_amount : " "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  4. Processing Fee
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {data?.agent?.designation == "DMA"
                    ? data?.processing_fee
                    : " "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  5. Add Charge
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {data?.agent?.designation == "DMA" ? data?.add_charge : " "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  6. Service Tax included
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,

                    padding: 5,
                  }}
                >
                  {data?.agent?.designation == "DMA" ? data?.service_tax : " "}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              gap: 15,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                fontSize: 12,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  marginBottom: 3,
                }}
              >
                For D.S.A
              </Text>
              <View>
                <Text
                  style={{
                    marginBottom: 6,
                  }}
                >
                  1. Security Amount for D.S.A(Rs. Fifty Thousands Only, 50,000)
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  2. File Charge
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {data?.agent?.designation == "DSA" ? data?.file_charge : " "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  3. Loan Amount
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {data?.agent?.designation == "DSA" ? data?.loan_amount : " "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  4. Processing Fee
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {data?.agent?.designation == "DSA"
                    ? data?.processing_fee
                    : " "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  5. Add Charge
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {data?.agent?.designation == "DSA" ? data?.add_charge : " "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  6. Service Tax included
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {data?.agent?.designation == "DSA" ? data?.service_tax : " "}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              gap: 15,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                fontSize: 12,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  marginBottom: 3,
                }}
              >
                For SUB D.S.A
              </Text>
              <View>
                <Text
                  style={{
                    marginBottom: 6,
                  }}
                >
                  1. Security Amount for SUB D.S.A(Rs. Eleven Thousands Only,
                  11,000)
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  2. File Charge
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {" "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  3. Loan Amount
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {" "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  4. Processing Fee
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {" "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  5. Add Charge
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {" "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  6. Service Tax included
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {" "}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 10,
              gap: 15,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <View
              style={{
                fontSize: 12,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Text
                style={{
                  fontFamily: "Roboto",
                  marginBottom: 3,
                }}
              >
                For Agent
              </Text>
              <View>
                <Text
                  style={{
                    marginBottom: 6,
                  }}
                >
                  1. Security Amount for AGENT(Rs. Fifty Five Hundred Only,
                  5500)
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  2. File Charge
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {" "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  3. Loan Amount
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {" "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  4. Processing Fee
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {" "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  5. Add Charge
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {" "}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <Text
                  style={{
                    width: 500,
                  }}
                >
                  6. Service Tax included
                </Text>
                <Text
                  style={{
                    border: "1px solid black",
                    width: 300,
                    padding: 5,
                    textAlign: "center",
                  }}
                >
                  {" "}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={{
              fontSize: 12,
              fontFamily: "Roboto",
              marginTop: 25,
            }}
          >
            Note: D.M.A/D.S.A/SUB D.S.A/AGENT FEES NOT REFUNDABLE IN ANY CASE
          </Text>
          <View
            style={{
              position: "relative",
            }}
          >
            <Image
              src={"/stamp.png"}
              style={{
                position: "absolute",
                bottom: -10,
                right: 20,
                width: 90,
                height: 90,
              }}
            />
            <Text
              style={{
                borderTop: "1px solid black",
                textAlign: "right",
                color: "black",
                marginTop: 10,
                paddingTop: 4,
                fontSize: 12,
              }}
            >
              SIGNATURE & THUMB IMPRESSION PAGE-2
            </Text>
          </View>
        </View>

        <View
          style={{
            position: "absolute",
            fontSize: 12,
            bottom: 0,
            left: 0,
            right: 0,
            fontSize: 12,
            fontWeight: "bold",

            textAlign: "right",
          }}
        >
          <Image src={"/pdfFooter.png"} />
        </View>
        {/* <Text
          style={{
           
            textAlign: "right",
            color: "black",
            marginTop: 100,
      
        >
          
        </Text> */}
      </Page>
    </Document>
  );
};
const initialModalState = {
  state: false,
  edit_id: "",
  data: {
    photo: "",
    firstName: "",
    address: "",
    title: "",
    LastName: "",
    Email: "",
    Phone: "",
    city: "",
    designation: "",
    file_charge: "",
    loan_amount: "",
    processing_fee: "",
    add_charge: "",
    service_tax: "",
  },
};

function fileToBase64(file, callback) {
  if (!file) {
    callback("");
    return;
  }

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const base64String = reader.result.split(",")[1];
    callback(base64String);
  };
  reader.onerror = (error) => {
    console.error("Error converting file to Base64:", error);
    callback("");
  };
}
export default function JointPercent() {
  const [modal, setModal] = useState(initialModalState);
  const [agents, setDatas] = useState({
    loading: true,
    data: [],
  });
  const [confirmModal, setConfirmModal] = useState({
    state: false,
    id: null,
  });

  const employees = useFetch("api/joint-precent");
  function renderModal() {
    const { state, edit_id, data } = modal;

    return (
      <Modal
        title={"Generate Appointment Letter"}
        open={state}
        setOpen={() => setModal(initialModalState)}
      >
        <Formik
          enableReinitialize={true}
          validationSchema={JointSchema}
          initialValues={data}
          onSubmit={async (values, action) => {
            const payload = {};

            payload.firstName = values.firstName;
            payload.LastName = values.LastName;
            payload.Email = values.Email;
            payload.Phone = values.Phone;
            payload.city = values.city;
            payload.designation = values.designation;
            payload.address = values.address;
            payload.title = values.title;

            if (values.file_charge)
              payload.file_charge = Number(values.file_charge);
            if (values.loan_amount)
              payload.loan_amount = Number(values.loan_amount);
            if (values.processing_fee)
              payload.processing_fee = Number(values.processing_fee);
            if (values.add_charge)
              payload.add_charge = Number(values.add_charge);
            if (values.service_tax)
              payload.service_tax = Number(values.service_tax);

            await new Promise((resolve) => {
              fileToBase64(values.photo, (base64Data) => {
                payload.photo = base64Data;
                resolve();
              });
            });
            try {
              const res = await ApiService.fetchData({
                url: `api/joint-precent`,
                method: "POST",
                data: payload,
              });
              if (res) toast.success(res.data.message);
              FetchNews();
              setModal(initialModalState);
            } catch (error) {
              toast.error(error.response.data.message);
            } finally {
              action.resetForm();
              action.setSubmitting(false);
            }
          }}
        >
          {(f) => (
            <form
              onSubmit={f.handleSubmit}
              className="w-full pt-4 rounded-b-md pb-8 flex flex-col gap-4 px-4 bg-white"
            >
              {" "}
              <Select
                onChange={f.handleChange}
                name={"title"}
                value={f.values.title}
                onBlur={f.handleBlur}
                error={f.touched.title && f.errors.title}
                label={""}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              >
                <option value={" "}>Select title</option>
                <option>Mr.</option>
                <option>Mrs.</option>
                <option>Miss.</option>
                <option>Dr.</option>
              </Select>
              <span className="flex items-center gap-4 ">
                <Input
                  name="firstName"
                  onChange={f.handleChange}
                  value={f.values.firstName}
                  onBlur={f.handleBlur}
                  error={f.touched.firstName && f.errors.firstName}
                  icon={<User2Icon className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"First Name"}
                />
                <Input
                  name="LastName"
                  onChange={f.handleChange}
                  value={f.values.LastName}
                  onBlur={f.handleBlur}
                  error={f.touched.LastName && f.errors.LastName}
                  icon={<User2Icon className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Last Name"}
                />
              </span>
              <Input
                name="Email"
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.Email}
                error={f.touched.Email && f.errors.Email}
                icon={<MailIcon className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Email Address"}
              />
              <span className="flex items-center gap-4 ">
                <Select
                  onChange={f.handleChange}
                  name={"designation"}
                  value={f.values.designation}
                  onBlur={f.handleBlur}
                  error={f.touched.designation && f.errors.designation}
                  label={""}
                  icon={<BiIdCard className="w-4 text-indigo-500" />}
                >
                  <option value={" "}>Select Post</option>
                  <option value={"DSA"}>DSA</option>
                  <option value={"DMA"}>DMA</option>
                </Select>
                <Input
                  name="city"
                  onChange={f.handleChange}
                  value={f.values.city}
                  onBlur={f.handleBlur}
                  error={f.touched.city && f.errors.city}
                  type={"text"}
                  icon={<SlLocationPin className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Location"}
                />
              </span>
              <TextArea
                row={3}
                name="address"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.address}
                error={f.touched.address && f.errors.address}
                icon={<GoLocation size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Enter address"}
              />
              <Input
                name="Phone"
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.Phone}
                error={f.touched.Phone && f.errors.Phone}
                icon={<Phone className="w-4 text-indigo-500" />}
                label={""}
                placeholder={"Mobile Number"}
              />
              <Input
                name="photo"
                type={"file"}
                onChange={(e) => {
                  f.setValues({ ...f.values, photo: e.target.files[0] });
                }}
                onBlur={f.handleBlur}
                error={f.touched.photo && f.errors.photo}
                icon={<ImagePlus size={20} className="text-indigo-500" />}
                label={""}
                placeholder={"Profile pic"}
              />
              <Input
                name="file_charge"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.file_charge}
                error={f.touched.file_charge && f.errors.file_charge}
                icon={<BiRupee size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"File Charge"}
              />
              <Input
                name="loan_amount"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.loan_amount}
                error={f.touched.loan_amount && f.errors.loan_amount}
                icon={<BiRupee size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Loan Amount"}
              />
              <Input
                name="processing_fee"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.processing_fee}
                error={f.touched.processing_fee && f.errors.processing_fee}
                icon={<BiRupee size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Processing fee"}
              />
              <Input
                name="add_charge"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.add_charge}
                error={f.touched.add_charge && f.errors.add_charge}
                icon={<BiRupee size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Add Charge"}
              />
              <Input
                name="service_tax"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.service_tax}
                error={f.touched.service_tax && f.errors.service_tax}
                icon={<BiRupee size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Service Tax"}
              />
              <Button
                loading={f.isSubmitting}
                loadingText={"Generating..."}
                disabled={f.isSubmitting}
                size={"NORMAL"}
                type={"submit"}
              >
                Generate
              </Button>
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
        url: `api/joint-precent`,
        method: "GET",
      });
      setDatas((prev) => ({
        ...prev,
        loading: false,
        data: res.data.data,
      }));
    } catch (error) {
      toast.error(error.response.data.message);
      setDatas((prev) => ({
        ...prev,
        loading: false,
        data: [],
      }));
    }
  }
  const [download, setDownload] = useState();
  const columns = () => [
    {
      Header: "agent name",
      accessor: (c) =>
        c?.agent?.firstName +
        " " +
        c?.agent?.LastName +
        " (" +
        c?.agent?.employeeCode +
        ")",
    },
    {
      Header: "location",
      accessor: (c) => c.location,
    },
    {
      Header: "address",
      accessor: (c) => c.address,
    },
    {
      Header: "Post",
      accessor: (c) => c.agent?.designation,
    },
    {
      Header: "service tax",
      accessor: (c) => c.service_tax,
    },
    {
      Header: "processing fee",
      accessor: (c) => c.processing_fee,
    },
    {
      Header: "add charge",
      accessor: (c) => c.add_charge,
    },
    {
      Header: "Generated At",
      accessor: (c) => moment(c.createdAt).format("hh:mm A DD/MM/YYYY"),
    },
    {
      Header: "Action",
      accessor: "action",
      Cell: (cell) => (
        <span className="flex items-center justify-start gap-4">
          <Badge
            onClick={() => {
              setDownload(cell.row.index);
            }}
            type={enums.BLUE}
          >
            {download === cell.row.index ? (
              <PDFDownloadLink
                id="download"
                document={<PdfFile data={agents.data[download]} />}
                fileName={`welcome.pdf`}
              >
                {({ blob, url, loading, error }) =>
                  loading ? "Generateing..." : "Print"
                }
              </PDFDownloadLink>
            ) : (
              "Generate"
            )}
          </Badge>
          <Badge
            onClick={() =>
              setConfirmModal((prev) => ({
                state: true,
                id: Number(cell.row.original.id),
              }))
            }
            type={enums.RED}
          >
            Remove
          </Badge>
        </span>
      ),
    },
  ];

  return agents.loading ? (
    <Loader />
  ) : (
    <>
      {renderModal()}
      {/* <PDFViewer height={1000} width={600}>
        <PdfFile data={agents.data[0]} />
      </PDFViewer> */}
      <ConfirmationModal
        description="Do you really want to delete this This Appointment letter ?"
        isDelete
        open={confirmModal.state}
        setOpen={() => {
          setConfirmModal({
            state: false,
            id: null,
          });
        }}
        onDelete={async () => {
          const res = await ApiService.fetchData({
            url: `api/joint-precent/${confirmModal.id}`,
            method: "DELETE",
          });
          if (res) toast.success(res.data.message);
          setDatas((prev) => ({
            data: prev.data.filter((a) => a.id !== confirmModal.id),
          }));
          setConfirmModal((prev) => ({
            state: false,
            id: null,
          }));
        }}
      />

      <Table
        btnText={"Generate Letter"}
        btnfunc={() =>
          setModal((prev) => ({
            state: true,
            data: initialModalState.data,
            edit_id: initialModalState.edit_id,
          }))
        }
        title="DSA/DMA Appointment letter"
        subtitle={"All generated letters"}
        dataName={"letters"}
        data={agents.data}
        columns={columns()}
      />
    </>
  );
}
