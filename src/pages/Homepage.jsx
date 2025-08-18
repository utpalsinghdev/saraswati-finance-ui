import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { classNames } from "../utils/classname";
import Button from "../components/ui/button";
import Card from "../components/ui/card";
import Input from "../components/ui/input";
import {
  ArrowRight,
  Shield,
  Clock,
  Users,
  TrendingUp,
  CheckCircle,
  Calculator,
  FileText,
  Smartphone,
  Building,
  GraduationCap,
  Home,
  Briefcase,
  Leaf,
  Receipt,
  Users2
} from "lucide-react";
import { Formik } from "formik";
import useFetch from "../hooks/useFetch";
import calculateEMI from "../utils/calculator";
import Select from "../components/ui/select";
import Contact from "../components/contact";
import metaData from "../utils/lib/site.config";
import HeroSection from "../components/CarouselBanner";

const Homepage = () => {
  const [stats, setStats] = useState([
    { value: 0, target: 432, label: "Happy Customers", icon: Users },
    { value: 0, target: 1289, label: "Files Processed", icon: FileText },
    { value: 0, target: 328, label: "Disbursements", icon: TrendingUp },
  ]);

  const news = useFetch("/api/news");

  const services = [
    {
      type: "Personal",
      link: "/services/personal-loan",
      img: "/personalLoan.jpg",
      icon: Smartphone,
      description: "Quick personal loans with minimal documentation and fast approval process.",
      features: ["Up to 50 Lakhs", "Quick Approval", "Minimal Documents"]
    },
    {
      type: "Home",
      link: "/services/home-loan",
      img: "/home.jpeg",
      icon: Home,
      description: "Realize your dream of owning a home with our competitive home loan options.",
      features: ["Up to 5 Crores", "Low Interest Rates", "Flexible EMI"]
    },
    {
      type: "Education",
      link: "/services/education-loan",
      img: "/education.png",
      icon: GraduationCap,
      description: "Invest in your future with our education loan programs for students.",
      features: ["Up to 25 Lakhs", "Student Friendly", "No Collateral"]
    },
    {
      type: "Business",
      link: "/services/business-loan",
      img: "/businessLoan.png",
      icon: Building,
      description: "Grow your business with our comprehensive business loan solutions.",
      features: ["Up to 5 Crores", "Business Growth", "Quick Processing"]
    },
    {
      type: "Property",
      link: "/services/property-loan",
      img: "/property.png",
      icon: Home,
      description: "Unlock the value of your property with our property-backed loans.",
      features: ["Up to 80% LTV", "Property Backed", "Competitive Rates"]
    },
    {
      type: "ITR",
      link: "/services/itr-loan",
      img: "/ITRLoan.webp",
      icon: Receipt,
      description: "Get loans based on your ITR with minimal documentation requirements.",
      features: ["ITR Based", "5x Annual Income", "Quick Approval"]
    },
    {
      type: "Agriculture",
      link: "/services/agriculture-loan",
      img: "/agriculture.jpeg",
      icon: Leaf,
      description: "Support your agricultural ventures with our specialized farm loans.",
      features: ["Farm Loans", "Seasonal Repayment", "Government Support"]
    },
    {
      type: "Pay Slip",
      link: "/services/pay-slip-loan",
      img: "/payslip.jpg",
      icon: Receipt,
      description: "Salary-based loans for salaried individuals with easy repayment options.",
      features: ["Salary Based", "50x Monthly Salary", "No Guarantor"]
    },
    {
      type: "Mahila Group",
      link: "/services/group-loan",
      img: "/group.jpeg",
      icon: Users2,
      description: "Empowering women through group lending and financial inclusion.",
      features: ["Group Lending", "Women Empowerment", "Social Impact"]
    },
  ];

  const features = [
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Your financial data is protected with bank-level security protocols and encryption.",
      color: "text-primary-600"
    },
    {
      icon: Clock,
      title: "Quick Approval",
      description: "Get loan approval within 24-48 hours with our streamlined process.",
      color: "text-secondary-600"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Our dedicated support team is available round the clock to assist you.",
      color: "text-warning-600"
    }
  ];

  // Animate stats on scroll
  useEffect(() => {
    const animateStats = () => {
      setStats(prevStats =>
        prevStats.map(stat => ({
          ...stat,
          value: Math.min(stat.value + Math.ceil(stat.target / 50), stat.target)
        }))
      );
    };

    const interval = setInterval(animateStats, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}

      <HeroSection />
      <section className="relative pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                  Your Trusted
                  <span className="text-primary-600 block">Financial Partner</span>
                </h1>
                <p className="text-xl text-neutral-600 leading-relaxed">
                  Get the financial support you need with our comprehensive loan services.
                  Quick approval, competitive rates, and personalized solutions for every need.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => window.location.href = "/apply-loan"}
                >
                  Apply Now
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.location.href = "/calculator"}
                >
                  Calculate EMI
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="text-2xl font-bold text-neutral-900">{stat.value}+</div>
                    <div className="text-sm text-neutral-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/about.png"
                  alt="Financial Services"
                  className="w-full h-auto rounded-2xl shadow-large"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full opacity-20 blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-secondary-500 to-primary-500 rounded-full opacity-20 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              We provide comprehensive financial solutions with a focus on customer satisfaction and transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} hover className="text-center p-8">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-neutral-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
              Our Loan Services
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Choose from our wide range of loan products designed to meet your specific financial requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} hover className="overflow-hidden">
                <div className="relative h-48 mb-6">
                  <img
                    src={service.img}
                    alt={service.type}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-neutral-900">
                    {service.type} Loan
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {service.description}
                  </p>

                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm text-neutral-600">
                        <CheckCircle className="w-4 h-4 text-primary-600 mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    icon={ArrowRight}
                    iconPosition="right"
                    onClick={() => window.location.href = service.link}
                    className="w-full"
                  >
                    Learn More
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* EMI Calculator Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
                  Calculate Your EMI
                </h2>
                <p className="text-lg text-neutral-600">
                  Use our EMI calculator to understand your monthly payments and plan your finances better.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calculator className="w-6 h-6 text-primary-600" />
                  <span className="font-medium text-neutral-900">Quick & Easy Calculation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-primary-600" />
                  <span className="font-medium text-neutral-900">No Personal Information Required</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-primary-600" />
                  <span className="font-medium text-neutral-900">Instant Results</span>
                </div>
              </div>
            </div>

            <Card className="p-8">
              <Formik
                initialValues={{
                  amount: "",
                  years: "",
                  intrestRate: 5,
                }}
              >
                {(formik) => (
                  <div className="space-y-6">
                    <Input
                      label="Loan Amount"
                      type="number"
                      value={formik.values.amount}
                      name="amount"
                      onChange={formik.handleChange}
                      placeholder="Enter amount"
                      icon={<Calculator className="w-5 h-5" />}
                    />

                    <Select
                      icon={<Clock className="w-5 h-5" />}
                      label="Loan Tenure"
                      value={formik.values.years}
                      onChange={formik.handleChange}
                      name="years"
                    >
                      <option value="">Select tenure</option>
                      {Array.from({ length: 17 }, (_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1} Year{index !== 0 ? "s" : ""}
                        </option>
                      ))}
                    </Select>

                    {formik.values.amount && formik.values.years && (
                      <div className="bg-primary-50 rounded-lg p-6 space-y-3">
                        <h4 className="font-semibold text-primary-900">Your EMI Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Monthly EMI:</span>
                            <span className="font-semibold text-primary-900">
                              ₹{calculateEMI(
                                Number(formik.values.amount),
                                Number(formik.values.intrestRate),
                                Number(formik.values.years)
                              )?.emi || 0}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Interest Rate:</span>
                            <span className="font-semibold text-primary-900">5% p.a.</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-neutral-600">Total Months:</span>
                            <span className="font-semibold text-primary-900">
                              {calculateEMI(
                                Number(formik.values.amount),
                                Number(formik.values.intrestRate),
                                Number(formik.values.years)
                              )?.totalMonths || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button
                      variant="primary"
                      size="lg"
                      icon={ArrowRight}
                      iconPosition="right"
                      onClick={() => window.location.href = "/apply-loan"}
                      className="w-full"
                    >
                      Apply Now
                    </Button>
                  </div>
                )}
              </Formik>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900">
                  Get in Touch
                </h2>
                <p className="text-lg text-neutral-600">
                  Have questions about our services? Our team is here to help you find the perfect financial solution.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Secure & Confidential</h4>
                    <p className="text-sm text-neutral-600">Your information is protected</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-secondary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Quick Response</h4>
                    <p className="text-sm text-neutral-600">Get answers within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-warning-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-neutral-900">Expert Support</h4>
                    <p className="text-sm text-neutral-600">Dedicated financial advisors</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Contact />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
