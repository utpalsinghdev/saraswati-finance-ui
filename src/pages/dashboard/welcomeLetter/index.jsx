import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  PDFDownloadLink,
  Font,
  PDFViewer,
} from "@react-pdf/renderer";
import Modal from "../../../components/ui/modal";
import Select from "../../../components/ui/select";
import { BiIdCard, BiRupee } from "react-icons/bi";
import { Button } from "../../../components/ui/table/paginationButtons";
import ApiService from "../../../services/Api_services";
import { toast } from "react-hot-toast";
import { Formik } from "formik";
import Badge, { enums } from "../../../components/ui/badge";
import ConfirmationModal from "../../../components/confirmationModal";
import Table from "../../../components/ui/table/Table";
import {
  generateWelcomeLetter,
  generateWelcomeLetterManual,
} from "../../../schemas";
import useFetch from "../../../hooks/useFetch";
import Input from "../../../components/ui/input";
import Loader from "../../../components/loader";
import calculateEMI from "../../../utils/calculator";
import bold from "../../../assets/bold.ttf";
import { Calendar, Phone, User2Icon, Wallet } from "lucide-react";
import { RiUser2Line, RiUserHeartLine } from "react-icons/ri";
import { ToWords } from "to-words";
import moment from "moment/moment";
import ComboBox from "../../../components/ui/comboBox";
import metaData from "../../../utils/lib/site.config";
Font.register({
  family: "Roboto",
  fonts: [{ src: bold, fontWeight: "bold" }],
});
export const PdfFile = ({ data, general, imgUrl }) => {
  const company = metaData.title;

  return (
    // <Document>
    //   <Page size="A4">
    //     <View style={{}}>
    //       <Image src={"/pdfBanner.png"} />
    //     </View>
    //     <Image
    //       style={{
    //         position: "absolute",
    //         top: 360,
    //         right: 30,
    //         width: 500,
    //         opacity: 0.1,
    //       }}
    //       src={"/logo.png"}
    //     />

    //     <Text
    //       style={{
    //         textAlign: "center",
    //         color: "#FF0000",
    //         marginTop: 4,
    //         fontSize: 18,
    //         letterSpacing: 1,
    //         fontFamily: "Roboto",
    //       }}
    //     >
    //       WELCOME LETTER
    //     </Text>

    //     <View
    //       style={{
    //         marginTop: 10,
    //         fontFamily: "Roboto",
    //         textTransform: "uppercase",
    //         marginHorizontal: 40,
    //       }}
    //     >
    //       <Text
    //         style={{
    //           textAlign: "left",
    //           color: "#5FBDFF",
    //           marginTop: 5,
    //           marginBottom: 5,
    //           fontSize: 12,
    //           fontWeight: "light",
    //           width: "100%",
    //           textAlign: "right",
    //           fontFamily: "Roboto",

    //           // color: "blue",
    //         }}
    //       >
    //         Date : {moment(data.createdAt).format("DD/MM/YYYY")}
    //       </Text>
    //       <Text
    //         style={{
    //           textAlign: "left",
    //           color: "#FF0000",
    //           marginTop: 5,
    //           marginBottom: 5,
    //           fontSize: 12,
    //           fontWeight: "light",
    //           textTransform: "uppercase",
    //           fontFamily: "Roboto",
    //         }}
    //       >
    //         Dear Sir/ Madam{" "}
    //       </Text>

    //       <View
    //         style={{
    //           display: "flex",
    //           flexDirection: "row",
    //           justifyContent: "space-between",
    //         }}
    //       >
    //         <View
    //           style={{
    //             marginTop: 10,
    //             fontFamily: "Roboto",
    //             textTransform: "uppercase",
    //             // marginHorizontal: 40,
    //           }}
    //         >
    //           <View
    //             style={{
    //               display: "flex",
    //               flexDirection: "row",
    //               gap: 6,
    //             }}
    //           >
    //             <Text
    //               style={{
    //                 textAlign: "left",
    //                 color: "black",
    //                 fontSize: 12,
    //                 fontWeight: "light",
    //                 padding: 5,
    //                 textTransform: "uppercase",
    //                 width: 135,
    //               }}
    //             >
    //               Applicant Name
    //             </Text>
    //             <Text>:</Text>
    //             <Text
    //               style={{
    //                 textAlign: "left",
    //                 color: "black",
    //                 fontSize: 12,
    //                 padding: 5,
    //                 textTransform: "uppercase",
    //                 fontWeight: "extrabold",
    //               }}
    //             >
    //               {data.for.name}
    //             </Text>
    //           </View>

    //           {/* <View
    //           style={{
    //             display: "flex",
    //             flexDirection: "row",
    //             gap: 10,
    //           }}
    //         >
    //           <Text
    //             style={{
    //               textAlign: "left",
    //               color: "black",
    //               fontSize: 12,
    //               fontWeight: "light",
    //               padding: 5,
    //               textTransform: "uppercase",
    //               width: 130,
    //             }}
    //           >
    //             Applicant Mobile
    //           </Text>
    //           <Text>:</Text>
    //           <Text
    //             style={{
    //               textAlign: "left",
    //               color: "black",
    //               fontSize: 12,
    //               padding: 5,
    //               textTransform: "uppercase",
    //               fontWeight: "extrabold",
    //             }}
    //           >
    //             +91 {data.for.phone}
    //           </Text>
    //         </View> */}
    //           <View
    //             style={{
    //               display: "flex",
    //               flexDirection: "row",
    //               gap: 10,
    //             }}
    //           >
    //             <Text
    //               style={{
    //                 textAlign: "left",
    //                 color: "black",
    //                 fontSize: 12,
    //                 fontWeight: "light",
    //                 padding: 5,
    //                 textTransform: "uppercase",
    //                 width: 130,
    //               }}
    //             >
    //               {data.for.guardian_relation === "SONOF" ||
    //               data.for.guardian_relation === "DOF"
    //                 ? "Father Name"
    //                 : "Husband Name"}
    //             </Text>
    //             <Text>:</Text>
    //             <Text
    //               style={{
    //                 textAlign: "left",
    //                 color: "black",
    //                 fontSize: 12,
    //                 padding: 5,
    //                 textTransform: "uppercase",
    //                 fontWeight: "extrabold",
    //               }}
    //             >
    //               {data.for.guardian_name}
    //             </Text>
    //           </View>

    //           <View
    //             style={{
    //               display: "flex",
    //               flexDirection: "row",
    //               gap: 10,
    //             }}
    //           >
    //             <Text
    //               style={{
    //                 textAlign: "left",
    //                 color: "black",
    //                 fontSize: 12,
    //                 fontWeight: "light",
    //                 padding: 5,
    //                 textTransform: "uppercase",
    //                 width: 130,
    //               }}
    //             >
    //               Loan Amount
    //             </Text>
    //             <Text>:</Text>
    //             <Text
    //               style={{
    //                 textAlign: "left",
    //                 color: "black",
    //                 fontSize: 12,
    //                 padding: 5,
    //                 textTransform: "uppercase",
    //                 fontWeight: "extrabold",
    //               }}
    //             >
    //               Rs. {data.for.loanInNumber}/- ({data.for.loanInWords})
    //             </Text>
    //           </View>

    //           {/* <View
    //           style={{
    //             display: "flex",
    //             flexDirection: "row",
    //             gap: 10,
    //           }}
    //         >
    //           <Text
    //             style={{
    //               textAlign: "left",
    //               color: "black",
    //               fontSize: 12,
    //               fontWeight: "light",
    //               padding: 5,
    //               textTransform: "uppercase",
    //               width: 130,
    //             }}
    //           >
    //             Loan Year
    //           </Text>
    //           <Text>:</Text>
    //           <Text
    //             style={{
    //               textAlign: "left",
    //               color: "black",
    //               fontSize: 12,
    //               padding: 5,
    //               textTransform: "uppercase",
    //               fontWeight: "extrabold",
    //             }}
    //           >
    //             {data.for.loanYear} Years
    //           </Text>
    //         </View> */}

    //           {/* <View
    //           style={{
    //             display: "flex",
    //             flexDirection: "row",
    //             gap: 10,
    //           }}
    //         >
    //           <Text
    //             style={{
    //               textAlign: "left",
    //               color: "black",
    //               fontSize: 12,
    //               fontWeight: "light",
    //               padding: 5,
    //               textTransform: "uppercase",
    //               width: 130,
    //             }}
    //           >
    //             Loan Month
    //           </Text>
    //           <Text>:</Text>
    //           <Text
    //             style={{
    //               textAlign: "left",
    //               color: "black",
    //               fontSize: 12,
    //               padding: 5,
    //               textTransform: "uppercase",
    //               fontWeight: "extrabold",
    //             }}
    //           >
    //             {data.for.loanYear * 12} Months
    //           </Text>
    //         </View> */}

    //           <View
    //             style={{
    //               display: "flex",
    //               flexDirection: "row",
    //               gap: 10,
    //             }}
    //           >
    //             <Text
    //               style={{
    //                 textAlign: "left",
    //                 color: "black",
    //                 fontSize: 12,
    //                 fontWeight: "light",
    //                 padding: 5,
    //                 textTransform: "uppercase",
    //                 width: 130,
    //               }}
    //             >
    //               Monthly Emi
    //             </Text>
    //             <Text>:</Text>
    //             <Text
    //               style={{
    //                 textAlign: "left",
    //                 color: "black",
    //                 fontSize: 12,
    //                 padding: 5,
    //                 textTransform: "uppercase",
    //                 fontWeight: "extrabold",
    //               }}
    //             >
    //               Rs.{" "}
    //               {
    //                 calculateEMI(data.for.loanInNumber, 5, data.for.loanYear)
    //                   ?.emi
    //               }
    //               /month for {data.for.loanYear} year(s)
    //             </Text>
    //           </View>

    //           <View
    //             style={{
    //               display: "flex",
    //               flexDirection: "row",
    //               gap: 10,
    //             }}
    //           >
    //             <Text
    //               style={{
    //                 textAlign: "left",
    //                 color: "black",
    //                 fontSize: 12,
    //                 fontWeight: "light",
    //                 padding: 5,
    //                 textTransform: "uppercase",
    //                 width: 130,
    //               }}
    //             >
    //               File Charge
    //             </Text>
    //             <Text>:</Text>
    //             <Text
    //               style={{
    //                 textAlign: "left",
    //                 color: "black",
    //                 fontSize: 12,
    //                 padding: 5,
    //                 textTransform: "uppercase",
    //                 fontWeight: "extrabold",
    //               }}
    //             >
    //               Rs. {general.data.fileCharge}/-
    //             </Text>
    //           </View>

    //           {/* <View
    //           style={{
    //             display: "flex",
    //             flexDirection: "row",
    //             gap: 10,
    //           }}
    //         >
    //           <Text
    //             style={{
    //               textAlign: "left",
    //               color: "black",
    //               fontSize: 12,
    //               fontWeight: "light",
    //               padding: 5,
    //               textTransform: "uppercase",
    //               width: 130,
    //             }}
    //           >
    //             Generate Date
    //           </Text>
    //           <Text>:</Text>
    //           <Text
    //             style={{
    //               textAlign: "left",
    //               color: "black",
    //               fontSize: 12,
    //               padding: 5,
    //               textTransform: "uppercase",
    //               fontWeight: "extrabold",
    //             }}
    //           >
    //             {moment(Date.now()).format("DD/MM/YYYY")}
    //           </Text>
    //         </View> */}
    //         </View>
    //         {/* <Image
    //           src={"/_stamp.png"}
    //           style={{
    //             width: 110,
    //             height: 110,
    //           }}
    //         /> */}
    //       </View>
    //     </View>
    //     <View
    //       style={{
    //         marginHorizontal: 40,
    //       }}
    //     >
    //       <Text
    //         style={{
    //           textAlign: "left",
    //           color: "black",
    //           marginTop: 10,
    //           lineHeight: 1.5,
    //           fontSize: 12,
    //         }}
    //       >
    //         Your documents received, and those are appropriate docs according to
    //         our legal adviser, behalf of your documents by
    //         <Text
    //           style={{
    //             textAlign: "left",
    //             color: "black",
    //             marginTop: 15,
    //             fontSize: 10,
    //             fontFamily: "Roboto",
    //           }}
    //         >
    //           {" " + company}
    //         </Text>
    //       </Text>
    //       <Text
    //         style={{
    //           textAlign: "left",
    //           color: "black",
    //           marginTop: 8,
    //           lineHeight: 1.5,
    //           fontSize: 12,
    //         }}
    //       >
    //         Your documents are passed by our legal department and now you have
    //         to pay file charge (Login Charge) for the loan, only in the account
    //         of our company.
    //       </Text>
    //     </View>
    //     <Text
    //       style={{
    //         textAlign: "left",
    //         color: "black",
    //         marginTop: 5,
    //         marginBottom: 5,
    //         marginHorizontal: 40,
    //         fontSize: 11,
    //         fontWeight: "light",
    //         textTransform: "uppercase",
    //         fontFamily: "Roboto",
    //       }}
    //     >
    //       Important Notice{" "}
    //     </Text>
    //     <View
    //       style={{
    //         marginHorizontal: 40,
    //         fontSize: 11,
    //         display: "flex",
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //       }}
    //     >
    //       <View
    //         style={{
    //           display: "flex",
    //           flexDirection: "column",
    //           gap: 6,
    //         }}
    //       >
    //         <Text>
    //           1. Applicant should not deposit money in any of these following
    //           working (person, lawyer, agent) or else company would not be
    //           responsible for it.
    //         </Text>
    //         <Text>
    //           2. Every signed paper of the offer letter as well as required
    //           paper processing fees has to be send to the company.
    //         </Text>
    //         <View
    //           style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             gap: 3,
    //           }}
    //         >
    //           <Text style={{}}>
    //             3. Immediately send the cash deposit slip at company&apos; email
    //             ID {metaData.email}
    //           </Text>
    //         </View>
    //         <Text>
    //           4. Signature or thumb impression is compulsory in every page.
    //         </Text>
    //         <Text>
    //           5. Disbursement of loan will be subject to the condition at the
    //           time of disbursement.
    //         </Text>
    //         <Text>
    //           6. Final approval sanction will be issued subject to fulfillment
    //           of the existing terms & conditions of apply.
    //         </Text>
    //       </View>
    //     </View>

    //     <View
    //       style={{
    //         marginHorizontal: 40,
    //         fontSize: 10,
    //       }}
    //     >
    //       <Text
    //         style={{
    //           marginTop: 20,
    //         }}
    //       >
    //         If you have any query
    //       </Text>
    //       <Text
    //         style={{
    //           marginTop: 4,
    //         }}
    //       >
    //         Contact:
    //         <Text
    //           style={{
    //             fontFamily: "Roboto",
    //           }}
    //         >
    //           {data.with.title} {data.with.firstName} {data.with.LastName}
    //         </Text>
    //       </Text>
    //       <Text style={{ marginTop: 4 }}>
    //         Mobile :
    //         <Text
    //           style={{
    //             fontFamily: "Roboto",
    //           }}
    //         >
    //           {data.with.phone}
    //         </Text>
    //       </Text>
    //       <Image
    //         src={"/stamp.png"}
    //         style={{
    //           position: "absolute",
    //           bottom: -20,
    //           right: -15,
    //           // width: 110,
    //           height: 110,
    //         }}
    //       />
    //       <Text style={{ marginTop: 20 }}>
    //         Signature of Lonee....................
    //       </Text>
    //     </View>
    //     <View
    //       style={{
    //         position: "absolute",
    //         fontSize: 12,
    //         bottom: -1,
    //         left: 0,
    //         right: 0,
    //         textAlign: "center",
    //         color: "grey",
    //       }}
    //     >
    //       <Image
    //         style={{
    //           marginTop: 120,
    //         }}
    //         src={"/pdfFooter.png"}
    //       />
    //     </View>
    //   </Page>
    // </Document>
    <Document>
      <Page
        size="A4"
        style={{
          fontFamily: "Helvetica",
          borderRight: "5px solid #052541",
          borderLeft: "5px solid #052541",
        }}
      >
        <View style={{}}>
          <Image src={"/pdfBanner.png"} />
        </View>
        <Image
          style={{
            position: "absolute",
            top: 220,
            right: 30,
            width: 500,
            opacity: 0.1,
          }}
          src={"/logo.png"}
        />

        <Text
          style={{
            textAlign: "center",
            color: "green",
            marginTop: 4,
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
              Rs. {general.data.fileCharge}/-
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
            to pay file charge (Login Charge) for the loan, only in the account
            of our company. If any condition your file is not complete your file
            charge is refund to your account within 7 working days.
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "red",
              marginTop: 5,
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
              display: "flex",
              flexDirection: "row",
              gap: 4,
              alignItems: "center",
              justifyContent: "space-between",
              // border: "1px solid black",
            }}
          >
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
                  {general.data.bankName}
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
                    width: 260,
                    textTransform: "uppercase",
                    fontWeight: "extrabold",
                  }}
                >
                  {general.data.holderName}
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
                  {general.data.accountNo}
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
                  {general.data.ifsc}
                </Text>
              </View>
            </View>
            {/* // QR image */}
            {/* {general.data.url && (
              <Image
                source={imgUrl}
                style={{
                  width: 110,
                  height: 110,
                }}
              />
            )} */}
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
              bottom: -10,
              right: 0,
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
          {/* <Image
            style={{
              marginTop: 120,
            }}
            src={"/pdfFooter.png"}
          /> */}
        </View>
      </Page>
    </Document>
  );
};
const initialModalState = {
  state: false,
  edit_id: "",
  data: {
    charge: metaData.fileCharge,
    customerId: "",
    employeeId: "",

    name: "",
    guardian_relation: "SONOF",
    guardian_name: "",
    phone: "",
    loanInNumber: "",
    loanInWords: "",
    loanYear: "",
    agentId: "",
  },
};
function WelcomeLetter() {
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
  const [isManual, setIsManual] = useState(false);

  const [agents, setDatas] = useState({
    loading: true,
    data: [],
  });
  const [confirmModal, setConfirmModal] = useState({
    state: false,
    id: null,
  });

  const customers = useFetch("api/customer");
  const employees = useFetch("api/agent/employee");
  function renderModal() {
    const { state, edit_id, data } = modal;

    return (
      <Modal
        title={"Generate Welcome Letter"}
        open={state}
        setOpen={() => setModal(initialModalState)}
      >
        <Formik
          enableReinitialize={true}
          validationSchema={
            isManual ? generateWelcomeLetterManual : generateWelcomeLetter
          }
          initialValues={data}
          onSubmit={async (values, action) => {
            try {
              const payload = {
                charge: Number(values.charge),
                employeeId: Number(values.employeeId),
                customerId: Number(values.customerId),
              };
              const manualPayload = {
                ...payload,

                name: values.name,
                guardian_relation: values.guardian_relation,
                guardian_name: values.guardian_name,
                phone: values.phone,
                loanInNumber: Number(values.loanInNumber),
                loanInWords: toWords.convert(Number(values.loanInNumber)),
                loanYear: Number(values.loanYear),
              };
              if (isManual) {
                const res = await ApiService.fetchData({
                  url: `api/welcome-letter/manual`,
                  method: "POST",
                  data: manualPayload,
                });
                if (res) toast.success(res.data.message);
                setDatas((prev) => ({
                  ...prev,
                  data: [...prev.data, res.data.data],
                }));
              } else {
                const res = await ApiService.fetchData({
                  url: `api/welcome-letter`,
                  method: "POST",
                  data: payload,
                });
                if (res) toast.success(res.data.message);
                setDatas((prev) => ({
                  ...prev,
                  data: [...prev.data, res.data.data],
                }));
              }
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
              className="w-full pt-4 rounded-b-md pb-8 flex flex-col gap-2 px-4 bg-white"
            >
              {console.log(f.errors)}
              <Input
                name="charge"
                type={"number"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.charge}
                error={f.touched.charge && f.errors.charge}
                icon={<BiRupee size={20} className="text-indigo-500" />}
                label={""}
                placeholder={"Loan Amount"}
              />
              <Select
                label={""}
                onChange={(e) => {
                  if (e.target.value === "true") {
                    setIsManual(true);
                  } else {
                    setIsManual(false);
                  }
                  f.handleChange(e);
                }}
                onBlur={f.handleBlur}
                name={"isManual"}
                value={isManual}
                error={f.touched.isManual && f.errors.isManual}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              >
                <option value={"false"}>Is Online</option>
                <option value={"true"}>Is Manual</option>
              </Select>
              {/* 
              <Select
                onChange={f.handleChange}
                name={"employeeId"}
                value={f.values.employeeId}
                onBlur={f.handleBlur}
                error={f.touched.employeeId && f.errors.employeeId}
                label={""}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              >
                <option value={" "}>Work Under</option>
                {employees.data?.map((a) => (
                  <option
                    key={a.id}
                    value={a.id}
                  >{}</option>
                ))}
              </Select> */}
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
                }}
                name={"employeeId"}
                placeholder={"Select Agent"}
                value={f.values.employeeId}
                onBlur={f.handleBlur}
                error={f.touched.employeeId && f.errors.employeeId}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              />
              {isManual ? (
                <div className="flex flex-col gap-2">
                  <Input
                    name="name"
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.name}
                    error={f.touched.name && f.errors.name}
                    icon={<User2Icon className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"Your Name"}
                  />
                  <span className="flex items-center justify-between w-full gap-8">
                    <Select
                      label={""}
                      name={"guardian_relation"}
                      onBlur={f.handleBlur}
                      onChange={f.handleChange}
                      value={f.values.guardian_relation}
                      error={
                        f.touched.guardian_relation &&
                        f.errors.guardian_relation
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
                    name="phone"
                    type={"text"}
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.phone}
                    error={f.touched.phone && f.errors.phone}
                    icon={<Phone className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"Mobile Number"}
                  />
                  <Input
                    name="loanInNumber"
                    type={"number"}
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.loanInNumber}
                    error={f.touched.loanInNumber && f.errors.loanInNumber}
                    icon={<BiRupee size={20} className="text-indigo-500" />}
                    label={""}
                    placeholder={"Loan Amount"}
                  />
                  <Input
                    name="loanInWords"
                    type={"text"}
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    disabled={true}
                    value={toWords.convert(Number(f.values.loanInNumber))}
                    error={f.touched.loanInWords && f.errors.loanInWords}
                    icon={<Wallet className="w-4 text-indigo-500" />}
                    label={""}
                    placeholder={"Loan Amount in words"}
                  />
                  <span className="flex items-center justify-between w-full gap-8">
                    <Input
                      name="loanYear"
                      type={"number"}
                      onChange={f.handleChange}
                      onBlur={f.handleBlur}
                      value={f.values.loanYear}
                      error={f.touched.loanYear && f.errors.loanYear}
                      icon={<Calendar className="w-4 text-indigo-500" />}
                      label={""}
                      placeholder={"Loan Year"}
                    />
                    <Input
                      name="loanMonth"
                      type={"text"}
                      onChange={f.handleChange}
                      onBlur={f.handleBlur}
                      value={12 * f.values.loanYear + " Months"}
                      disabled={true}
                      icon={<Calendar className="w-4 text-indigo-500" />}
                      label={""}
                      placeholder={"In Month"}
                    />
                  </span>
                </div>
              ) : (
                // <Select
                //   onChange={f.handleChange}
                //   name={"customerId"}
                //   value={f.values.customerId}
                //   onBlur={f.handleBlur}
                //   error={f.touched.customerId && f.errors.customerId}
                //   label={""}
                //   icon={<BiIdCard className="w-4 text-indigo-500" />}
                // >
                //   <option value={" "}>Select the Customer</option>
                //   {customers.data?.map((a) => (
                //     <option
                //       key={a.id}
                //       value={a.id}
                //     >{`${a.name} (${a.customerId})`}</option>
                //   ))}
                // </Select>
                <ComboBox
                  people={customers.data?.map((a) => ({
                    id: a.id,
                    name: `${a.name}`,
                  }))}
                  onChange={(e) => {
                    console.log(e);
                    f.setValues((prev) => ({
                      ...prev,
                      customerId: e,
                    }));
                  }}
                  name={"customerId"}
                  placeholder={"Select Customer"}
                  value={f.values.customerId}
                  onBlur={f.handleBlur}
                  error={f.touched.customerId && f.errors.customerId}
                  icon={<BiIdCard className="w-4 text-indigo-500" />}
                />
              )}
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
        url: `api/welcome-letter`,
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
      Header: "Customer id",
      accessor: (c) => c?.for?.customerId,
    },
    {
      Header: "Customer name",
      accessor: (c) => c?.for?.name,
    },
    {
      Header: "Charge",
      accessor: (c) => c.charge,
    },

    {
      Header: "Agent",
      accessor: (c) =>
        c?.with.firstName +
        " " +
        c?.with.LastName +
        " (" +
        c?.with.employeeCode +
        ")",
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
                document={
                  <PdfFile
                    data={agents.data[download]}
                    general={general}
                    imgUrl={general.data.url}
                  />
                }
                fileName={`${agents.data[download].for.name}.pdf`}
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
        <PdfFile
          data={agents.data[0]}
          general={general}
          imgUrl={general.data.url}
        />
      </PDFViewer> */}
      <ConfirmationModal
        description="Do you really want to delete this letter?"
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
            url: `api/welcome-letter/${confirmModal.id}`,
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
      {/* <p className="text-justify"></p> */}
      <Table
        btnText={"Generate Letter"}
        btnfunc={() =>
          setModal((prev) => ({
            state: true,
            data: initialModalState.data,
            edit_id: initialModalState.edit_id,
          }))
        }
        title="Welcome Letters"
        subtitle={"All generated welcome letter"}
        dataName={"letters"}
        data={agents.data}
        columns={columns()}
      />
    </>
  );
}

export default WelcomeLetter;
