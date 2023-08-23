import * as Yup from "yup";

export const sendMessageDto = Yup.object({
  name: Yup.string().required("Name is a required field"),
  email: Yup.string()
    .email("Please enter a valid Email address")
    .required("Please enter your email."),
  phone: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(10, "Phone number must be of maximum 10 characters")
    .required("Please enter your phone number."),
  message: Yup.string().required("Please enter your message."),
});

export const agentApplicationSchema = Yup.object().shape({
  title: Yup.string().required("Please Select a title"),
  firstName: Yup.string().required("Please Enter Your First Name"),
  lastName: Yup.string().required("Please Enter Your First Name"),
  email: Yup.string().email().required("Please Enter Your Email Address"),
  phone: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(10, "Phone number must be of maximum 10 characters")
    .required("Please Enter Your Phone Number"),
  role: Yup.string()
    .oneOf(["AGENT", "DEALERSHIP", "FEILDOFFICER"])
    .required("Please Select a Post"),
  city: Yup.string().required("Please Enter Your City"),
  resume: Yup.mixed()
    .test(
      "fileType",
      "Invalid file format. Only accept PDF files.",
      (value) => {
        if (!value) return true;
        return [
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(value.type);
      }
    )
    .test(
      "fileSize",
      "File size is too large. Maximum size allowed is 2MB.",
      (value) => {
        if (!value) return true;
        return value.size <= 2 * 1024 * 1024;
      }
    )
    .required("Please Upload Your Resume"),
});
export const agentSchema = Yup.object().shape({
  title: Yup.string().required("Please Select a title"),
  firstName: Yup.string().required("Please Enter the First Name"),
  LastName: Yup.string().required("Please Enter the First Name"),
  Email: Yup.string().email().required("Please Enter the Email Address"),
  Phone: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(10, "Phone number must be of maximum 10 characters")
    .required("Please Enter the Phone Number"),
  role: Yup.string()
    .oneOf(["AGENT", "DEALERSHIP", "FEILDOFFICER"])
    .required("Please Select a Post"),
  city: Yup.string().required("Please Enter the City"),
  password: Yup.string().required("Please Enter the Password"),
  designation: Yup.string().required("Please Enter the Designation"),
  workUnder: Yup.string().optional("Please Enter A Employee Above him"),
});
export const agentUpdateSchema = Yup.object().shape({
  title: Yup.string().required("Please Select a title"),
  firstName: Yup.string().required("Please Enter the First Name"),
  LastName: Yup.string().required("Please Enter the First Name"),
  Email: Yup.string().email().required("Please Enter the Email Address"),
  Phone: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(10, "Phone number must be of maximum 10 characters")
    .required("Please Enter the Phone Number"),
  role: Yup.string()
    .oneOf(["AGENT", "DEALERSHIP", "FEILDOFFICER"])
    .required("Please Select a Post"),
  city: Yup.string().required("Please Enter the City"),
  password: Yup.string().optional("Please Enter the Password"),
  designation: Yup.string().required("Please Enter the Designation"),
  workUnder: Yup.string().optional("Please Enter A Employee Above him"),
});
export const adminLoginDto = Yup.object({
  Id: Yup.string().required("Please enter your Id."),
  password: Yup.string().required("Please enter your password."),
});
export const addNewsDto = Yup.object({
  text: Yup.string().required("Please enter your News."),
  lane: Yup.string().oneOf(["FIRST", "SECOND"]).required("Select a lane."),
});
const today = new Date();

export const customerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  guardian_relation: Yup.string().required("Guardian relation is required"),
  guardian_name: Yup.string().required("Guardian name is required"),
  phone: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(10, "Phone number must be of maximum 10 characters")
    .required("Phone number is required"),
  dob: Yup.date()
    .max(today, "Date of birth cannot be in the future")
    .required("Date of birth is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  loanInNumber: Yup.number().integer().required("Loan amount is required"),
  loanYear: Yup.number().integer().required("Loan year is required"),
  address: Yup.string().required("Address is required"),
  district: Yup.string().required("District is required"),
  State: Yup.string().required("State is required"),
  pinCode: Yup.string()
    .min(6, "Pincode must be at least 6 characters")
    .max(6, "Pincode number must be of maximum 6 characters")
    .required("PIN code is required"),
  agentId: Yup.string().required("Please Select a Agent"),
  bank: Yup.string().required("Bank name is required"),
  AccountNumber: Yup.string()
    .required("Account number is required")
    .min(6, "Account number must be at least 6 characters")
    .max(20, "Account number can't exceed 20 characters"),
  ifsc: Yup.string()
    .required("IFSC code is required")
    .min(11, "IFSC code must be 11 characters")
    .max(11, "IFSC code can't exceed 11 characters"),
  accountType: Yup.string().required("Account type is required"),
  photo: Yup.mixed()
    .test(
      "fileType",
      "Invalid file format. Only accept png / Jpeg / jpg files.",
      (value) => {
        if (!value) return true;
        return ["image/jpeg", "image/jpg", "image/png"].includes(value.type);
      }
    )
    .test(
      "fileSize",
      "File size is too large. Maximum size allowed is 2MB.",
      (value) => {
        if (!value) return true;
        return value.size <= 2 * 1024 * 1024;
      }
    )
    .required("Photo is required"),
  AdharCard: Yup.mixed()
    .test(
      "fileType",
      "Invalid file format. Only accept PDF files.",
      (value) => {
        if (!value) return true;
        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "application/pdf",
        ].includes(value.type);
      }
    )
    .test(
      "fileSize",
      "File size is too large. Maximum size allowed is 2MB.",
      (value) => {
        if (!value) return true;
        return value.size <= 2 * 1024 * 1024;
      }
    )
    .required("Please Upload Your Aadhar Card"),
  adharNumber: Yup.string()
    .min(12, "Adhar number must be 12 digits")
    .max(12, "Adhar number must be 12 digits")
    .required("Adhar number is required"),
  panNumber: Yup.string()
    .required("Adhar number is required")
    .min(10, "PAN number must be at least 10 characters")
    .max(10, "PAN number can't exceed 10 characters"),
  bankProof: Yup.string().required("Bank proof is required"),
  proofDoc: Yup.mixed()
    .test(
      "fileType",
      "Invalid file format. Only accept PDF files.",
      (value) => {
        if (!value) return true;
        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "application/pdf",
        ].includes(value.type);
      }
    )
    .test(
      "fileSize",
      "File size is too large. Maximum size allowed is 2MB.",
      (value) => {
        if (!value) return true;
        return value.size <= 2 * 1024 * 1024;
      }
    )
    .required("Please Upload Your Proof"),
  panCard: Yup.mixed()
    .test(
      "fileType",
      "Invalid file format. Only accept PDF files.",
      (value) => {
        if (!value) return true;
        return [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "application/pdf",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(value.type);
      }
    )
    .test(
      "fileSize",
      "File size is too large. Maximum size allowed is 2MB.",
      (value) => {
        if (!value) return true;
        return value.size <= 2 * 1024 * 1024;
      }
    )
    .required("Please Upload Your Pan Card"),
});
