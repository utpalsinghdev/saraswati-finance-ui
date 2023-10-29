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
//         size="A7"
//         style={{
//           position: "relative",
//         }}
//       >
//         <View style={{}}>
//           <Image src={"/icardBanner.png"} />
//         </View>
//         <View
//           style={{
//             fontFamily: "Helvetica",
//             position: "relative",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: 2,
//             justifyContent: "center",
//           }}
//         >
//           <Image
//             style={{
//               marginTop: 4,
//               width: 80,
//               height: 80,
//               marginBottom: 2,
//             }}
//             src={data?.profilepic}
//           />
//           <Text
//             style={{
//               fontSize: 8,
//               textAlign: "left",
//               borderBottom: "1px solid blue",
//               paddingBottom: 2,
//             }}
//           >
//             {data.agent.firstName} {data.agent.LastName}
//           </Text>
//           <Text
//             style={{
//               width: 100,
//               marginLeft: 20,
//               fontSize: 8,
//               textAlign: "left",
//             }}
//           >
//             Designation :{data.agent.designation}
//           </Text>
//           <Text
//             style={{
//               width: 100,
//               marginLeft: 20,
//               fontSize: 8,
//               textAlign: "left",
//             }}
//           >
//             Code :{data.agent.employeeCode}
//           </Text>
//           <Text
//             style={{
//               width: 100,
//               marginLeft: 20,
//               fontSize: 8,
//               textAlign: "left",
//             }}
//           >
//             Location : {data.location}
//           </Text>
//           <Text
//             style={{
//               width: 100,
//               marginLeft: 20,
//               fontSize: 8,
//               textAlign: "left",
//             }}
//           >
//             Mobile :{data.agent.phone}
//           </Text>
//           <Image
//             style={{
//               position: "absolute",
//               bottom: -57,
//               right: 0,
//               left: 0,
//               zIndex: -1,
//               width: "100%",
//             }}
//             src={"/icardFooter.png"}
//           />
//           <Image
//             style={{
//               position: "absolute",
//               top: 40,
//               right: 40,
//               width: 100,
//               height: 50,
//               zIndex: 0,
//               opacity: 0.1,
//               transform: "rotate(-45deg)",
//             }}
//             src={
//               "https://res.cloudinary.com/dedbpyhmr/image/upload/v1692499335/logo_zizin9.png"
//             }
//           />
//         </View>
//         <Image
//           src={"/stamp.png"}
//           style={{
//             position: "absolute",
//             top: 160,
//             left: 60,
//             width: 25,
//             height: 25,
//           }}
//         />
//       </Page>
//     </Document>
//   );
// };
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
              <Select
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
                  >{`${a.firstName} ${a.LastName} (${a.employeeCode})`}</option>
                ))}
              </Select>
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
          className="relative  w-60 h-96 bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src="/logo_without_name.png"
            alt="watermark"
            className="absolute top-24  left-4 w-52 h-52 opacity-10 "
          />
          <img src={"/pdfBanner.png"} alt="banner" className="w-full" />

          <img
            src={"/pdfFooter.png"}
            alt="footerbanner"
            className="absolute w-full bottom-0 z-0 "
          />
          <img
            src={"/logo_full.png"}
            alt="footerbanner"
            className="w-full h-16 px-2 "
          />
          <img
            src={IcardData?.agent?.profilePic}
            alt="Employee"
            className="w-24 h-28 mx-auto mb-2 relative z-10 p-0.4 border-2 border-[#3E4759] "
          />
          <img
            src={"/stamp.png"}
            alt="Employee"
            className="w-[90px] h-[75px]  z-10 absolute top-[11.5rem] left-8 "
          />
          <h2 className="text-md font-bold italic text-center uppercase  tracking-wide  text-black">
            {IcardData?.agent?.firstName} {IcardData?.agent?.LastName}
          </h2>
          <div
            style={{
              fontSize: "10px",
              lineHeight: "14px",
            }}
            className="uppercase flex flex-col gap-2 text-black font-semibold italic  text-center"
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
          <Badge
            onClick={() => {
              setPrevModal((prev) => ({
                edit_id: cell.row.original.id,
                state: true,
              }));
            }}
            type={enums.BLUE}
          >
            {/* {download === cell.row.index ? (
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
            )} */}
            Preview
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
      {prevIcardModal()}
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
