import React, { useEffect } from "react";
import getGreeting from "../../../utils/greet";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { MailCheckIcon, WorkflowIcon } from "lucide-react";
import useFetch from "../../../hooks/useFetch";
import Cookie from "js-cookie";
import Loader from "../../../components/loader";
import moment from "moment";
import Badge, { enums } from "../../../components/ui/badge";
import { useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
import calculateEMI from "../../../utils/calculator";
function CustomerHome() {
  const greet = getGreeting();
  const user = JSON?.parse(Cookie?.get("gafs_user"));
  const data = useFetch(`api/auth/customer-profile/${user.user.id}`);
  const welcome = data?.data?.WelcomeLetter?.[0];
  const approvalletter = data.data.ApprovalLetter?.[0];
  const approval = data.data.approval;
  const [latestApproval, setLatestApproval] = useState(null);
  const [latestWelcome, setLatestWelcome] = useState(null);
  useEffect(() => {
    const categorizedInvoices = {
      approvalInvoices: [],
      welcomeInvoices: [],
    };

    if (approval) {
      approval.forEach((item) => {
        if (item.recived) {
          categorizedInvoices.approvalInvoices.push(item);
        } else {
          categorizedInvoices.welcomeInvoices.push(item);
        }
      });

      categorizedInvoices.approvalInvoices.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      categorizedInvoices.welcomeInvoices.sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );

      setLatestApproval(categorizedInvoices.approvalInvoices[0] || null);
      setLatestWelcome(categorizedInvoices.welcomeInvoices[0] || null);
    }
  }, [approval]);

  const init = {
    welcome: false,
    ApprovalL: false,
    weli: false,
    api: false,
  };

  const [generate, setGenerate] = useState(init);
  const PdfFileWelcomeLetter = ({ data }) => {
    const company = "Caslon Business Services Private Limited.";
    return (
      <Document>
        <Page size="A4" style={{}}>
          <View style={{}}>
            <Image src={"/pdfBanner.png"} />
          </View>
          <Image
            style={{
              position: "absolute",
              top: 120,
              right: 30,
              width: 500,
              height: 500,
              opacity: 0.1,
            }}
            src={"/logo_without_name.png"}
          />
          <View
            style={{
              paddingTop: 20,
              paddingHorizontal: 40,
              position: "relative",
            }}
          >
            <Image
              style={{
                position: "absolute",
                top: 100,
                right: 200,
                width: 300,
                height: 300,
                opacity: 0.1,
                transform: "rotate(-45deg)",
              }}
              src={"/log.png"}
            />
          </View>
          <Text
            style={{
              textAlign: "center",
              color: "green",
              marginTop: 8,
              fontSize: 18,
              letterSpacing: 1,
              fontFamily: "Roboto",
            }}
          >
            CONGRATULATIONS
          </Text>
          <View
            style={{
              marginTop: 10,
              fontFamily: "Roboto",
              textTransform: "uppercase",
              marginHorizontal: 40,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 6,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  fontSize: 12,
                  fontWeight: "light",
                  padding: 5,
                  textTransform: "uppercase",
                  width: 135,
                }}
              >
                Applicant Name
              </Text>
              <Text>:</Text>
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
                {data.for.name}
              </Text>
            </View>

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
                  padding: 5,
                  textTransform: "uppercase",
                  width: 130,
                }}
              >
                Applicant Mobile
              </Text>
              <Text>:</Text>
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
                +91 {data.for.phone}
              </Text>
            </View>
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
                  padding: 5,
                  textTransform: "uppercase",
                  width: 130,
                }}
              >
                {data.for.guardian_relation === "SONOF" ||
                data.for.guardian_relation === "DOF"
                  ? "Father Name"
                  : "Husband Name"}
              </Text>
              <Text>:</Text>
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
                {data.for.guardian_name}
              </Text>
            </View>

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
                  padding: 5,
                  textTransform: "uppercase",
                  width: 130,
                }}
              >
                Loan Amount
              </Text>
              <Text>:</Text>
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
                Rs. {data.for.loanInNumber}/- ({data.for.loanInWords})
              </Text>
            </View>

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
                  padding: 5,
                  textTransform: "uppercase",
                  width: 130,
                }}
              >
                Loan Year
              </Text>
              <Text>:</Text>
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
                {data.for.loanYear} Years
              </Text>
            </View>

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
                  padding: 5,
                  textTransform: "uppercase",
                  width: 130,
                }}
              >
                Loan Month
              </Text>
              <Text>:</Text>
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
                {data.for.loanYear * 12} Months
              </Text>
            </View>

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
                  padding: 5,
                  textTransform: "uppercase",
                  width: 130,
                }}
              >
                Monthly Emi
              </Text>
              <Text>:</Text>
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
                Rs.{" "}
                {calculateEMI(data.for.loanInNumber, 5, data.for.loanYear)?.emi}
                /month
              </Text>
            </View>

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
                  padding: 5,
                  textTransform: "uppercase",
                  width: 130,
                }}
              >
                File Charge
              </Text>
              <Text>:</Text>
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
                Rs. {data.charge}/-
              </Text>
            </View>

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
                  padding: 5,
                  textTransform: "uppercase",
                  width: 130,
                }}
              >
                Generate Date
              </Text>
              <Text>:</Text>
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
                {moment(Date.now()).format("DD/MM/YYYY")}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 40,
            }}
          >
            <Text
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 15,
                lineHeight: 1.5,
                fontSize: 11,
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;We
              have received your documents, these are appropriate docs according
              to our legal adviser. Behalf of your documents by{" "}
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  marginTop: 15,
                  fontSize: 10,
                  fontFamily: "Roboto",
                }}
              >
                {company}
              </Text>
              Your documents are passed by our legal department and now you have
              to pay file charge (Login Charge) for the loan, only in the
              account of our company. If any condition your file is not complete
              your file charge is refund to your account within 7 working days.
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "red",
                marginTop: 10,
                fontSize: 12,
                fontWeight: "light",
                textTransform: "uppercase",
                fontFamily: "Roboto",
              }}
            >
              Company&rsquo;s bank details :
            </Text>
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
                  UNION BANK OF INDIA
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
                  VANDHNAM SERVICES
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
          </View>
          <View
            style={{
              marginHorizontal: 40,
              fontSize: 10,
            }}
          >
            <Text
              style={{
                marginTop: 20,
              }}
            >
              After deposit your file charge you will receive your letter within
              1-3 days. For Further Query
            </Text>
            <Text
              style={{
                marginTop: 10,
              }}
            >
              Contact to Our Assistant:{" "}
              <Text
                style={{
                  fontFamily: "Roboto",
                }}
              >
                {data.with.title} {data.with.firstName} {data.with.LastName}
              </Text>
            </Text>
            <Text style={{ marginTop: 4 }}>
              Contact to Our Assistant:{" "}
              <Text
                style={{
                  fontFamily: "Roboto",
                }}
              >
                {data.with.phone}
              </Text>
            </Text>
            <Image
              src={"/stamp.png"}
              style={{
                position: "absolute",
                bottom: -15,
                right: 0,
                width: 80,
                height: 80,
              }}
            />
            <Text style={{ marginTop: 20 }}>
              Signature of Lonee....................
            </Text>
          </View>
          <View
            style={{
              position: "absolute",
              fontSize: 12,
              bottom: -1,
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
  const PdfApprovalFile = ({ data }) => {
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
                color: "green",
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
                  Periods {data?.customer?.loanYear} years at INTEREST RATE-5%
                  EMI RS.
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
                  Rs.{data?.customer.loanInNumber}/- (
                  {data?.customer.loanInWords})
                </Text>{" "}
                has been approved by the approving committee of the company,
                after the validation of the submitted documents for loan. We are
                pleased to informyou that the company is issuing the offer
                letter to you so that we can further initiate your lone process
                as early as possible. This offer letter is valid for 25 days.
                Where company will keep you are submitted to documents safe only
                for 30 days, otherwise your file will stand closed. Kindly
                deposit your process fees of
                <Text style={{ color: "red", fontFamily: "Roboto" }}>
                  Rs. {data.processingCharge}/-(18% Gst Tax Of Agreement Fees)
                  by Bank (NEFT or RTGS) infavor of{" "}
                  <Text
                    style={{
                      fontFamily: "Roboto",
                    }}
                  >
                    {company}
                  </Text>
                </Text>
                for issuing advisory report and to meet other expenses, along
                with required reports as per company terms & conditions
                Mentioned at the end of the letter WITHIN 10 DAYS (TEN
                DAYS)after receiving the offer letter, kindly submit the D.D
                (demand draft) of processing fee failing to which the offer
                letterwill not be valid. The advisory reports shall comprise of
                title, valuation, investigation report of property etc. As per
                line mark on search report.
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
                3. Only 50% of net salary of govt. guarantor can be treated as
                EMI
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
                loanee if salary of govt. Guarantor is less than double the
                amount will be reduced
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
                6. Company will accept only those applicant & guarantor whose
                age should be18 to 60 years
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
                11. File fees will not refundable after is suing the offer
                letter
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
                same with in due course of time. If I cannot complete the
                required terms & conditions/Legal formalities within due course
                of time or paper found fake during investigation, then finance
                company is fully competent to refuse refunding the process fees,
                which has already deposited with the company and I will not
                request to company to refund the process fees in any
                circumstances as the same has been spend during investigation of
                loan case. Except the amount mentioned at page no.1 and no other
                amount is payable to the company, for which I am fully
                responsible if paid to any person.
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
                  Office/Property
                  Address:........................................
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
                  Willing to Ful fil All Legal Requirement for surety of
                  guarantee of loan : Yes/No:
                  ........................................
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
                  &bull; Last two months payslip & last six months bank
                  statement (incase of Govt/pvt.)
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
                  1. Applicant should not deposit money in any of these
                  following working (person lawyer, agent) or else company would
                  not be responsible for it.
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
                  4. The payment of the process fees has to be deposit in
                  company account.
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
  const PdWelcomeInvoicefFile = ({ data }) => {
    function calculateEMI(principal, interestRate, years) {
      if (principal && interestRate && years) {
        interestRate = interestRate / 100;
        const monthlyInterestRate = interestRate / 12;
        const totalMonths = years * 12;
        const emi =
          (principal * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
        const totalLoanAmount = emi * totalMonths;
        return {
          emi: Math.round(emi),
          totalLoanAmount: totalLoanAmount,
          totalMonths,
        };
      } else {
        return null;
      }
    }
    return (
      <Document>
        <Page
          size="A4"
          style={{
            paddingBottom: 35,
          }}
        >
          <View style={{}}>
            <Image src={"/pdfBanner.png"} />
          </View>
          <View
            style={{
              padding: 40,
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
                color: "green",
                fontSize: 12,
                fontWeight: "light",
              }}
            >
              Deals in HomeLoan, PersonalLoan, Agriculture Loan, Education Loan,
              PaySlip Loan, Business Loans, Loan Against Property, ITR Loan etc.{" "}
            </Text>
            <Text
              style={{
                textAlign: "right",
                color: "green",
                marginTop: 20,
                fontSize: 15,
                fontWeight: "light",
              }}
            >
              Date : {data.createdAt.split("T")[0]}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "green",
                marginTop: 15,
                fontSize: 30,
                fontWeight: "light",
              }}
            >
              Invoice
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "light",
                  }}
                >
                  Invoice to :
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "light",
                  }}
                >
                  {data?.customer?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "light",
                  }}
                >
                  {data?.customer?.email}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "light",
                  }}
                >
                  {data?.customer?.phone}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                    fontSize: 12,
                  }}
                >
                  <Text>InvoiceId:</Text>
                  <Text>{data?.invoiceId}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    fontSize: 12,
                  }}
                >
                  <Text>Pay mode:</Text>
                  <Text>{data?.paymentMethod}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    fontSize: 12,
                  }}
                >
                  <Text>reference:</Text>
                  <Text>{data?.refence}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    fontSize: 12,
                  }}
                >
                  <Text>date:</Text>
                  <Text> {data.createdAt.split("T")[0]}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 40,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  fontSize: 12,
                  borderBottom: "1px solid green",
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    width: 100,
                  }}
                >
                  Sl.
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    width: 120,
                  }}
                >
                  Item Description
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    width: 120,
                  }}
                >
                  Price
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    width: 120,
                  }}
                >
                  Qty
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    width: 120,
                  }}
                >
                  Total
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 20,
                  fontSize: 12,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    width: 100,
                  }}
                >
                  1
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    width: 120,
                  }}
                >
                  {data?.desciption}
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    width: 120,
                  }}
                >
                  Rs. {data?.price}
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    width: 120,
                  }}
                >
                  {data?.qty}
                </Text>
                <Text
                  style={{
                    textAlign: "right",
                    width: 120,
                  }}
                >
                  Rs. {data?.total}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 40,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
                fontSize: 12,
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "left",
                  }}
                >
                  Dear {data?.customer?.name},
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    marginTop: 5,
                  }}
                >
                  Your file charges payment
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    marginTop: 5,
                  }}
                >
                  has been received.
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    fontSize: 12,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                    }}
                  >
                    SubTotal + GST :
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                    }}
                  >
                    Rs. {data?.total}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    fontSize: 12,
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                    }}
                  >
                    total:
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                    }}
                  >
                    Rs. {data?.total}
                  </Text>
                </View>
              </View>
            </View>
            <Image
              src={"/stamp.png"}
              style={{
                position: "absolute",
                bottom: -120,
                right: 60,
                width: 100,
                height: 100,
              }}
            />
          </View>

          {/* <Text
          style={{
            position: "absolute",
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "grey",
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        /> */}
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
  const PdfApprovalInvoiceFile = ({ data }) => {
    function calculateEMI(principal, interestRate, years) {
      if (principal && interestRate && years) {
        interestRate = interestRate / 100;
        const monthlyInterestRate = interestRate / 12;
        const totalMonths = years * 12;
        const emi =
          (principal * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -totalMonths));
        const totalLoanAmount = emi * totalMonths;
        return {
          emi: Math.round(emi),
          totalLoanAmount: totalLoanAmount,
          totalMonths,
        };
      } else {
        return null;
      }
    }
    return (
      <Document>
        <Page
          size="A4"
          style={{
            paddingBottom: 35,
          }}
        >
          <View style={{}}>
            <Image src={"/pdfBanner.png"} />
          </View>
          <View
            style={{
              padding: 40,
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
                color: "green",
                fontSize: 12,
                fontWeight: "light",
              }}
            >
              Deals in HomeLoan, PersonalLoan, Agriculture Loan, Education Loan,
              PaySlip Loan, Business Loans, Loan Against Property, ITR Loan etc.{" "}
            </Text>
            <Text
              style={{
                textAlign: "right",
                color: "green",
                marginTop: 20,
                fontSize: 15,
                fontWeight: "light",
              }}
            >
              Date : {data.createdAt.split("T")[0]}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "green",
                marginTop: 15,
                fontSize: 30,
                fontWeight: "light",
              }}
            >
              Invoice
            </Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: "light",
                  }}
                >
                  Invoice to :
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "light",
                  }}
                >
                  {data?.customer?.name}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "light",
                  }}
                >
                  {data?.customer?.email}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "light",
                  }}
                >
                  {data?.customer?.phone}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                    fontSize: 12,
                  }}
                >
                  <Text>InvoiceId:</Text>
                  <Text>{data?.invoiceId}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    fontSize: 12,
                  }}
                >
                  <Text>Pay mode:</Text>
                  <Text>{data?.paymentMethod}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    fontSize: 12,
                  }}
                >
                  <Text>reference:</Text>
                  <Text>{data?.refence}</Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    fontSize: 12,
                  }}
                >
                  <Text>date:</Text>
                  <Text> {data.createdAt.split("T")[0]}</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 40,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 20,
                  fontSize: 12,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                  }}
                >
                  Item Description
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                  }}
                >
                  Total
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                  }}
                >
                  Received
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                  }}
                >
                  Balance
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 20,
                  fontSize: 12,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                  }}
                >
                  {data?.desciption}
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                  }}
                >
                  Rs. {data?.total}
                </Text>

                <Text
                  style={{
                    textAlign: "left",
                  }}
                >
                  Rs. {data?.recived}
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                  }}
                >
                  Rs. {data?.total - data?.recived}
                </Text>
              </View>
            </View>
            <View
              style={{
                marginTop: 40,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 20,
                fontSize: 12,
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "left",
                  }}
                >
                  Dear {data?.customer?.name} processing fee
                </Text>

                <Text
                  style={{
                    textAlign: "left",
                    marginTop: 5,
                  }}
                >
                  has been received.
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 6,
                }}
              >
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    fontSize: 12,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                    }}
                  >
                    Total :
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                    }}
                  >
                    Rs. {data?.total}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    fontSize: 12,
                    marginTop: 5,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                    }}
                  >
                    Received:
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                    }}
                  >
                    Rs. {data?.recived}
                  </Text>
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 20,
                    fontSize: 12,
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "left",
                    }}
                  >
                    Balance:
                  </Text>
                  <Text
                    style={{
                      textAlign: "left",
                    }}
                  >
                    Rs. {data?.total - data?.recived}
                  </Text>
                </View>
              </View>
            </View>
            <Image
              src={"/stamp.png"}
              style={{
                position: "absolute",
                bottom: -120,
                right: 60,
                width: 100,
                height: 100,
              }}
            />
          </View>

          {/* <Text
          style={{
            position: "absolute",
            fontSize: 12,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "grey",
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        /> */}
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
  return data.loading ? (
    <Loader />
  ) : (
    <div className="h-screen">
      <h1 className="text-xl">Welcome Back ! ({greet})</h1>
      <h1 className="text-xl">Track your loan </h1>
      <div>
        <VerticalTimeline>
          {welcome && (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(0, 150, 0)", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  rgb(0, 150, 0)" }}
              date={moment(welcome.createdAt).format("DD-MM-YYYY")}
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<MailCheckIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                Welcome Letter
              </h3>

              <p>Welcome letter is generated</p>
              <Badge
                onClick={() => {
                  setGenerate((prev) => ({
                    ...init,
                    welcome: true,
                  }));
                }}
                type={enums.BLUE}
              >
                {welcome && generate.welcome ? (
                  <PDFDownloadLink
                    id="download"
                    document={<PdfFileWelcomeLetter data={welcome} />}
                    fileName={`${welcome.for.name}.pdf`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Generateing..." : "Print"
                    }
                  </PDFDownloadLink>
                ) : (
                  "Generate"
                )}
              </Badge>
            </VerticalTimelineElement>
          )}
          {approvalletter && (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(0, 150, 0)", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  rgb(0, 150, 0)" }}
              date={moment(approvalletter.createdAt).format("DD-MM-YYYY")}
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<MailCheckIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                Approval Letter
              </h3>

              <p>Approval letter is generated</p>
              <Badge
                onClick={() => {
                  setGenerate((prev) => ({
                    ...init,
                    ApprovalL: true,
                  }));
                }}
                type={enums.BLUE}
              >
                {approvalletter && generate.ApprovalL ? (
                  <PDFDownloadLink
                    id="download"
                    document={<PdfApprovalFile data={approvalletter} />}
                    fileName={`${approvalletter.customer.name}.pdf`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Generateing..." : "Print"
                    }
                  </PDFDownloadLink>
                ) : (
                  "Generate"
                )}
              </Badge>
            </VerticalTimelineElement>
          )}
          {latestWelcome && (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(0, 150, 0)", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  rgb(0, 150, 0)" }}
              date={moment(latestWelcome.createdAt).format("DD-MM-YYYY")}
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<MailCheckIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                Welcome Invoice
              </h3>

              <p>Welcome Invoice is generated</p>
              <Badge
                onClick={() => {
                  setGenerate((prev) => ({
                    ...init,
                    weli: true,
                  }));
                }}
                type={enums.BLUE}
              >
                {latestWelcome && generate.weli ? (
                  <PDFDownloadLink
                    id="download"
                    document={<PdWelcomeInvoicefFile data={latestWelcome} />}
                    fileName={`${latestWelcome.customer.name}.pdf`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Generateing..." : "Print"
                    }
                  </PDFDownloadLink>
                ) : (
                  "Generate"
                )}
              </Badge>
            </VerticalTimelineElement>
          )}

          {latestApproval && (
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: "rgb(0, 150, 0)", color: "#fff" }}
              contentArrowStyle={{ borderRight: "7px solid  rgb(0, 150, 0)" }}
              date={moment(latestApproval.createdAt).format("DD-MM-YYYY")}
              iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
              icon={<MailCheckIcon />}
            >
              <h3 className="vertical-timeline-element-title">
                Approval Invoice
              </h3>

              <p>Approval Invoice is generated</p>
              <Badge
                onClick={() => {
                  setGenerate((prev) => ({
                    ...init,
                    api: true,
                  }));
                }}
                type={enums.BLUE}
              >
                {latestApproval && generate.api ? (
                  <PDFDownloadLink
                    id="download"
                    document={<PdfApprovalInvoiceFile data={latestApproval} />}
                    fileName={`${latestApproval.customer.name}.pdf`}
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? "Generateing..." : "Print"
                    }
                  </PDFDownloadLink>
                ) : (
                  "Generate"
                )}
              </Badge>
            </VerticalTimelineElement>
          )}
        </VerticalTimeline>
      </div>
    </div>
  );
}

export default CustomerHome;
