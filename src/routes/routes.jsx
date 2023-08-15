import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

// const USER_ROLES = {
//   SUPER_ADMIN: "SUPER_ADMIN",
//   DOCTOR: "DOCTOR",
//   CLINICAL_ASSISTANT: "CLINICAL_ASSISTANT",
//   RECEPTION_MANAGER: "RECEPTION_MANAGER",
//   CLINICAL_ADMIN: "CLINICAL_ADMIN",
//   PLAN_MAKER: "PLAN_MAKER",
// };

function RoutesConfig() {
  return (
    <Router>
      <PreNavbar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/loan-calculator" element={<Calculator />} />
        <Route path="/apply-loan" element={<ApplyLoan />} />
        <Route path="/anti-fraud-policy" element={<AntiFraudPolicy />} />
        <Route path="/terms-and-conditions" element={<TermAndCondition />} />
        <Route path="/career" element={<Career />} />
        <Route path="/services/:slug" element={<Loan />} />
        <Route path="*" element={<div>404</div> } />
      </Routes>
      <Footer />
      <PostFooter />
    </Router>
  );
}
export default RoutesConfig;
