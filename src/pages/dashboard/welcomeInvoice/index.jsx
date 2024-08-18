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
  generateWelcomeInvoice,
  generateWelcomeLetter,
} from "../../../schemas";
import useFetch from "../../../hooks/useFetch";
import Input from "../../../components/ui/input";
import Loader from "../../../components/loader";
import { GoCrossReference } from "react-icons/go";
import { MdDescription, MdProductionQuantityLimits } from "react-icons/md";
import bold from "../../../assets/bold.ttf";
import moment from "moment";
import ComboBox from "../../../components/ui/comboBox";
Font.register({
  family: "Roboto",
  fonts: [{ src: bold, fontWeight: "bold" }],
});
export const PdfFile = ({ data }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          paddingBottom: 35,
          fontFamily: "Roboto",
          borderLeft: "5px solid #052541",
          borderRight: "5px solid #052541",
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
    desciption: "",
    customerId: "",
    total: "",
    qty: "",
    price: "",
    paymentMethod: "",
    refence: "",
  },
};
function WelcomeInvoice() {
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
        title={"Generate Welcome Invoice"}
        open={state}
        setOpen={() => setModal(initialModalState)}
      >
        <Formik
          enableReinitialize={true}
          validationSchema={generateWelcomeInvoice}
          initialValues={data}
          onSubmit={async (values, action) => {
            try {
              const payload = {
                ...values,
                qty: Number(values.qty),
                total: Number(values.total),
                price: Number(values.price),
                customerId: Number(values.customerId),
              };
              const res = await ApiService.fetchData({
                url: `api/invoice`,
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
              {/* {console.log(f.errors)}
              <Select
                label={""}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                name={"customerId"}
                value={f.values.customerId}
                error={f.touched.customerId && f.errors.customerId}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              >
                <option value={" "}>Select a Customer</option>
                {customers.data?.map((a) => (
                  <option key={a.id} value={a.id}>
                    {`${a.name} (${a.customerId})`}
                  </option>
                ))}
              </Select> */}
              <ComboBox
                people={customers.data?.map((a) => ({
                  id: a.id,
                  name: a.name,
                }))}
                onChange={(e) => {
                  console.log(e);
                  f.setValues((prev) => ({
                    ...prev,
                    customerId: e,
                  }));
                }}
                name={"customerId"}
                placeholder={"Select the Customer"}
                value={f.values.customerId}
                onBlur={f.handleBlur}
                error={f.touched.customerId && f.errors.customerId}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              />
              <Select
                label={""}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                name={"paymentMethod"}
                value={f.values.paymentMethod}
                error={f.touched.paymentMethod && f.errors.paymentMethod}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              >
                <option value={" "}>Select a Payment Method</option>
                <option value="ONLINE">ONLINE</option>
                <option value="CASH">CASH</option>
                <option value="CHECQUE">CHECQUE</option>
                <option value="NETBANKING">NETBANKING</option>
                <option value="UPI">UPI</option>
              </Select>

              <Input
                name="price"
                type={"number"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.price}
                error={f.touched.price && f.errors.price}
                icon={<BiRupee size={20} className="text-indigo-500" />}
                label={""}
                placeholder={"Price"}
              />
              <Input
                name="total"
                type={"number"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.total}
                error={f.touched.total && f.errors.total}
                icon={<BiRupee size={20} className="text-indigo-500" />}
                label={""}
                placeholder={"Total with GST"}
              />
              <Input
                name="qty"
                type={"number"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.qty}
                error={f.touched.qty && f.errors.qty}
                icon={
                  <MdProductionQuantityLimits
                    size={20}
                    className="text-indigo-500"
                  />
                }
                label={""}
                placeholder={"Qty"}
              />
              <Input
                name="refence"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.refence}
                error={f.touched.refence && f.errors.refence}
                icon={
                  <GoCrossReference size={20} className="text-indigo-500" />
                }
                label={""}
                placeholder={"Refrence"}
              />
              <Input
                name="desciption"
                type={"text"}
                onChange={f.handleChange}
                onBlur={f.handleBlur}
                value={f.values.desciption}
                error={f.touched.desciption && f.errors.desciption}
                icon={<MdDescription size={20} className="text-indigo-500" />}
                label={""}
                placeholder={"description"}
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
        url: `api/invoice`,
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
      Header: "invoice id",
      accessor: (c) => c?.invoiceId,
    },
    {
      Header: "Customer id",
      accessor: (c) => c?.customer?.customerId,
    },
    {
      Header: "Customer name",
      accessor: (c) => c?.customer?.name,
    },
    {
      Header: "total",
      accessor: (c) => "Rs. " + c.total,
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
              console.log(cell.row.index);
              setDownload(cell.row.index);
            }}
            type={enums.BLUE}
          >
            {download === cell.row.index ? (
              <PDFDownloadLink
                id="download"
                document={
                  <PdfFile
                    data={
                      agents.data.filter((a) => a?.recived === null)[download]
                    }
                  />
                }
                fileName={`${agents.data.filter((a) => a?.recived === null)[download]
                  .customer.name
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
        <PdfFile data={agents.data[1]} />
      </PDFViewer> */}
      <ConfirmationModal
        description="Do you really want to delete this Invoice?"
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
            url: `api/invoice/${confirmModal.id}`,
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
        btnText={"Generate Invoice"}
        btnfunc={() =>
          setModal((prev) => ({
            state: true,
            data: initialModalState.data,
            edit_id: initialModalState.edit_id,
          }))
        }
        title="Welcome Invoice"
        subtitle={"All generated welcome invoice"}
        dataName={"Invoices"}
        data={agents.data.filter((a) => a?.recived === null)}
        columns={columns()}
      />
    </>
  );
}

export default WelcomeInvoice;
