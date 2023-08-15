import * as Yup from "yup";

export const sendMessageDto = Yup.object({
  name: Yup.string().required("Name is a required field"),
  email: Yup.string()
    .email("Please enter a valid Email address")
    .required("Please enter your email."),
  phone: Yup.string().required("Please enter your phone number."),
  message: Yup.string().required("Please enter your message."),
});
