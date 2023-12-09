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
import { generateAppointmentLetter } from "../../../schemas";
import ApiService from "../../../services/Api_services";
import { toast } from "react-hot-toast";
import Input from "../../../components/ui/input";
import { ImagePlus, Phone, TargetIcon, User2Icon } from "lucide-react";
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
import { RiUser2Line, RiUserHeartLine } from "react-icons/ri";
import ComboBox from "../../../components/ui/comboBox";
Font.register({
  family: "Roboto",
  fonts: [{ src: bold, fontWeight: "bold" }],
});
const PdfFile = ({ data }) => {
  const ageN =
    data?.agent?.managedBy?.title +
    " " +
    data?.agent?.managedBy?.firstName +
    " " +
    data?.agent?.managedBy?.LastName;

  function addLineBreaks(inputString, maxLineLength = 40) {
    const lines = [];
    let lineStart = 0;
    for (let i = 0; i < inputString.length; i++) {
      if (i - lineStart >= maxLineLength) {
        const lastSpaceIndex = inputString.lastIndexOf(" ", i);
        if (lastSpaceIndex !== -1 && lastSpaceIndex > lineStart) {
          lines.push(inputString.substring(lineStart, lastSpaceIndex));
          lineStart = lastSpaceIndex + 1;
        } else {
          lines.push(inputString.substring(lineStart, i));
          lineStart = i + 1;
        }
      }
    }
    if (lineStart < inputString.length) {
      lines.push(inputString.substring(lineStart));
    }
    return lines.join("\n");
  }
  return (
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: "Helvetica",
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
            src={"/logo_without_name.png"}
          />
          <Text
            style={{
              textAlign: "center",
              color: "#0531B1",
              fontSize: 12,
              marginTop: 5,
              fontWeight: "light",
              marginBottom: 5,
            }}
          >
            Deals in HomeLoan, PersonalLoan, Agriculture Loan, Education Loan,
            PaySlip Loan, Business Loans, Loan Against Property, ITR Loan etc.{" "}
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginRight: 25,
              fontSize: 21,
              color: "green",
              fontFamily: "Roboto",
            }}
          >
            Letter of Appointment
          </Text>
          <Text
            style={{
              textAlign: "right",
              color: "green",
              fontSize: 12,
              fontWeight: "light",
            }}
          >
            Date : {data.createdAt.split("T")[0]}
          </Text>
          <View
            style={{
              fontSize: 12,
              marginTop: 2,
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
                    width: 150,
                    border: "1px solid black  ",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Employee Name:-
                </Text>
                <Text
                  style={{
                    width: 260,
                    border: "1px solid black  ",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
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
                    width: 150,
                    border: "1px solid black  ",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Employee Designation:-
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    width: 260,
                    maxWidth: 260,
                    border: "1px solid black  ",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {data?.agent?.designation}
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
                    width: 150,
                    border: "1px solid black  ",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {data.guradian_relation === "SONOF" ||
                  data.guradian_relation === "DOF"
                    ? "Father Name"
                    : "Husband Name"}
                  :-
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    width: 260,
                    maxWidth: 260,
                    border: "1px solid black  ",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {data?.guardian_name}
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
                    width: 150,
                    border: "1px solid black  ",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Employee Address:-
                </Text>
                <Text
                  style={{
                    width: 260,
                    maxWidth: 260,
                    flexWrap: "wrap",
                    border: "1px solid black  ",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {addLineBreaks(data?.address, 40)}
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
                    width: 150,
                    border: "1px solid black",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Employee Mobile:-
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    width: 260,
                    maxWidth: 260,
                    border: "1px solid black",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {data?.agent?.phone}
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
                    width: 150,
                    border: "1px solid black",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Generated Date:-
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    width: 260,
                    maxWidth: 260,
                    border: "1px solid black  ",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {moment(data?.createdAt).format("DD/MM/YYYY")}
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
                    width: 150,
                    border: "1px solid black  ",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Letter Subject:-
                </Text>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 12,
                    width: 260,
                    maxWidth: 260,
                    border: "1px solid black  ",
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Letter of Appointment
                </Text>
              </View>
            </View>
            <Image
              style={{
                position: "absolute",
                top: 4,
                right: 0,
                width: 80,
                height: 100,
              }}
              src={data?.photo}
            />
            <Image
              src={"/stamp.png"}
              style={{
                position: "absolute",
                top: 40,
                right: 40,
                width: 100,
                height: 90,
                backgroundColor: "transparent",
              }}
            />
          </View>

          <Text
            style={{
              textAlign: "left",
              color: "black",
              fontSize: 12,
              fontWeight: "light",
            }}
          >
            Dear {data?.agent?.title} {data?.agent?.firstName}{" "}
            {data?.agent?.LastName}
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
              We are pleased to appoint you in our organization as &quot;
              <Text
                style={{
                  fontFamily: "Roboto",
                  textTransform: "uppercase",
                }}
              >
                {data?.agent?.designation}
              </Text>
              &quot;, Grade:
              <Text style={{ fontSize: 12, fontFamily: "Roboto" }}>
                Mahadev Financial PVT.LTD
              </Text>{" "}
              .,w.e.f.{" "}
              <Text
                style={{
                  fontFamily: "Roboto",
                }}
              >
                {moment(data.createdAt).format("DD/MM/YYYY")}
              </Text>{" "}
              on the following terms &conditions:
            </Text>
          </View>
          <Text
            style={{
              textAlign: "left",
              marginTop: 4,
              fontSize: 16,
              fontFamily: "Roboto",
              fontWeight: "700",
              color: "green",
            }}
          >
            Annual Compensation
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 4,
              fontSize: 12,
              lineHeight: 1.1,
            }}
          >
            You will be paid a fixed stipend{" "}
            <Text style={{ color: "red" }}>On SALARY Basis Rs.</Text>{" "}
            <Text
              style={{
                color: "red",
              }}
            >
              {data?.salary}
              /-PER MONTH After Deduction (P.F & ESI) Your salary will be Rs.{" "}
              {data?.salary_after_pf} /-PER MONTH. Your Monthly target will be{" "}
              {data?.targetOne} to {data?.targetTwo} Files with (
              {data?.incentive} % of the incentive of loan amount after
              disbursement) and T.A & D.A Rs. 6000/-{" "}
            </Text>
            subjects to deductions as per govt. rules and any other Govt. taxes
            and Levis as may be applicable.
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 4,
              fontSize: 14,
              fontFamily: "Roboto",
            }}
          >
            TARGET:-{data.targetOne} TO {data.targetTwo} FILES COMPLETE IN ONE
            MONTH
          </Text>
          <Text
            style={{
              textAlign: "left",
              marginTop: 4,
              fontSize: 16,
              fontFamily: "Roboto",
              fontWeight: "700",
              color: "green",
            }}
          >
            Location:
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 2,
              fontSize: 12,
            }}
          >
            Your initial place of posting will be at{" "}
            <Text
              style={{
                fontFamily: "Roboto",
              }}
            >
              {data.location}
            </Text>
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 2,
              fontSize: 12,
              lineHeight: 1.2,
            }}
          >
            However, the organization reserves the right to transfer you at any
            other OfficeI Branch, Subsidiary or Associate Company of the
            organization, in India that is in existence or may come in to
            existence at a future date. Ony our transfer you will be governed by
            the Company&apos;s rule applicable to the establishment to which you
            areposted.
          </Text>
          <Text
            style={{
              textAlign: "left",
              marginTop: 4,
              fontSize: 16,
              fontFamily: "Roboto",
              fontWeight: "700",
              color: "green",
              lineHeight: 1,
            }}
          >
            Duties and Responsibilities:
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 2,
              fontSize: 12,
              lineHeight: 1,
            }}
          >
            a) The company will expect you tobwork with a high standard of
            integrity, initiative, efficiency and economy.
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 2,
              fontSize: 12,
              lineHeight: 1,
            }}
          >
            b) You will devote your entire time and attention to the work of the
            Company and will not undertake any direct in direct business or
            work, honorary or remunerative expect with the written permission of
            the management ineachcase. Contravention of this will lead to the
            termination of your service
            withoutanynoticeoranycompensationinlieuofsuchnotice.
          </Text>

          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 2,
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            c) You shal ll not seek membership of any local or public bodies
            without obtaining written permission from management
          </Text>
          <Text
            style={{
              borderTop: "1px solid black",
              textAlign: "right",
              color: "black",
              paddingTop: 4,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            SIGNATURE & THUMB IMPRESSION PAGE-1
          </Text>
          <View
            style={{
              position: "relative",
              marginTop: 50,
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
              src={"/logo_without_name.png"}
            />
            <View
              style={{
                textAlign: "left",
                color: "black",
                width: "100%",
                marginTop: 10,
                paddingTop: 4,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1,
              }}
            >
              <Text style={{ color: "black", fontSize: 13 }}>
                d) You shall neither divulge nor disclose to any
                authorized&apos; person during the period of your service or
                even now-how, security arrangements, administrative
                and/ororganization matters of a confidential/secretnature, which
                may be your privilege to know by virtue of your being the
                company&apos;s employee.
              </Text>
              <Text style={{ fontSize: 13, marginTop: "10" }}>
                e) You shall keep confidential all the information and material
                provided to you by the company or by its clients concerning
                their affairs, in order to enable to company to perform the
                service.This also includes such information as is already known
                which also you will not release, use or disclose expect with the
                prior written permission of the company. Your obligation to keep
                such information confidential shall remain even after
                termination after cancellation of this employment
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                Probationary Period:
              </Text>

              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Your appointment shall be for be for a period of six month on
                probation, at the end of which the decision will betaken by the
                organization to extent terminate your tenure:, the extension if
                permissible will be at the same salary unless otherwise
                specified. The decision of the company so taken shall & binding
                on you. It may be clearly noted that the company will need
                atleast 15 days salary in lieu thereof, incase you wish to leave
                the company during the tenure of notice period. However, the
                company reserves the right to terminate your services by giving
                you a 24 hours notice.
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                Secrecy:
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                You will be required to act in the best interest of the
                organization at all times. You shall not discuss, divulge,
                ormake public to any person I third party at any time during
                your services with the organization or there after
                anyinformation, truncation, secrets relating to business of the
                Company, which may come within your possession in the course of
                work
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                Alternate Employment:
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                During the period of service with the organization you will not
                accept or perform any part- time or other work for remuneration
                without ob taining prior sanction from the organization.
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                Least:
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                In case of any leave taken under unforeseen circumstances, for
                which prior approval was not taken /obtained immediate
                information will be required to be sent. In case if you fail to
                do so, management will have the right to take action against you
                as per company&apos;s rule
              </Text>

              <Text
                style={{
                  textAlign: "left",
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                Increment:
              </Text>

              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Your increment and future prospects in the company shall
                entirely depend on your Appraisal. Appraisal dependson
                efficiency, hard work, and regularity in attendance, sincerity,
                good conduct, Company&apos;s performance and such other relevant
                factors as adjudged by the management.
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                Reference Checks:
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Your appointment will be subject to the organization receiving
                satisfactory references, Please furnish the name of the
                references, who have supervised you in a professional capacity
                at some stagein your professional career. Not with standing any
                thing contained in the above paragraphs, your services may be
                terminated by the organization if you are found to be indulging
                in a cuts of Commission / Omission which may be prejudicial to
                the interest of the organization,orany act of dishonesty ,
                disobedience, insubordination are any other mis conduct or
                neglect of duty or incompetencein the discharge of duty on your
                part.
              </Text>
              <Text
                style={{
                  borderTop: "1px solid black",
                  textAlign: "right",
                  color: "black",
                  marginTop: 50,
                  marginBottom: 50,
                  paddingTop: 4,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                SIGNATURE & THUMB IMPRESSION PAGE-2
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  marginTop: 15,
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                Past Records:
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                If any declaration given or furnished by you to the company
                proves to be false or if you are found to have will fully
                suppressed any material information in such case you will
                beliable to removal from without any notice.
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  marginTop: "10",
                  color: "green",
                }}
              >
                Consequence of breach of terms:
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Not with standing any thing contained in this letter, should you
                contravene or breach any of the foregoing terms and conditions
                of service, the Company will be entitled to terminate your
                service forthwith without compensation,notice period or salary
                in lieu thereof and without prejudice to other legal
                rights/remedies available to the company. However, no notice
                would be required to be given by-the management in case the
                employee has concealed/suppressed information or is found guilty
                of gross in discipline, fraud, misappropriation or acting
                against the interest of the office.
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                General:
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                You are required to submit the following documents, if you have
                not submitted the same earlier:
              </Text>
              <Text style={{ fontSize: 13, marginLeft: 20, marginTop: "8" }}>
                a. Certification in support of your education, experience,
              </Text>
              <Text style={{ fontSize: 13, marginLeft: 20, marginTop: "8" }}>
                b. Twocopies of your recent passport size colored photographs.
              </Text>

              <Text style={{ fontSize: 13, marginLeft: 20, marginTop: "8" }}>
                c. Two copies of post card size colored photographs,if entitled
                for E.S.I. benefit.
              </Text>
              <Text style={{ fontSize: 13, marginLeft: 20, marginTop: "8" }}>
                d. Relieving letter from your last employer incase you we
                reemployed.
              </Text>

              <Text
                style={{
                  textAlign: "left",
                  marginTop: 4,
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  color: "green",
                }}
              >
                Relieving:
              </Text>
              <View style={{ position: "relative" }}>
                <Image
                  style={{
                    position: "absolute",
                    top: -150,
                    right: 30,
                    width: 500,
                    height: 500,
                    opacity: 0.1,
                  }}
                  src={"/logo_without_name.png"}
                />
              </View>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                In case of leaving the company, you will return to the company
                all papers/documents or any other item belonging to the company.
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  marginTop: "10",
                  color: "green",
                }}
              >
                Change of Address:
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Any change in your status of residential address should be
                notified in writing to the company. We welcome you to
                <Text style={{ fontSize: 14, fontFamily: "Roboto" }}>
                  Mahadev Financial Services Pvt. Ltd.
                </Text>{" "}
                and look forward to having a long and mutually beneficial
                association with you.
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Roboto",
                  fontWeight: "700",
                  marginTop: "10",
                  color: "green",
                }}
              >
                Terms:
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                I have read and understood the above terms and conditions of the
                appointment letter and here by give my acceptance of the same.
                Working under in:
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Name: {data?.agentName ? data.agentName : ageN}
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Mobile:{" "}
                {data?.agentNumber
                  ? data.agentNumber
                  : data?.agent?.managedBy?.phone}
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Signature________________________
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Name____________________________
              </Text>
            </View>
          </View>
          <View
            style={{
              position: "relative",
              marginTop: 50,
            }}
          >
            <Image
              src={"/stamp.png"}
              style={{
                position: "absolute",
                bottom: -100,
                right: 20,
                width: 150,
                height: 140,
              }}
            />
          </View>
        </View>

        <Text
          style={{
            position: "absolute",
            fontSize: 12,
            bottom: 90,
            left: 0,
            borderTop: "1px solid black",
            right: 0,
            marginHorizontal: 30,
            paddingTop: 4,
            fontSize: 12,
            fontWeight: "bold",
            textAlign: "right",
          }}
          render={({ pageNumber, totalPages }) =>
            `SIGNATURE & THUMB IMPRESSION PAGE-${pageNumber}`
          }
        />
        <View
          style={{
            position: "absolute",
            fontSize: 12,
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "grey",
          }}
        >
          <Image
            style={{
              marginTop: 120,
            }}
            src={"/pdfFooter.png"}
          />
        </View>
      </Page>
    </Document>
  );
};
const initialModalState = {
  state: false,
  edit_id: "",
  data: {
    employeeId: "",
    photo: "",
    location: "",
    address: "",
    salary: "",
    targetOne: "",
    incentive: "",
    salary_after_pf: "",
    guradian_relation: "SONOF",
    guardian_name: "",
    targetTwo: "",
    agentName: "",
    agentNumber: "",
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
export default function Appointment() {
  const [modal, setModal] = useState(initialModalState);
  const [agents, setDatas] = useState({
    loading: true,
    data: [],
  });
  const [download, setDownload] = useState();
  const [confirmModal, setConfirmModal] = useState({
    state: false,
    id: null,
  });

  const employees = useFetch("api/agent/employee");
  function renderModal() {
    const { state, edit_id, data } = modal;

    return (
      <Modal
        title={"Generate  Appointment Letter"}
        open={state}
        setOpen={() => setModal(initialModalState)}
      >
        <Formik
          enableReinitialize={true}
          validationSchema={generateAppointmentLetter}
          initialValues={data}
          onSubmit={async (values, action) => {
            const payload = {
              employeeId: values.employeeId ? Number(values.employeeId) : "",
              targetOne: values.targetOne ? Number(values.targetOne) : "",
              targetTwo: values.targetTwo ? Number(values.targetTwo) : "",
              incentive: values.incentive ? Number(values.incentive) : "",
              location: values.location,
              address: values.address,
              salary: values.salary,
              guardian_name: values.guardian_name,
              guradian_relation: values.guradian_relation,
            };
            if (values.agentName && values.agentNumber) {
              payload.agentName = values.agentName;
              payload.agentNumber = values.agentNumber;
            }
            if (values.salary_after_pf && values.salary_after_pf) {
              payload.salary_after_pf = values.salary_after_pf;
            }

            try {
              const res = await ApiService.fetchData({
                url: `api/appointment-salary`,
                method: "POST",
                data: payload,
              });
              if (res) toast.success(res.data.message);
              setDatas((prev) => ({
                ...prev,
                data: [...prev.data, res.data.data],
              }));
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
              <ComboBox
                people={employees.data?.map((a) => ({
                  id: a.id,
                  name: `${a.firstName} ${a.LastName} (${a.employeeCode})`,
                }))}
                onChange={(e) => {
                  console.log(e);
                  f.setValues((prev) => ({
                    ...prev,
                    employeeId: e,
                  }));
                  f.setErrors((prev) => ({
                    ...prev,
                    employeeId: "",
                  }));
                }}
                name={"employeeId"}
                placeholder={"Select Agent"}
                value={f.values.employeeId}
                onBlur={f.handleBlur}
                error={f.touched.employeeId && f.errors.employeeId}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              />
              <span className="flex items-center justify-between w-full gap-8">
                <Select
                  label={""}
                  name={"guradian_relation"}
                  onBlur={f.handleBlur}
                  onChange={f.handleChange}
                  value={f.values.guradian_relation}
                  error={
                    f.touched.guradian_relation && f.errors.guradian_relation
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
                  onChange={f.handleChange}
                  onBlur={f.handleBlur}
                  value={f.values.guardian_name}
                  error={f.touched.guardian_name && f.errors.guardian_name}
                  icon={<RiUser2Line className="w-4 text-indigo-500" />}
                  label={""}
                  placeholder={"Guardian Name"}
                />
              </span>
              <Input
                name="location"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.location}
                error={f.touched.location && f.errors.location}
                icon={<GoLocation size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Enter Location"}
              />
              <Input
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
                name="salary"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.salary}
                error={f.touched.salary && f.errors.salary}
                icon={<BiRupee size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Enter salary"}
              />
              <Input
                name="salary_after_pf"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.salary_after_pf}
                error={f.touched.salary_after_pf && f.errors.salary_after_pf}
                icon={<BiRupee size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Salary After Deducting PF"}
              />
              <Input
                name="incentive"
                type={"number"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.incentive}
                error={f.touched.incentive && f.errors.incentive}
                icon={<BiRupee size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Incentive in %"}
              />
              <span className="flex gap-4">
                <Input
                  name="targetOne"
                  type={"text"}
                  onChange={f.handleChange}
                  onBlur={f.handleBlur}
                  value={f.values.targetOne}
                  error={f.touched.targetOne && f.errors.targetOne}
                  icon={<TargetIcon size={18} className=" text-indigo-500" />}
                  label={""}
                  placeholder={"Enter Target Start"}
                />
                <Input
                  name="targetTwo"
                  type={"text"}
                  onChange={f.handleChange}
                  onBlur={f.handleBlur}
                  value={f.values.targetTwo}
                  error={f.touched.targetTwo && f.errors.targetTwo}
                  icon={<TargetIcon size={18} className=" text-indigo-500" />}
                  label={""}
                  placeholder={"Enter Target End"}
                />
              </span>
              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Works Under(optional)
                </label>
                <span className="flex gap-4">
                  <Input
                    name="agentName"
                    onChange={f.handleChange}
                    value={f.values.firstName}
                    onBlur={f.handleBlur}
                    error={f.touched.agentName && f.errors.agentName}
                    icon={<User2Icon className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"First Name"}
                  />
                  <Input
                    name="agentNumber"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.agentNumber}
                    error={f.touched.agentNumber && f.errors.agentNumber}
                    icon={<Phone className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"Mobile Number"}
                  />
                </span>
              </div>
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
        url: `api/appointment-salary`,
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
      Header: "salary",
      accessor: (c) => c.salary,
    },
    {
      Header: "target",
      accessor: (c) => c.targetOne + " - " + c.targetTwo,
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
                fileName={`${
                  agents.data[download].agent.firstName
                    ? agents.data[download].agent.firstName
                    : agents.data[download].agentName
                }.pdf`}
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
            url: `api/appointment-salary/${confirmModal.id}`,
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
        title="Appointment letter"
        subtitle={"All generated letters"}
        dataName={"Appointment letters"}
        data={agents.data}
        columns={columns()}
      />
    </>
  );
}
