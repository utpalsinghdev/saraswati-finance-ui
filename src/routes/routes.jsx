import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Homepage from "../pages/Homepage";
import PreNavbar from "../components/Navbar/PreNavbar";
import PostFooter from "../components/Footer/PostFooter";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Faqs from "../pages/Faqs";
import Calculator from "../pages/Calculator";
import ApplyLoan from "../pages/ApplyLoan";
import AntiFraudPolicy from "../pages/AntiFraudPolicy";
import TermAndCondition from "../pages/TermAndCondition";
import Career from "../pages/Career";
import Loan from "../pages/Loan";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoutes";
import DashboardHome from "../pages/dashboard/home";
import News from "../pages/dashboard/news";
import AdminLogin from "../pages/Auth/AdminLogin";
import Cookie from "js-cookie";
import AccessControl from "./AccessControl";
import CarrerApplications from "../pages/dashboard/careerApplication";
import Agents from "../pages/dashboard/agents";
import LoanApplication from "../pages/dashboard/loanApplication";
import Cutomers from "../pages/dashboard/Customer";
import AgentLogin from "../pages/Auth/AgentLogin";
import HomeAgent from "../pages/agent/home";
import WelcomeLetter from "../pages/dashboard/welcomeLetter";
import Icard from "../pages/dashboard/icard";
import Appointment from "../pages/dashboard/salaryAppointment";
import ApprovalLetter from "../pages/dashboard/approvalLetter";
import WelcomeInvoice from "../pages/dashboard/welcomeInvoice";
import ApprovalInvoice from "../pages/dashboard/approvalInvoice";
import AgentLogs from "../pages/agent/agents";
import AgentWelcome from "../pages/agent/welcomeLetters";
import ApprovalLetteragemt from "../pages/agent/approval";
import ApprovalCustomers from "../pages/agent/customers";
import JointPercent from "../pages/dashboard/jointpercent";
import Customerlogin from "../pages/Auth/Customerlogin";
import CustomerHome from "../pages/dashboard/customerHome";
import Profile from "../pages/profile";
import Edit from "../pages/profile/Edit";
import OurAgents from "../pages/OurAgents";
import { QrCode } from "lucide-react";
import Qr from "../pages/dashboard/payment/Qr";
import Verify from "../pages/Verify";
import Pay from "../pages/Pay";
import CustomerProfile from "../pages/dashboard/Customer/Customer";
import AgentSheeet from "../pages/dashboard/agents/AttendenceSheet";
import PunchIN from "../pages/profile/Punch";
import Agreement from "../pages/dashboard/Agreement";
const USER_ROLES = {
  ADMIN: "ADMIN",
  AGENT: "AGENT",
  FEILDOFFICER: "FEILDOFFICER",
  DEALERSHIP: "DEALERSHIP",
  CUSTOMER: "CUSTOMER",
  RECEPTION_MANAGER: "RECEPTION_MANAGER",
  CLINICAL_ADMIN: "CLINICAL_ADMIN",
  PLAN_MAKER: "PLAN_MAKER",
};

function PublicLayout() {
  return (
    <>
      <PreNavbar />
      <Navbar />
      <Outlet />
      <Footer />
      <PostFooter />
    </>
  );
}

const ro = [
  {
    link: "about-us",
    com: <About />,
  },
  {
    link: "contact-us",
    com: <Contact />,
  },
  {
    link: "faqs",
    com: <Faqs />,
  },
  {
    link: "loan-calculator",
    com: <Calculator />,
  },
  {
    link: "apply-loan",
    com: <ApplyLoan />,
  },
  {
    link: "anti-fraud-policy",
    com: <AntiFraudPolicy />,
  },
  {
    link: "terms-and-conditions",
    com: <TermAndCondition />,
  },
  {
    link: "career",
    com: <Career />,
  },
  {
    link: "services/:slug",
    com: <Loan />,
  },
  // {
  //   link: "our-agents",
  //   com: <OurAgents />,
  // },
  {
    link: "/pay",
    com: <Pay />,
  },
  {
    link: "verify-agent",
    com: <Verify />,
  },
];
const Authro = [
  {
    link: "/admin/login/",
    Auth: ["ADMIN"],
    comp: <AdminLogin />,
  },
  {
    link: "/agent/login/",
    Auth: ["AGENT", "DEALERSHIP", "FEILDOFFICER"],
    comp: <AgentLogin />,
  },
  {
    link: "/c/login",
    Auth: ["ADMIN"],
    comp: <Customerlogin />,
  },
];

function RoutesConfig() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Homepage />} />\
          {ro?.map((r, idx) => (
            <Route key={idx} path={r.link} element={r.com} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
        {Authro?.map((r, idx) => (
          <Route key={idx} path={r.link} element={r.comp} />
        ))}
        <Route element={<ProtectedRoute />}>
          <Route element={<AccessControl allowedRoles={[USER_ROLES.ADMIN]} />}>
            <Route path="/admin/dashboard/" element={<DashboardHome />} />
            <Route path="/admin/welcome-letter/" element={<WelcomeLetter />} />
            <Route
              path="/admin/welcome-invoice/"
              element={<WelcomeInvoice />}
            />
            <Route
              path="/admin/approval-invoice/"
              element={<ApprovalInvoice />}
            />
            <Route
              path="/admin/approval-letter/"
              element={<ApprovalLetter />}
            />
            <Route
              path="/admin/joint-percent-letter/"
              element={<JointPercent />}
            />
            <Route
              path="/admin/agreement/"
              element={<Agreement />}
            />
            <Route path="/admin/i-card/" element={<Icard />} />
            <Route
              path="/admin/appointment-letter/"
              element={<Appointment />}
            />
            <Route path="/admin/news/" element={<News />} />
            <Route path="/admin/agent-attendance/" element={<AgentSheeet />} />
            <Route
              path="/admin/job-applications/"
              element={<CarrerApplications />}
            />
            <Route path="/admin/agents/" element={<Agents />} />
            <Route
              path="/admin/loan-applications/"
              element={<LoanApplication />}
            />
            <Route path="/admin/customers/" element={<Cutomers />} />
            <Route path="/admin/customer/:id" element={<CustomerProfile />} />
            <Route path="/admin/payment-method/" element={<Qr />} />
          </Route>
          <Route
            element={
              <AccessControl
                allowedRoles={[
                  USER_ROLES.AGENT,
                  USER_ROLES.FEILDOFFICER,
                  USER_ROLES.DEALERSHIP,
                ]}
              />
            }
          >
            <Route path="/agent/home/" element={<HomeAgent />} />
            <Route path="/agent/agents/" element={<AgentLogs />} />
            <Route path="/agent/welcome/" element={<AgentWelcome />} />
            <Route path="/agent/approval/" element={<ApprovalLetteragemt />} />
            <Route path="/agent/customer/" element={<ApprovalCustomers />} />
            <Route path="/profile/me" element={<Profile />} />
            <Route path="/agent/punch-in" element={<PunchIN />} />
            <Route path="profile/me/edit" element={<Edit />} />
          </Route>

          <Route
            element={<AccessControl allowedRoles={[USER_ROLES.CUSTOMER]} />}
          >
            <Route path="/home" element={<CustomerHome />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default RoutesConfig;
