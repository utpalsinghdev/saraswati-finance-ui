import * as Yup from "Yup";

export const sendMessageDto = Yup.object({
  name: Yup.string().required("Name is a required field"),
  email: Yup.string()
    .email("Please enter a valid Email address")
    .required("Please enter your email."),
  phone: Yup.string().required("Please enter your phone number."),
  message: Yup.string().required("Please enter your message."),
});

export const agentApplicationSchema = Yup.object().shape({
  title: Yup.string().required("Please Select a title"),
  firstName: Yup.string().required("Please Enter Your First Name"),
  lastName: Yup.string().required("Please Enter Your First Name"),
  email: Yup.string().email().required("Please Enter Your Email Address"),
  phone: Yup.string().required("Please Enter Your Phone Number"),
  role: Yup.string()
    .oneOf(["AGENT", "DEALERSHIP", "FEILDOFFICER"])
    .required("Please Select a Post"),
  city: Yup.string().required("Please Enter Your City"),
  resume: Yup.mixed()
    .test(
      "fileType",
      "Invalid file format. Only accept PDF or DOC files.",
      (value) => {
        if (!value) return true;
        return [
          "application/pdf",
          "application/msword",
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
