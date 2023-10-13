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
import ApiService from "../../../services/Api_services";
import { toast } from "react-hot-toast";
import { ImagePlus } from "lucide-react";
import Badge, { enums } from "../../../components/ui/badge";
import ConfirmationModal from "../../../components/confirmationModal";
import Table from "../../../components/ui/table/Table";
import Modal from "../../../components/ui/modal";
import { Formik } from "formik";
import Input from "../../../components/ui/input";
import Select from "../../../components/ui/select";
import { BiIdCard, BiRupee } from "react-icons/bi";
import { GoLocation } from "react-icons/go";
import Button from "../../../components/ui/button";
import moment from "moment";
import TextArea from "../../../components/ui/textarea";
import { generateApprovalLetter } from "../../../schemas";
import Loader from "../../../components/loader";
import calculateEMI from "../../../utils/calculator";

import bold from "../../../assets/bold.ttf";
Font.register({
  family: "Roboto",
  fonts: [{ src: bold, fontWeight: "bold" }],
});
const PdfFile = ({ data }) => {
  const company = "Caslon Business Services Pvt. ltd.";
  return (
    <Document>
      <Page size="A4" style={{}}>
        <View style={{}}>
          <Image src={"/pdfBanner.png"} />
        </View>
        <View
          style={{
            paddingHorizontal: 30,
            paddingTop: 10,
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
              fontWeight: "light",
            }}
          >
            Deals in HomeLoan, PersonalLoan, Agriculture Loan, Education Loan,
            PaySlip Loan, Business Loans, Loan Against Property, ITR Loan etc.{" "}
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginTop: 10,
              fontSize: 18,
              fontFamily: "Roboto",
              color: "orange",
              fontWeight: "bold",
            }}
          >
            Letter of Approval
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
                gap: 5,
                fontSize: 11,
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
                    fontSize: 11,
                    width: 85,
                  }}
                >
                  Name:-
                </Text>
                <Text>{data?.customer?.name}</Text>
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
                    fontSize: 11,
                    width: 85,
                  }}
                >
                  Mob:-
                </Text>
                <Text>{data?.customer?.phone}</Text>
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
                    fontSize: 11,
                    width: 85,
                  }}
                >
                  Ref:-
                </Text>
                <Text
                  style={{
                    width: 300,
                  }}
                >
                  Account of LOAN from {company}
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
                    fontSize: 11,
                    width: 85,
                  }}
                >
                  LoanId:-
                </Text>
                <Text>{data?.customer?.customerId}</Text>
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
                    fontSize: 11,
                    width: 85,
                  }}
                >
                  ApplicationNo:-
                </Text>
                <Text>{data?.customer?.loanId}</Text>
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
                    fontSize: 11,
                    width: 85,
                  }}
                >
                  Date :-
                </Text>
                <Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
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
              src={data?.photo ? data?.photo : data?.customer?.photo?.url}
            />
            <Image
              src={"/stamp.png"}
              style={{
                position: "absolute",
                top: 40,
                right: 50,
                width: 70,
                height: 70,
                backgroundColor: "transparent",
              }}
            />
          </View>

          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 20,
              fontSize: 12,
              fontWeight: "light",
            }}
          >
            Based on your application no.{" "}
            <Text
              style={{
                textAlign: "left",
                color: "red",
                marginTop: 15,
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              {data?.customer?.loanId}
            </Text>{" "}
            acting under the constitution of{" "}
            <Text
              style={{
                fontFamily: "Roboto",
              }}
            >
              {" " + company + " "}
            </Text>{" "}
            is pleased to provide provisional sanction the loan request
            submitted by
          </Text>
          <View
            style={{
              borderBottom: "1px solid black",
              paddingBottom: 5,
            }}
          >
            <Text
              style={{
                textAlign: "left",
                color: "red",
                marginTop: 8,
                fontSize: 11,
                fontWeight: "light",
              }}
            >
              Mr./Mrs./Ms.Miss{" "}
              <Text
                style={{
                  fontFamily: "Roboto",
                }}
              >
                {data?.customer?.name}
              </Text>{" "}
              <Text
                style={{
                  color: "black",
                  fontSize: 11,
                  fontWeight: "light",
                }}
              >
                accepting the terms and conditions for the progress of loan.
                This is in
              </Text>
            </Text>
          </View>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 2,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            subject to the execution of loan agreement and the other documents
            between our selves:
          </Text>
          <View
            style={{
              marginTop: 8,
            }}
          >
            <Text
              style={{
                fontFamily: "Roboto",
              }}
            >
              Customer Application Details
            </Text>
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 4,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Date of Application
              </Text>
              <Text
                style={{
                  width: "100%",
                  paddingBottom: 1,
                  border: "1px solid black",
                }}
              >
                {moment(data?.customer?.createdAt).format("DD/MM/YYYY")}
              </Text>
            </View>
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Name
              </Text>
              <Text
                style={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                {data?.customer?.name}
              </Text>
            </View>
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Guardian Name
              </Text>
              <Text
                style={{
                  width: "100%",
                  paddingBottom: 1,
                  border: "1px solid black",
                }}
              >
                {data?.customer?.guardian_name}
              </Text>
            </View>
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Address
              </Text>
              <Text
                style={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                {data?.customer?.address}
              </Text>
            </View>
            {/* <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  paddingBottom: 1,
                  borderBottom: "1px solid black",
                }}
              >
                Postal Address
              </Text>
              <Text
                style={{
                  width: "100%",
                  paddingBottom: 1,
                  borderBottom: "1px solid black",
                }}
              >
                {data?.address}
              </Text>
            </View> */}
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Mobile NO
              </Text>
              <Text
                style={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                {data?.customer.phone}
              </Text>
            </View>
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Email
              </Text>
              <Text
                style={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                {data?.customer.email}
              </Text>
            </View>
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Aadhar
              </Text>
              <Text
                style={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                {data?.customer.adharNumber}
              </Text>
            </View>
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Pan
              </Text>
              <Text
                style={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                {data?.customer.panNumber}
              </Text>
            </View>
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Loan Amount
              </Text>
              <Text
                style={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Rs. {data?.customer.loanInNumber} /- (
                {data?.customer?.loanInWords})
              </Text>
            </View>
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Loan Details
              </Text>
              <Text
                style={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Periods {data?.customer?.loanYear} years at INTEREST RATE-5% EMI
                RS.
                {
                  calculateEMI(
                    data?.customer?.loanInNumber,
                    5,
                    data?.customer?.loanYear
                  ).emi
                }
                /
              </Text>
            </View>
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Bank Name &A/CNo./IFSCCODE A/C
              </Text>
              <Text
                style={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                {data.customer.bank
                  ? data.customer.bank +
                    " /" +
                    data.customer.AccountNumber +
                    " /" +
                    data.customer.ifsc +
                    " /" +
                    data.customer.accountType
                  : "................./ ..........."}
              </Text>
            </View>
            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 2,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Executive Details
              </Text>
              <Text
                style={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                {data?.customer?.agent.employeeCode}-
                {data?.customer?.agent.firstName}{" "}
                {data?.customer?.agent.LastName} {data?.customer?.agent.phone}
              </Text>
            </View>

            <View
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 6,
                fontSize: 12,
                display: "flex",
                flexDirection: "row",
                fontFamily: "Roboto",
                gap: 4,
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  width: 400,
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Processing Charges + 18%GST
              </Text>
              <Text
                style={{
                  width: "100%",
                  padding: 1,
                  border: "1px solid black",
                }}
              >
                Rs. {data?.processingCharge}
              </Text>
            </View>
            <Text
              style={{
                borderTop: "1px solid black",
                textAlign: "right",
                color: "black",
                marginTop: 10,
                paddingTop: 4,
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              SIGNATURE & THUMB IMPRESSION PAGE-1
            </Text>
          </View>
          <View
            style={{
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
                textAlign: "left",
                color: "black",
                marginTop: 60,
                paddingTop: 4,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              You are intimated that{" "}
              <Text style={{ color: "red", fontFamily: "Roboto" }}>
                Rs.{data?.customer.loanInNumber}/- ({data?.customer.loanInWords}
                )
              </Text>{" "}
              has been approved by the approving committee of the company, after
              the validation of the submitted documents for loan. We are pleased
              to informyou that the company is issuing the offer letter to you
              so that we can further initiate your lone process as early as
              possible. This offer letter is valid for 25 days. Where company
              will keep you are submitted to documents safe only for 30 days,
              otherwise your file will stand closed. Kindly deposit your process
              fees of
              <Text style={{ color: "red", fontFamily: "Roboto" }}>
                Rs. {data.processingCharge}/-(18% Gst Tax Of Agreement Fees) by
                Bank (NEFT or RTGS) infavor of{" "}
                <Text
                  style={{
                    fontFamily: "Roboto",
                  }}
                >
                  {company}
                </Text>
              </Text>
              for issuing advisory report and to meet other expenses, along with
              required reports as per company terms & conditions Mentioned at
              the end of the letter WITHIN 10 DAYS (TEN DAYS)after receiving the
              offer letter, kindly submit the D.D (demand draft) of processing
              fee failing to which the offer letterwill not be valid. The
              advisory reports shall comprise of title, valuation, investigation
              report of property etc. As per line mark on search report.
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "red",
                marginTop: 20,
                paddingTop: 4,
                fontSize: 12,
                fontWeight: "bold",
                fontFamily: "Roboto",
                lineHeight: 1.5,
              }}
            >
              SPECIAL CONDITIONS FOR LOAN (Important Terms & Conditions)
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 2,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              1. Disbursement of loan will be subject to the condition at the
              time of disbursement.
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 2,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              2. Final approval sanction will be issued subject to fulfillment
              of existing terms & conditions of apply.
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 2,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              3. Only 50% of net salary of govt. guarantor can be treated as EMI
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 2,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              4. Net salary of govt. Guarantor must be doubled from the EMI of
              loanee if salary of govt. Guarantor is less than double the amount
              will be reduced
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 2,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              5. Advance EMI installment will be recovered from all
              theapplicants /loanee if applicant depositing their M.I.Without
              bouncing till completion of loan on demand, company can provide
              loan equal to double in future in case a single bouncing. This
              facility will not be applicable to them
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 2,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              6. Company will accept only those applicant & guarantor whose age
              should be18 to 60 years
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 2,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              7. In case of property guarantor the property of any blood
              relative will not be accepted SC caste guarantor is not
              acceptable.
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 2,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              8. In case if the document requested by the company is not
              completed by the applicant shall be rejected
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 2,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              9. File charges of company is{" "}
              <Text
                style={{
                  fontFamily: "Roboto",
                }}
              >
                Rs.4130/-
              </Text>{" "}
              paid
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 2,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              10. Property guarantor search report compulsory & all family
              member permission is compulsory
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 2,
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              11. File fees will not refundable after is suing the offer letter
            </Text>

            <Text
              style={{
                textAlign: "left",
                color: "black",
                paddingTop: 30,
                fontSize: 12,
                fontWeight: "bold",
                lineHeight: 1.5,
              }}
            >
              I accept that after verification of my records and my guarantors
              Govt. Records, of any discrepancies traced, I will ful fill the
              same with in due course of time. If I cannot complete the required
              terms & conditions/Legal formalities within due course of time or
              paper found fake during investigation, then finance company is
              fully competent to refuse refunding the process fees, which has
              already deposited with the company and I will not request to
              company to refund the process fees in any circumstances as the
              same has been spend during investigation of loan case. Except the
              amount mentioned at page no.1 and no other amount is payable to
              the company, for which I am fully responsible if paid to any
              person.
            </Text>
            <Text
              style={{
                borderTop: "1px solid black",
                textAlign: "right",
                color: "black",
                marginTop: 30,
                marginBottom: 30,
                paddingTop: 4,
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              SIGNATURE & THUMB IMPRESSION PAGE-2
            </Text>
          </View>
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
                lineHeight: 1.5,
              }}
            >
              <Text
                style={{ color: "red", fontSize: 13, fontFamily: "Roboto" }}
              >
                QUESTIONAIRE FOR GUARANTOR
              </Text>
              <Text style={{ fontSize: 13, marginTop: "10" }}>
                GOVERNMENT GUARANTOR [ ] PVT.LTD.GUARANTOR [ ] PROPERTY
                GUARANTOR [ ]
              </Text>
              <Text style={{ fontSize: 13, marginTop: "10" }}>
                Name:...............................................................................................................
              </Text>

              <Text style={{ fontSize: 13, marginTop: "8" }}>
                S/o, W/o, D/o:.....................................Date of
                Birth:........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Age:.........Residence
                Address.....................................................................Office
                Phone:........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Mobile:........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Office/Property Address:........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Department Name:........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Official
                Designation/Post:........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Remaining Service Period till
                Retirement:........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Job Transferble Yes /
                No:........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Willing to Ful fil All Legal Requirement for surety of guarantee
                of loan : Yes/No: ........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Previously stood as a surety is given any guarantee :Yes /No :
                ........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Will Your successors agreed with you as have stand as a
                Guarantor for Mr./Mrs./Ms :
                ........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Amount of net carry home salary per month:
                ........................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Distt: .......................................... Nagar
                Panchayat: ................................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Tehsil: ........................................Mohalla:
                ...............................................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Police station: .................................Chokee:
                ............................................................
              </Text>
              <Text style={{ fontSize: 13, marginTop: "8" }}>
                Check Post: .....................................Pin Code:
                .........................................................
              </Text>
              <Text style={{ fontSize: 14, marginTop: "8" }}>
                Guarantor Required document:-
              </Text>
              <Text style={{ fontSize: 14, marginTop: "10" }}>
                ={">"} 5photo ={">"} Address Proof ={">"} I.D Proof ={">"} 7
                stampaper 50-50Rs/- ={">"}Bankdetail
              </Text>
              <Text style={{ fontSize: 11, marginTop: "6" }}>
                &bull; Property documents (in case of property guarantor)
              </Text>
              <Text style={{ fontSize: 11, marginTop: "3" }}>
                &bull; Last two months payslip & last six months bank statement
                (incase of Govt/pvt.)
              </Text>
              <Text style={{ fontSize: 11, marginTop: "3" }}>
                &bull; Last two year statement of I.T.Rb(in case of I.T.R
                Guarantor)
              </Text>
              <Text
                style={{
                  borderTop: "1px solid black",
                  textAlign: "right",
                  color: "black",
                  marginTop: 30,
                  paddingTop: 4,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                SIGNATURE & THUMB IMPRESSION PAGE-3
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
                lineHeight: 1.5,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "red",
                  marginTop: "6",
                  fontFamily: "Roboto",
                }}
              >
                Important Notice of {company}
              </Text>
              <Text style={{ fontSize: 12, marginTop: "6" }}>
                1. Applicant should not deposit money in any of these following
                working (person lawyer, agent) or else company would not be
                responsible for it.
              </Text>
              <Text style={{ fontSize: 12, marginTop: "6" }}>
                2. After receiving the offer letter you have to submit the
                process charge fees if not you have to pay for file reopen
                charge after10days.
              </Text>
              <Text style={{ fontSize: 12, marginTop: "6" }}>
                3. Every signed paper of the offer letter as well as required
                paper processing fees has to be send to the company
              </Text>
              <Text style={{ fontSize: 12, marginTop: "6" }}>
                4. The payment of the process fees has to be deposit in company
                account.
              </Text>
              <Text style={{ fontSize: 12, marginTop: "6" }}>
                5. Immediately send your personal mobile number to the company
                so that you may not face any problems during upcoming forward
                proceeding
              </Text>
              <Text style={{ fontSize: 12, marginTop: "6" }}>
                6. Immediately send the cash deposit slip at company emailI.D-{" "}
                <Text
                  style={{
                    fontFamily: "Roboto",
                  }}
                >
                  info@vandhnamservices.com
                </Text>
              </Text>
              <Text style={{ fontSize: 12, marginTop: "6" }}>
                7. The process charge should not be returned after the offer
                letter is ready
              </Text>
              <Text
                style={{ fontSize: 14, marginTop: 15, fontFamily: "Roboto" }}
              >
                COMPANY’S PAYMENT DETAILS:-
              </Text>
              {/* <View style={{}}>
                <Image src={"/payment.png"} />
              </View> */}
              <View
                style={{
                  marginTop: 10,
                  border: "1px solid black",
                  fontFamily: "Roboto",
                  textTransform: "uppercase",
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                      color: "black",
                      fontSize: 12,
                      fontWeight: "light",
                      borderRight: "1px solid black",
                      padding: 5,
                      textTransform: "uppercase",
                      width: 130,
                    }}
                  >
                    Bank Name
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      color: "black",
                      fontSize: 12,
                      padding: 5,
                      textTransform: "uppercase",
                      fontWeight: "extrabold",
                    }}
                  >
                    Union Bank Of India
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    borderTop: "1px solid black",
                    flexDirection: "row",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                      color: "black",
                      fontSize: 12,
                      fontWeight: "light",
                      borderRight: "1px solid black",
                      padding: 5,
                      textTransform: "uppercase",
                      width: 130,
                    }}
                  >
                    A/C Holder name
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      color: "black",
                      fontSize: 12,
                      padding: 5,
                      textTransform: "uppercase",
                      fontWeight: "extrabold",
                    }}
                  >
                    Vandhnam Services
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderTop: "1px solid black",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                      color: "black",
                      fontSize: 12,
                      fontWeight: "light",
                      borderRight: "1px solid black",
                      padding: 5,
                      textTransform: "uppercase",
                      width: 130,
                    }}
                  >
                    a/c no
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      color: "black",
                      fontSize: 12,
                      padding: 5,
                      textTransform: "uppercase",
                      fontWeight: "extrabold",
                    }}
                  >
                    198821010000065
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    borderTop: "1px solid black",
                    gap: 10,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                      color: "black",
                      fontSize: 12,
                      fontWeight: "light",
                      borderRight: "1px solid black",
                      padding: 5,
                      textTransform: "uppercase",
                      width: 130,
                    }}
                  >
                    IFSC Code
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                      color: "black",
                      fontSize: 12,
                      padding: 5,
                      textTransform: "uppercase",
                      fontWeight: "extrabold",
                    }}
                  >
                    UBIN0919888
                  </Text>
                </View>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 10,
                  marginTop: 30,
                }}
              >
                <View
                  style={{
                    borderTop: "1px solid black",
                    marginTop: 15,
                  }}
                >
                  <Text style={{ fontSize: 12 }}>SIGNATURE OF GAURANTER</Text>
                  <Text style={{ fontSize: 12 }}>& THUMB-IMPRESSION</Text>
                </View>
                <View
                  style={{
                    borderTop: "1px solid black",
                    marginTop: 15,
                  }}
                >
                  <Text style={{ fontSize: 12 }}>SIGNATURE OF APPLICANT</Text>
                  <Text style={{ fontSize: 12 }}>& THUMB-IMPRESSION</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                position: "relative",
              }}
            >
              <Image
                src={"/stamp.png"}
                style={{
                  position: "absolute",
                  bottom: -50,
                  right: 20,
                  width: 100,
                  height: 100,
                }}
              />
              <Text
                style={{
                  borderTop: "1px solid black",
                  textAlign: "right",
                  color: "black",
                  marginTop: 50,
                  paddingTop: 4,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                SIGNATURE & THUMB IMPRESSION PAGE-4
              </Text>
            </View>
          </View>
        </View>

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
    customerId: "",
    address: "N/A",
    permanentAddress: "N/A",
    processingCharge: "",
    photo: "",
  },
};

export default function ApprovalLetter() {
  const [modal, setModal] = useState(initialModalState);
  const [agents, setDatas] = useState({
    loading: true,
    data: [],
  });
  const [confirmModal, setConfirmModal] = useState({
    state: false,
    id: null,
  });
  const [download, setDownload] = useState();

  const customers = useFetch("api/customer");
  function renderModal() {
    const { state, edit_id, data } = modal;

    return (
      <Modal
        title={"Generate Approval Letter"}
        open={state}
        setOpen={() => setModal(initialModalState)}
      >
        <Formik
          enableReinitialize={true}
          validationSchema={generateApprovalLetter}
          initialValues={data}
          onSubmit={async (values, action) => {
            const payload = {
              customerId: values.customerId ? Number(values.customerId) : "",
              address: values.address,
              permanentAddress: values.permanentAddress,
              processingCharge: values.processingCharge,
            };
            await new Promise((resolve) => {
              fileToBase64(values.photo, (base64Data) => {
                payload.photo = base64Data;
                resolve();
              });
            });
            try {
              const res = await ApiService.fetchData({
                url: `api/approval-letter`,
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
              {" "}
              {/* <Input
                name="photo"
                type={"file"}
                onChange={(e) => {
                  f.setValues({ ...f.values, photo: e.target.files[0] });
                }}
                onBlur={f.handleBlur}
                error={f.touched.photo && f.errors.photo}
                icon={<ImagePlus size={20} className="text-indigo-500" />}
                label={"Photo (optional)"}
                placeholder={"Profile pic"}
              /> */}
              <Select
                onChange={f.handleChange}
                name={"customerId"}
                value={f.values.customerId}
                onBlur={f.handleBlur}
                error={f.touched.customerId && f.errors.customerId}
                label={""}
                icon={<BiRupee className="w-4 text-indigo-500" />}
              >
                <option value={" "}>Select the Customer</option>
                {customers.data.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </Select>
              <Input
                name="processingCharge"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.processingCharge}
                error={f.touched.processingCharge && f.errors.processingCharge}
                icon={<GoLocation size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Enter Processing Charge"}
              />
              {/* <TextArea
                row={3}
                name="address"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.address}
                error={f.touched.address && f.errors.address}
                icon={<GoLocation size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Enter Postal Address"}
              />
              <TextArea
                row={3}
                name="permanentAddress"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.permanentAddress}
                error={f.touched.permanentAddress && f.errors.permanentAddress}
                icon={<GoLocation size={18} className=" text-indigo-500" />}
                label={""}
                placeholder={"Enter Permanent Address"}
              /> */}
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
        url: `api/approval-letter`,
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
      callback("");
    };
  }
  const columns = () => [
    {
      Header: "Customer name",
      accessor: (c) =>
        c?.customer.name + " " + " (" + c?.customer.customerId + ")",
    },
    {
      Header: "address",
      accessor: (c) => c.address,
    },
    {
      Header: "application id",
      accessor: (c) => c?.customer?.loanId,
    },
    {
      Header: "Customer id",
      accessor: (c) => c?.customer.customerId,
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
                fileName={`${agents.data[download].customer.name}.pdf`}
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

      <ConfirmationModal
        description="Do you really want to delete this This letter?"
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
            url: `api/approval-letter/${confirmModal.id}`,
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
        btnText={"Generate Approval Letter"}
        btnfunc={() =>
          setModal((prev) => ({
            state: true,
            data: initialModalState.data,
            edit_id: initialModalState.edit_id,
          }))
        }
        title="Approval Letter"
        subtitle={"All generated Approvals"}
        dataName={"letters"}
        data={agents.data}
        columns={columns()}
      />
    </>
  );
}
