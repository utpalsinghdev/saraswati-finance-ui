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
import metaData from "../../../utils/lib/site.config";
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
    const company = metaData.title;
    return (
      <Document>
        <Page
          size="A4"
          style={{
            borderRight: "4px solid #5FBDFF",
            borderLeft: "4px solid #5FBDFF",
          }}
        >
          <View style={{}}>
            <Image src={"/pdfBanner.png"} />
          </View>
          <Image
            style={{
              position: "absolute",
              top: 360,
              right: 30,
              width: 500,
              opacity: 0.1,
            }}
            src={"/logo_without_name.png"}
          />

          <Text
            style={{
              textAlign: "center",
              color: "#FF0000",
              marginTop: 4,
              fontSize: 18,
              letterSpacing: 1,
              fontFamily: "Roboto",
            }}
          >
            WELCOME LETTER
          </Text>

          <View
            style={{
              marginTop: 10,
              fontFamily: "Roboto",
              textTransform: "uppercase",
              marginHorizontal: 40,
            }}
          >
            <Text
              style={{
                textAlign: "left",
                color: "#5FBDFF",
                marginTop: 5,
                marginBottom: 5,
                fontSize: 12,
                fontWeight: "light",
                width: "100%",
                textAlign: "right",
                fontFamily: "Roboto",

                // color: "blue",
              }}
            >
              Date : {moment(data.createdAt).format("DD/MM/YYYY")}
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "#FF0000",
                marginTop: 5,
                marginBottom: 5,
                fontSize: 12,
                fontWeight: "light",
                textTransform: "uppercase",
                fontFamily: "Roboto",
              }}
            >
              Dear Sir/ Madam{" "}
            </Text>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  marginTop: 10,
                  fontFamily: "Roboto",
                  textTransform: "uppercase",
                  // marginHorizontal: 40,
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

                {/* <View
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
            </View> */}
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

                {/* <View
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
            </View> */}

                {/* <View
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
            </View> */}

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
                    {
                      calculateEMI(data.for.loanInNumber, 5, data.for.loanYear)
                        ?.emi
                    }
                    /month for {data.for.loanYear} year(s)
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
                    Rs. {metaData.fileCharge}/-
                  </Text>
                </View>

                {/* <View
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
            </View> */}
              </View>
              {/* <Image
              src={"/_stamp.png"}
              style={{
                width: 110,
                height: 110,
              }}
            /> */}
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
                marginTop: 10,
                lineHeight: 1.5,
                fontSize: 12,
              }}
            >
              Your documents received, and those are appropriate docs according
              to our legal adviser, behalf of your documents by
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  marginTop: 15,
                  fontSize: 10,
                  fontFamily: "Roboto",
                }}
              >
                {" " + company}
              </Text>
            </Text>
            <Text
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 8,
                lineHeight: 1.5,
                fontSize: 12,
              }}
            >
              Your documents are passed by our legal department and now you have
              to pay file charge (Login Charge) for the loan, only in the
              account of our company.
            </Text>
          </View>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 5,
              marginBottom: 5,
              marginHorizontal: 40,
              fontSize: 11,
              fontWeight: "light",
              textTransform: "uppercase",
              fontFamily: "Roboto",
            }}
          >
            Important Notice{" "}
          </Text>
          <View
            style={{
              marginHorizontal: 40,
              fontSize: 11,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              <Text>
                1. Applicant should not deposit money in any of these following
                working (person, lawyer, agent) or else company would not be
                responsible for it.
              </Text>
              <Text>
                2. Every signed paper of the offer letter as well as required
                paper processing fees has to be send to the company.
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 3,
                }}
              >
                <Text style={{}}>
                  3. Immediately send the cash deposit slip at company&apos;
                  email ID {metaData.email}
                </Text>
              </View>
              <Text>
                4. Signature or thumb impression is compulsory in every page.
              </Text>
              <Text>
                5. Disbursement of loan will be subject to the condition at the
                time of disbursement.
              </Text>
              <Text>
                6. Final approval sanction will be issued subject to fulfillment
                of the existing terms & conditions of apply.
              </Text>
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
              If you have any query
            </Text>
            <Text
              style={{
                marginTop: 4,
              }}
            >
              Contact:
              <Text
                style={{
                  fontFamily: "Roboto",
                }}
              >
                {data.with.title} {data.with.firstName} {data.with.LastName}
              </Text>
            </Text>
            <Text style={{ marginTop: 4 }}>
              Mobile :
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
                bottom: -20,
                right: -15,
                // width: 110,
                height: 90,
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
            fontFamily: "Roboto",
            borderRight: "4px solid #5FBDFF",
            borderLeft: "4px solid #5FBDFF",
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
                width: 550,
                opacity: 0.1,
              }}
              src={"/watermark.png"}
            />
            {/* <Text
            style={{
              textAlign: "center",
              color: "#FF0000",
              fontSize: 12,
              fontFamily: "Roboto",
            }}
          >
            Deals in HomeLoan, PersonalLoan, Agriculture Loan, Education Loan,
            PaySlip Loan, Business Loans, Loan Against Property, ITR Loan etc.{" "}
          </Text> */}
            <Text
              style={{
                textAlign: "right",
                color: "#FF0000",
                marginTop: 20,
                fontSize: 15,
                fontFamily: "Roboto",
              }}
            >
              Date : {moment(data.createdAt.split("T")[0]).format("DD/MM/YY")}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "#FF0000",
                marginTop: 15,
                fontSize: 30,
                fontFamily: "Roboto",
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
                fontFamily: "Roboto",
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
                  <Text>
                    {" "}
                    {moment(data.createdAt.split("T")[0]).format("DD/MM/YY")}
                  </Text>
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
                  fontFamily: "Roboto",
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
                  fontFamily: "Roboto",
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
                fontFamily: "Roboto",
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
                bottom: -90,
                right: 60,
                width: 130,
                height: 120,
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
            borderRight: "4px solid #5FBDFF",
            borderLeft: "4px solid #5FBDFF",
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
              fontFamily: "Roboto",
            }}
          >
            <Image
              style={{
                position: "absolute",
                top: 100,
                right: 30,
                width: 550,
                opacity: 0.1,
              }}
              src={"/watermark.png"}
            />
            {/* <Text
            style={{
              textAlign: "center",
              color: "#FF0000",
              fontSize: 12,
              fontWeight: "light",
              fontFamily: "Roboto",
            }}
          >
            Deals in HomeLoan, PersonalLoan, Agriculture Loan, Education Loan,
            PaySlip Loan, Business Loans, Loan Against Property, ITR Loan etc.{" "}
          </Text> */}
            <Text
              style={{
                textAlign: "right",
                color: "#FF0000",
                marginTop: 20,
                fontSize: 15,
                fontWeight: "light",
              }}
            >
              Date : {moment(data.createdAt.split("T")[0]).format("DD/MM/YY")}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "#FF0000",
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
                  <Text>
                    {" "}
                    {moment(data.createdAt.split("T")[0]).format("DD/MM/YY")}
                  </Text>
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
                bottom: -90,
                right: 60,
                width: 130,
                height: 120,
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
                    |
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
              <Badge type={enums.BLUE}>
                <a
                  href={
                    import.meta.env.VITE_BASE_URL +
                    "/uploads" +
                    approvalletter.url.split("/uploads")[1]
                  }
                  download
                >
                  Download (pass: {approvalletter.pdfPassword?.replace(",", "")}
                  )
                </a>
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
