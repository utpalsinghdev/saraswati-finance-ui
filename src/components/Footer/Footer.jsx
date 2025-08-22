import React from "react";
import { Link } from "react-router-dom";
import { classNames } from "../../utils/classname";
import Brand from "../brand";
import Button from "../ui/button";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Download,
  Shield,
  Award,
  Users
} from "lucide-react";
import useSiteConfig from "../../hooks/useSiteConfig";

const Footer = () => {
  const { config, loading } = useSiteConfig();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Services", href: "/services/loan" },
    { name: "Apply Now", href: "/apply-loan" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const services = [
    { name: "Personal Loan", href: "/services/personal-loan" },
    { name: "Home Loan", href: "/services/home-loan" },
    { name: "Business Loan", href: "/services/business-loan" },
    { name: "Education Loan", href: "/services/education-loan" },
    { name: "Property Loan", href: "/services/property-loan" },
    { name: "Agriculture Loan", href: "/services/agriculture-loan" },
  ];

  const company = [
    { name: "Agent Joining", href: "/Career" },
    { name: "Verify Agent", href: "/verify-agent" },
    { name: "Payment", href: "/pay" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Anti-Fraud Policy", href: "/anti-fraud" },
  ];

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#" },
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
  ];

  const features = [
    { icon: Shield, text: "Secure & Trusted", description: "Your data is protected with bank-level security" },
    { icon: Award, text: "Award Winning", description: "Recognized for excellence in financial services" },
    { icon: Users, text: "24/7 Support", description: "Round-the-clock customer support available" },
  ];

  return (
    <footer className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <Brand imgClass="w-[15rem]" />
            </div>
            <p className="text-neutral-300 mb-6 leading-relaxed">
              {config?.title || "Saraswati Financial Services Private Limited"} is your trusted financial partner, providing comprehensive loan solutions with competitive rates and personalized service.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{feature.text}</h4>
                    <p className="text-sm text-neutral-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links and Services - Side by side on mobile */}
          <div className="grid grid-cols-2 gap-6 md:col-span-1 lg:col-span-2">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center text-neutral-300 hover:text-primary-400 transition-colors duration-200 group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Our Services</h3>
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.name}>
                    <Link
                      to={service.href}
                      className="flex items-center text-neutral-300 hover:text-primary-400 transition-colors duration-200 group"
                    >
                      <ArrowRight className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Company Info */}




          {/* Contact & Company */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Contact & Company</h3>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 text-neutral-300">
                <Phone className="w-4 h-4 text-primary-400" />
                <span>+91 {config?.phone?.[0] || "9773945780"}</span>
              </div>
              <div className="flex items-center space-x-3 text-neutral-300">
                <Mail className="w-4 h-4 text-primary-400" />
                <span>{config?.email || "Info@Saraswatifinance.live"}</span>
              </div>
              {config?.address?.map((addr, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-neutral-300">
                  <MapPin className="w-5 h-5 min-w-[1.25rem] min-h-[1.25rem] text-primary-400 mt-1" />
                  <span className="text-sm">{addr}</span>
                </div>
              ))}
              <div className="flex items-center space-x-3 text-neutral-300">
                <Clock className="w-4 h-4 text-primary-400" />
                <span className="text-sm">Mon - Sat 10:00 AM - 5:00 PM</span>
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-3">
              {company.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.href}
                    className="flex items-center text-neutral-300 hover:text-primary-400 transition-colors duration-200 group text-sm"
                  >
                    <ArrowRight className="w-3 h-3 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                    {item.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Agent App Download */}
            <div className="mt-6">
              <Button
                variant="primary"
                size="sm"
                icon={Download}
                fullWidth
                // onClick={() => window.open("/Agent.apk", "_blank")}
                className="bg-primary-600 hover:bg-primary-700"
              >
                Download Agent App
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-neutral-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-neutral-400 text-sm">
              © {currentYear} {config?.title || "Saraswati Financial Services Private Limited"}. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-neutral-700 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-all duration-200 group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-neutral-300 group-hover:text-white transition-colors duration-200" />
                </a>
              ))}
            </div>

            {/* Additional Links */}

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
