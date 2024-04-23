import React, { useEffect, useState, useRef } from "react";
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
} from "@react-pdf/renderer";
import Modal from "../../../components/ui/modal";
import { Formik } from "formik";
import ApiService from "../../../services/Api_services";
import { toast } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import Select from "../../../components/ui/select";
import { BiIdCard } from "react-icons/bi";
import Button from "../../../components/ui/button";
import Input from "../../../components/ui/input";
import Badge, { enums } from "../../../components/ui/badge";
import ConfirmationModal from "../../../components/confirmationModal";
import Table from "../../../components/ui/table/Table";
import { ImagePlus } from "lucide-react";
import { GoLocation } from "react-icons/go";
import { generateIcard } from "../../../schemas";
import Loader from "../../../components/loader";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import "../../../arton.css";
import moment from "moment";
import ComboBox from "../../../components/ui/comboBox";
import metaData from "../../../utils/lib/site.config";
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
const PreviewModalState = {
  state: false,
  edit_id: "",
};

// const PdfFile = ({ data }) => {
//   return (
//     <Document>
//       <Page
//         size="A4"
//         style={{
//           position: "relative",
//         }}
//       >
//         <View
//           wrap={false}
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "center",
//             alignItems: "center",
//             width: "100%",
//             height: "100%",
//           }}
//         >
//           <Image
//             src={"/icardTemplate.png"}
//             style={{
//               height: 500,
//               width: "auto",
//               // borderRadius: 10,
//             }}
//           />
//           <Image
//             src={data?.agent?.profilePic}
//             style={{
//               position: "absolute",
//               top: 340,
//               left: 250,
//               height: 120,
//               width: 100,
//             }}
//           />
//           <Image
//             src={"/stamp.png"}
//             style={{
//               position: "absolute",
//               top: 400,
//               left: 210,
//               height: 70,
//             }}
//           />
//           <Text
//             style={{
//               position: "absolute",
//               top: 490,
//               // left: "50%",
//               transform: "translateX(-10%)",
//               fontSize: 20,
//               fontWeight: "bold",
//               fontFamily: "Roboto",
//             }}
//           >
//             {data?.agent?.firstName} {data?.agent?.LastName}
//           </Text>
//           <Text
//             style={{
//               position: "absolute",
//               top: 518,
//               // left: "50%",
//               left: 295,
//               fontSize: 18,
//               fontWeight: "bold",
//               fontFamily: "Roboto",
//             }}
//           >
//             {data?.agent?.employeeCode}
//           </Text>
//           <Text
//             style={{
//               position: "absolute",
//               top: 542,
//               // left: "50%",
//               left: 295,
//               fontSize: 18,
//               fontWeight: "bold",
//               fontFamily: "Roboto",
//             }}
//           >
//             {data?.agent?.designation}
//           </Text>
//           <Text
//             style={{
//               position: "absolute",
//               top: 563,
//               // left: "50%",
//               left: 295,
//               fontSize: 18,
//               fontWeight: "bold",
//               fontFamily: "Roboto",
//             }}
//           >
//             {data?.location}
//           </Text>
//           <Text
//             style={{
//               position: "absolute",
//               top: 586,
//               // left: "50%",
//               left: 295,
//               fontSize: 18,
//               fontWeight: "bold",
//               fontFamily: "Roboto",
//             }}
//           >
//             {data?.agent?.phone}
//           </Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };
const PdfFile = ({ data }) => {
  return (
    <Document>
      <Page
        size="A4"
        style={{
          position: "relative",
        }}
      >
        <View style={{}}>
          <Image src={"/pdfBanner.png"} />
        </View>
        <View
          style={{
            fontFamily: "Helvetica",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Image
            style={{
              marginTop: 2,
              marginRight: 150,
              width: "100%",
              paddingHorizontal: 30,
              height: 100,
              marginBottom: 2,
            }}
            src={"/logo_without_new.jpg"}
          />
          <Image
            style={{
              width: 200,
              height: 230,
            }}
            src={data.profilepic || data.agent.profilePic}
          />
          <Text
            style={{
              marginTop: 20,
              fontSize: 36,
              textAlign: "left",
              paddingBottom: 2,
            }}
          >
            {data.agent.firstName} {data.agent.LastName}
          </Text>
          <View
            style={{
              display: "flex",
              marginTop: 10,
              flexDirection: "row",
              // paddingHorizontal: 180,
              paddingLeft: 180,
              width: "100%",
              justifyContent: "space-start",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                width: 138,
              }}
            >
              Designation
            </Text>
            <Text style={{ width: "100%" }}>: {data.agent.designation}</Text>
          </View>
          <View
            style={{
              display: "flex",
              marginTop: 10,
              flexDirection: "row",
              paddingLeft: 180,
              width: "100%",
              justifyContent: "space-start",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                width: 138,
              }}
            >
              Location
            </Text>
            <Text style={{ width: "100%" }}>: {data.location}</Text>
          </View>
          <View
            style={{
              display: "flex",
              marginTop: 10,
              flexDirection: "row",
              paddingHorizontal: 180,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                width: 100,
              }}
            >
              Code
            </Text>
            <Text style={{ width: 130 }}>: {data.agent.employeeCode}</Text>
          </View>
          <View
            style={{
              display: "flex",
              marginTop: 10,
              flexDirection: "row",
              paddingHorizontal: 180,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                width: 100,
              }}
            >
              Mobile
            </Text>
            <Text style={{ width: 130 }}>: {data.agent.phone}</Text>
          </View>

          {/* <View
            style={{
              display: "flex",
              flexDirection: "row",
              marginHorizontal: 110,
            }}
          >
            <Text
              style={{
                textAlign: "left",
                width: 100,
              }}
            >
              Code
            </Text>
            <Text>{data.agent.employeeCode}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                width: 100,
              }}
            >
              Location
            </Text>
            <Text>{data.location}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                width: 100,
              }}
            >
              Mobile
            </Text>
            <Text>{data.agent.phone}</Text>
          </View> */}
          {/* 
          <Image
            style={{
              position: "absolute",
              bottom: -57,
              right: 0,
              left: 0,
              zIndex: -1,
              width: "100%",
            }}
            src={"/pdfFooter.png"}
          /> */}
          <Image
            style={{
              position: "absolute",
              top: 240,
              right: 70,
              width: 500,
              // height: 400,
              zIndex: 0,
              opacity: 0.1,
            }}
            src={"/logo_without_name.png"}
          />
        </View>
        <Image
          src={"/stamp.png"}
          style={{
            position: "absolute",
            top: 420,
            left: 140,
            width: 130,
            height: 130,
          }}
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
    profilepic: "",
    location: "",
  },
};

export default function Icard() {
  const [download, setDownload] = useState();
  const cardRef = useRef(null);

  const handleDownload = () => {
    const card = cardRef.current;

    html2canvas(card).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, "i-card.png");
      });
    });
  };
  const [modal, setModal] = useState(initialModalState);
  const [prevModal, setPrevModal] = useState(PreviewModalState);
  const [agents, setDatas] = useState({
    loading: true,
    data: [],
  });
  const [confirmModal, setConfirmModal] = useState({
    state: false,
    id: null,
  });

  const employees = useFetch("api/agent/employee");
  function renderModal() {
    const { state, edit_id, data } = modal;

    return agents.loading ? (
      <Loader />
    ) : (
      <Modal
        title={"Generate I Card"}
        open={state}
        setOpen={() => setModal(initialModalState)}
      >
        <Formik
          enableReinitialize={true}
          validationSchema={generateIcard}
          initialValues={data}
          onSubmit={async (values, action) => {
            const payload = {
              employeeId: values.employeeId ? Number(values.employeeId) : "",
              location: values.location,
            };

            try {
              const res = await ApiService.fetchData({
                url: `api/icard`,
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
              {/* <Select
                onChange={f.handleChange}
                name={"employeeId"}
                value={f.values.employeeId}
                onBlur={f.handleBlur}
                error={f.touched.employeeId && f.errors.employeeId}
                label={""}
                icon={<BiIdCard className="w-4 text-indigo-500" />}
              >
                <option value={" "}>Select a agent</option>
                {employees.data.map((a) => (
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
  function prevIcardModal() {
    const { state, edit_id, data } = prevModal;
    const IcardData = edit_id
      ? agents.data.find((i) => i.id === Number(edit_id))
      : {};
    return agents.loading ? (
      <Loader />
    ) : (
      <Modal
        title={""}
        size="max-w-[300px]"
        open={state}
        setOpen={() => setPrevModal(PreviewModalState)}
      >
        <div
          id="i-card"
          ref={cardRef}
          className="relative border-l-2 border-r-2 border-t-2 border-[#5FBDFF]  w-60 h-96 bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src="/watermark.png"
            alt="watermark"
            className="absolute top-36   opacity-20 "
          />
          <img src={"/pdfBanner.png"} alt="banner" className="w-full" />

          <img
            src={"/pdfFooter.png"}
            alt="footerbanner"
            className="absolute w-full bottom-0 z-0 "
          />
          {/* <img
            src={"/logo_full.png"}
            alt="footerbanner"
            className="w-full h-16 px-2 "
          /> */}
          {/* <span className="w-full h-14 px-2 text-center flex flex-col font-semibold">
            <p className="text-green-800">Fundwisor Finance Business Solution</p>
            <p className="text-yellow-800">Pvt Ltd</p>
          </span> */}
          <img
            src={IcardData?.agent?.profilePic}
            alt="Employee"
            className="w-24 h-28 mt-8 mx-auto mb-2 relative z-10 p-0.4 border-2 border-[#3E4759] "
          />
          <img
            src={"/stamp.png"}
            alt="Employee"
            className=" h-[70px]  z-10 absolute top-[10.5rem] left-6 "
          />
          <h2 className="text-md font-bold italic text-center uppercase  tracking-wide  text-black">
            {IcardData?.agent?.firstName} {IcardData?.agent?.LastName}
          </h2>
          <div
            style={{
              fontSize: "10px",
              lineHeight: "14px",
            }}
            className="uppercase flex flex-col gap-1 text-black font-semibold italic  text-center"
          >
            <span className="flex items-center justify-between gap-1 border-black mx-8 font-semibold">
              <p className="w-[70px]   text-left flex items-center justify-between">
                Agent Code
              </p>
              <p className="w-[90px]  text-left">
                : {IcardData?.agent?.employeeCode}
              </p>
            </span>
            <span className="flex items-center justify-between mx-8 gap-1 font-semibold">
              <p className="w-[70px]  text-left">Designation </p>
              <p className="w-[90px]   text-left">
                : {IcardData?.agent?.designation}
              </p>
            </span>
            <span className="flex items-center justify-between gap-1  mx-8 font-semibold">
              <p className="w-[70px]  text-left">Location </p>
              <p className="w-[90px]  text-left">: {IcardData.location}</p>
            </span>
            <span className="flex items-center justify-between gap-1  mx-8 font-semibold">
              <p className="w-[70px]  text-left">Mobile </p>
              <p className="w-[90px]  text-left">: {IcardData?.agent?.phone}</p>
            </span>
          </div>
        </div>
      </Modal>
    );
  }

  useEffect(() => {
    FetchNews();
  }, []);
  async function FetchNews() {
    try {
      const res = await ApiService.fetchData({
        url: `api/icard`,
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
        c?.agent.firstName +
        " " +
        c?.agent.LastName +
        " (" +
        c?.agent.employeeCode +
        ")",
    },
    {
      Header: "location",
      accessor: (c) => c.location,
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
          {metaData.icardIsPdf ? (
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
                  fileName={`i-card-${
                    agents.data[download].agent.firstName +
                    " " +
                    agents.data[download].agent.LastName
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
          ) : (
            <Badge
              onClick={() => {
                setPrevModal((prev) => ({
                  edit_id: cell.row.original.id,
                  state: true,
                }));
              }}
              type={enums.BLUE}
            >
              Preview
            </Badge>
          )}
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
      {prevIcardModal()}
      {/* <PDFViewer height={1000} width={600}>
        <PdfFile data={agents.data[agents.data.length - 1]} />
      </PDFViewer> */}
      <ConfirmationModal
        description="Do you really want to delete this This ICard?"
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
            url: `api/icard/${confirmModal.id}`,
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
        btnText={"Generate Icard"}
        btnfunc={() =>
          setModal((prev) => ({
            state: true,
            data: initialModalState.data,
            edit_id: initialModalState.edit_id,
          }))
        }
        title="Icards"
        subtitle={"All generated Icards"}
        dataName={"icards"}
        data={agents.data}
        columns={columns()}
      />
    </>
  );
}
