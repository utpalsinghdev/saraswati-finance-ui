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
import metaData from "../../../utils/lib/site.config";
import { PdfFile as WelcomeLetter } from "../welcomeLetter";
import { PdfFile as WelcomeInvoice } from "../welcomeInvoice";
import { PdfFile as PdfApprovalInvoiceFile } from "../approvalInvoice";
import { PdfFile as ApprovalLetterTemplate } from "../approvalLetter";
import ApiService from "../../../services/Api_services";
import toast from "react-hot-toast";
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
  const init = {
    welcome: false,
    ApprovalL: false,
    weli: false,
    api: false,
  };

  const [generate, setGenerate] = useState(init);

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
                    document={
                      <WelcomeLetter
                        data={welcome}
                        general={general}
                        imgUrl={general.data.url}
                      />
                    }
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
                    document={<ApprovalLetterTemplate data={approvalletter} />}
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
                    document={<WelcomeInvoice data={latestWelcome} />}
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
