import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import PreNavbar from "../components/Navbar/PreNavbar";
import PostFooter from "../components/Footer/PostFooter";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import About from "../pages/About";
import Contact from "../pages/Contact";

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
      </Routes>
      <Footer />
      <PostFooter />
    </Router>
  );
}
export default RoutesConfig;