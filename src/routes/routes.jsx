import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "../pages/Homepage";
import PreNavbar from "../components/Navbar/PreNavbar";
import PostFooter from "../components/Footer/PostFooter";
import Navbar from "../components/Navbar/Navbar";

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
      </Routes>
      <PostFooter />
    </Router>
  );
}
export default RoutesConfig;