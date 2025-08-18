import React from "react";
import { Formik } from "formik";
import { sendMessageDto } from "../../schemas";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "../ui/input";
import TextArea from "../ui/textarea";
import Button from "../ui/button";
import Card from "../ui/card";
import {
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Shield,
  Clock,
  Users
} from "lucide-react";

const Contact = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure & Confidential",
      description: "Your information is protected with bank-level security"
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get answers within 24 hours"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Dedicated financial advisors"
    }
  ];

  return (
    <Card className="p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-neutral-900">
            Get in Touch
          </h3>
          <p className="text-neutral-600">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                <feature.icon className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-neutral-900 text-sm">{feature.title}</h4>
                <p className="text-xs text-neutral-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <Formik
          validationSchema={sendMessageDto}
          initialValues={{
            name: "",
            email: "",
            phone: "",
            message: "",
          }}
          onSubmit={async (values, action) => {
            try {
              const res = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/message`,
                values
              );
              if (res) toast.success(res.data.message);
            } catch (error) {
              toast.error(error.response.data.message);
            } finally {
              action.resetForm();
              action.setSubmitting(false);
            }
          }}
        >
          {(formik) => (
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && formik.errors.name}
                  placeholder="Enter your full name"
                  icon={<User className="w-5 h-5" />}
                  required
                />

                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && formik.errors.email}
                  placeholder="Enter your email"
                  icon={<Mail className="w-5 h-5" />}
                  required
                />
              </div>

              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && formik.errors.phone}
                placeholder="Enter your phone number"
                icon={<Phone className="w-5 h-5" />}
                required
              />

              <TextArea
                label="Message"
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.message && formik.errors.message}
                placeholder="Tell us about your requirements..."
                icon={<MessageSquare className="w-5 h-5" />}
                rows={4}
                required
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                icon={Send}
                iconPosition="right"
                loading={formik.isSubmitting}
                loadingText="Sending..."
                disabled={formik.isSubmitting}
                className="w-full"
              >
                Send Message
              </Button>
            </form>
          )}
        </Formik>

        {/* Additional Info */}

      </div>
    </Card>
  );
};

export default Contact;
