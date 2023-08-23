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
const USER_ROLES = {
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  CLINICAL_ASSISTANT: "CLINICAL_ASSISTANT",
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
];
const Authro = [
  {
    link: "/admin/login/",
    Auth: ["ADMIN"],
    comp: <AdminLogin />,
  },
];

function RoutesConfig() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Homepage />} />\
          {ro.map((r, idx) => (
            <Route key={idx} path={r.link} element={r.com} />
          ))}
          <Route path="*" element={<NotFound />} />
        </Route>
        {Cookie.get("gafs_user")
          ? Authro.filter(
              (a) =>
                !a.Auth.includes(
                  JSON?.parse(Cookie?.get("gafs_user")).user.role
                )
            ).map((r, idx) => (
              <Route key={idx} path={r.link} element={r.comp} />
            ))
          : Authro.map((r, idx) => (
              <Route key={idx} path={r.link} element={r.comp} />
            ))}
        <Route element={<ProtectedRoute />}>
          <Route element={<AccessControl allowedRoles={[USER_ROLES.ADMIN]} />}>
            <Route path="/admin/dashboard/" element={<DashboardHome />} />
            <Route path="/admin/news/" element={<News />} />
            <Route
              path="/admin/job-applications/"
              element={<CarrerApplications />}
            />
            <Route path="/admin/agents/" element={<Agents />} />
            <Route path="/admin/loan-applications/" element={<LoanApplication />} />
            <Route path="/admin/customers/" element={<Cutomers />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
export default RoutesConfig;
