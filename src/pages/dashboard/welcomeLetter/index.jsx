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
Font.register({
  family: "Roboto",
  fonts: [{ src: bold, fontWeight: "bold" }],
});
const PdfFile = ({ data }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          paddingBottom: 25,
        }}
      >
        <View style={{}}>
          <Image src={"/pdfBanner.png"} />
        </View>
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
              textAlign: "center",
              color: "black",
              marginTop: 20,
              fontSize: 18,
              letterSpacing: 1,
              fontFamily: "Roboto",
            }}
          >
            WELCOME LETTER
          </Text>
          <Text
            style={{
              textAlign: "right",
              color: "orange",
              fontSize: 12,
              fontWeight: "light",
            }}
          >
            Date : {data.createdAt.split("T")[0]}
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "red",
              marginTop: 15,
              fontSize: 12,
              fontWeight: "light",
            }}
          >
            Dear Sir / Madam
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 10,
              fontSize: 12,
              fontWeight: "light",
            }}
          >
            You have filled the following details :
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
                Applicant Name
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
                {data.for.name}
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
                {data.for.guardian_relation === "SONOF" ||
                data.for.guardian_relation === "DOF"
                  ? "Father Name"
                  : "Husband Name"}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  fontSize: 12,
                  padding: 5,
                  fontWeight: "extrabold",
                  textTransform: "uppercase",
                }}
              >
                {data.for.guardian_name}
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
                  width: 130,
                }}
              >
                Applicant Mobile
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  borderRight: "1px solid black",
                  fontSize: 12,
                  padding: 5,
                  width: 140,
                  fontWeight: "extrabold",
                }}
              >
                {data.for.phone}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  fontSize: 12,
                  fontWeight: "light",
                  borderRight: "1px solid black",
                  padding: 5,
                  width: 110,
                }}
              >
                Application No
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  fontSize: 12,
                  padding: 5,
                  fontWeight: "extrabold",
                }}
              >
                {data.for.customerId}
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
                  width: 130,
                }}
              >
                Loan Amount
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  fontSize: 12,
                  padding: 5,
                  fontWeight: "extrabold",
                  width: 350,
                }}
              >
                Rs. {data.for.loanInNumber}/- ({data.for.loanInWords})
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
                  width: 130,
                }}
              >
                Loan Year
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  borderRight: "1px solid black",
                  fontSize: 12,
                  padding: 5,
                  width: 140,
                  fontWeight: "extrabold",
                }}
              >
                {data.for.loanYear} Years
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  fontSize: 12,
                  fontWeight: "light",
                  borderRight: "1px solid black",
                  padding: 5,
                  width: 110,
                }}
              >
                Loan Month
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 12,
                  padding: 5,
                  fontWeight: "extrabold",
                }}
              >
                {data.for.loanYear * 12} Months
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
                  width: 130,
                }}
              >
                Monthly EMI
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "red",
                  borderRight: "1px solid black",
                  fontSize: 12,
                  padding: 5,
                  width: 140,
                  fontWeight: "extrabold",
                }}
              >
                Rs.
                {calculateEMI(data.for.loanInNumber, 5, data.for.loanYear)?.emi}
                /month
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  fontSize: 12,
                  fontWeight: "light",
                  borderRight: "1px solid black",
                  padding: 5,
                  width: 110,
                }}
              >
                File Charge
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "red",
                  fontSize: 12,
                  padding: 5,
                  fontWeight: "extrabold",
                }}
              >
                Rs. {data.charge}/-
              </Text>
            </View>
          </View>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 15,
              fontSize: 10,
              fontWeight: "light",
            }}
          >
            You documents received, and those are appropriate docs according to
            our legal adviser, behalf of your documents by{" "}
            <Text
              style={{
                textAlign: "left",
                color: "black",
                marginTop: 15,
                fontSize: 10,
                fontFamily: "Roboto",
              }}
            >
              VANDHNAM FINANCE PVT. LTD.
            </Text>
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 12,
              fontSize: 10,
              fontWeight: "light",
            }}
          >
            You documents are passed by our legal deparment and now you have to
            pay file charge (login Charge) for the loan, only in the account of
            our company.
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 12,
              fontSize: 10,
              marginLeft: 10,
              fontWeight: "light",
            }}
          >
            1. Applicant should not deposit money in any of these following
            working (person, lawyer, agent) or else company would not be
            responsible for it
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 6,
              fontSize: 10,
              marginLeft: 10,
              fontWeight: "light",
            }}
          >
            2. Every signed paper of the the offer letter as well as required
            paper processing fees has to be send to the company
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 6,
              fontSize: 10,
              marginLeft: 10,
              fontWeight: "light",
            }}
          >
            3. Immediately send the cash deposit slip at company&apos;s email
            I.D.{" "}
            <Text
              style={{
                fontFamily: "Roboto",
              }}
            >
              info@vandhnamservices.com
            </Text>
          </Text>
          <Text
            style={{
              textAlign: "left",
              color: "black",
              marginTop: 6,
              fontSize: 10,
              marginLeft: 10,
              fontWeight: "light",
            }}
          >
            4. Signature or thumb impression is compulsory in every page
          </Text>
          <View>
            <View>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  marginTop: 20,
                  fontSize: 12,
                  fontWeight: "light",
                }}
              >
                If you have any query
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  marginTop: 20,
                  fontSize: 12,
                  fontWeight: "light",
                }}
              >
                Contact: {data.with.title} {data.with.firstName}{" "}
                {data.with.LastName}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  fontSize: 12,
                  fontWeight: "light",
                }}
              >
                Contact No: {data.with.phone}
              </Text>
              <Text
                style={{
                  textAlign: "left",
                  color: "black",
                  marginTop: 18,
                  fontSize: 12,
                  fontWeight: "light",
                }}
              >
                Signature of Lonee......................
              </Text>
            </View>
            <Image
              src={"/stamp.png"}
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 100,
                height: 100,
              }}
            />
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
    charge: "4130",
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
                {employees.data.map((a) => (
                  <option
                    key={a.id}
                    value={a.id}
                  >{`${a.firstName} ${a.LastName} (${a.employeeCode})`}</option>
                ))}
              </Select>

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
                <Select
                  onChange={f.handleChange}
                  name={"customerId"}
                  value={f.values.customerId}
                  onBlur={f.handleBlur}
                  error={f.touched.customerId && f.errors.customerId}
                  label={""}
                  icon={<BiIdCard className="w-4 text-indigo-500" />}
                >
                  <option value={" "}>Select the Customer</option>
                  {customers.data.map((a) => (
                    <option
                      key={a.id}
                      value={a.id}
                    >{`${a.name} (${a.customerId})`}</option>
                  ))}
                </Select>
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
