import React, { useEffect, useState } from "react";
import CarouselBanner from "../components/CarouselBanner";
import ContainerWrapper from "../components/ui/containtWrapper";
import { useParams } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";
import { BiSolidChevronsRight } from "react-icons/bi";
import metaData from "../utils/lib/site.config";
import toast from "react-hot-toast";
import ApiService from "../services/Api_services";

function Loan() {
  const { slug } = useParams();
  const [general, setGeneral] = useState({
    data: {},
    loading: true,
  });
  async function fetchData() {
    try {
      const res = await ApiService.fetchData({
        url: "api/payment-qr",
        method: "GET",
      });
      setGeneral({ data: res.data.data[0] || null, loading: false });
    } catch (error) {
      toast.error(
        typeof error.response.data.message !== "string"
          ? error.response.data?.[0]
          : error.response.data.message
      );
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  function Bullets({ children }) {
    return (
      <div className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-b-0">
        <div className="flex-shrink-0 w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
        <span className="text-gray-700 text-sm leading-relaxed">{children}</span>
      </div>
    );
  }

  function Card({ title, children }) {
    return (
      <div className="bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden hover:shadow-medium transition-all duration-300 group">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-6 py-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <div className="w-1 h-6 bg-white rounded-full"></div>
            {title}
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-1">
            {children}
          </div>
        </div>
      </div>
    );
  }

  const services = [
    "personal-loan",
    "home-loan",
    "business-loan",
    "education-loan",
    "property-loan",
    "agriculture-loan",
    "itr-loan",
    "payslip-loan",
    "group-loan",
  ];

  function EducationLoan() {
    return (
      <div className="bg-gray-100 mt-20">
        <ContainerWrapper>
          <div className="mt-4 pb-8 w-full">
            <h1 className="w-full text-2xl md:text-3xl mt-1 pt-4 font-bold text-center">
              Eligibility for{" "}
              <span className="text-red-500"> Education Loan</span>
            </h1>
            <p className="text-center text-sm md:text-md font-medium  mt-2">
              rate of interest 5% and the loan amount will Upto 1 lakh - 25
              lakhs
            </p>

            <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-4">
              <Card title="Required Documents Of Loanee">
                <Bullets>5 Photographs</Bullets>
                <Bullets>Address Proof</Bullets>
                <Bullets>I.D. Proof</Bullets>
                <Bullets>Bank Statement of Last 6 months</Bullets>
                <Bullets>File Charge = {general?.data?.fileCharge} Rs.</Bullets>
              </Card>
              <Card title="Required Documents of Guarantor">
                <Bullets>5 Recent Photographs of Guarantor</Bullets>
                <Bullets> Address Proof </Bullets>
                <Bullets> ID Proof </Bullets>
                <Bullets> Bank Details </Bullets>
                <Bullets>
                  {" "}
                  Property Documents (in case of property guarantor)
                </Bullets>
                <Bullets>
                  {" "}
                  Last two month of pay slip & last six month bank statement (in
                  case of govt/pvt)
                </Bullets>
              </Card>
              <Card title="Valid Documents as I.D. Proof">
                <Bullets> Aadhar Card </Bullets>
                <Bullets> Pan Card </Bullets>
                <Bullets> Voter Card </Bullets>
                <Bullets> Driving License </Bullets>
              </Card>
              <Card title="Loan Amount As Per Qualification">
                <Bullets>10th - 1 Lakh-5 Lakhs</Bullets>
                <Bullets> 12th - 5 Lakh-8 Lakhs</Bullets>
                <Bullets> Graduation - 8 Lakh -15 Lakhs</Bullets>
                <Bullets> M.BA - 20 Lakh -30 Lakhs </Bullets>
              </Card>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    );
  }
  function AgricultureLoan() {
    return (
      <div className="bg-gray-100 mt-20">
        <ContainerWrapper>
          <div className="mt-4 pb-8 w-full">
            <h1 className="w-full text-2xl md:text-3xl mt-1 pt-4 font-bold text-center">
              Eligibility for{" "}
              <span className="text-red-500"> Agriculture Loan</span>
            </h1>
            <p className="text-center text-sm md:text-md font-medium  mt-2">
              rate of interest 5% and the loan amount will Upto 1 lakh - 5 Cr
            </p>

            <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
              <Card title="Required Documents Of Loanee">
                <Bullets>5 Photographs</Bullets>
                <Bullets>Address Proof</Bullets>
                <Bullets>I.D. Proof</Bullets>
                <Bullets>Bank Statement of Last 6 months</Bullets>
                <Bullets>File Charge = {general.data.fileCharge} Rs.</Bullets>
                <Bullets>
                  Papers of Property (Khasra, Khaitoni, Registry, Bainama)
                </Bullets>
              </Card>
              <Card title="Required Documents of Guarantor">
                <Bullets>5 Recent Photographs of Guarantor</Bullets>
                <Bullets> Address Proof </Bullets>
                <Bullets> ID Proof </Bullets>
                <Bullets> Bank Details </Bullets>
                <Bullets>
                  {" "}
                  Property Documents (in case of property guarantor)
                </Bullets>
                <Bullets>
                  {" "}
                  Last two month of pay slip & last six month bank statement (in
                  case of govt/pvt)
                </Bullets>
              </Card>
              <Card title="Valid Documents as I.D. Proof">
                <Bullets> Aadhar Card </Bullets>
                <Bullets> Pan Card </Bullets>
                <Bullets> Voter Card </Bullets>
                <Bullets> Driving License </Bullets>
              </Card>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    );
  }
  function PropertyLoan() {
    return (
      <div className="bg-gray-100 mt-20">
        <ContainerWrapper>
          <div className="mt-4 pb-8 w-full">
            <h1 className="w-full text-2xl md:text-3xl mt-1 pt-4 font-bold text-center">
              Eligibility for{" "}
              <span className="text-red-500"> Property Loan</span>
            </h1>
            <p className="text-center text-sm md:text-md font-medium  mt-2">
              rate of interest 5% and the loan amount will be (according to
              market value 70% to 80%)
            </p>

            <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
              <Card title="Required Documents Of Loanee">
                <Bullets>5 Photographs</Bullets>
                <Bullets>Address Proof</Bullets>
                <Bullets>I.D. Proof</Bullets>
                <Bullets>Bank Statement of Last 6 months</Bullets>
                <Bullets>File Charge = {general.data.fileCharge} Rs.</Bullets>
                <Bullets>
                  Papers of Property (Khasra, Khaitoni, Registry, Bainama)
                </Bullets>
              </Card>
              <Card title="Required Documents of Guarantor">
                <Bullets>5 Recent Photographs of Guarantor</Bullets>
                <Bullets> Address Proof </Bullets>
                <Bullets> ID Proof </Bullets>
                <Bullets> Bank Details </Bullets>
                <Bullets>
                  {" "}
                  Property Documents (in case of property guarantor)
                </Bullets>
                <Bullets>
                  {" "}
                  Last two month of pay slip & last six month bank statement (in
                  case of govt/pvt)
                </Bullets>
              </Card>
              <Card title="Valid Documents as I.D. Proof">
                <Bullets> Aadhar Card </Bullets>
                <Bullets> Pan Card </Bullets>
                <Bullets> Voter Card </Bullets>
                <Bullets> Driving License </Bullets>
              </Card>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    );
  }
  function BusinessLoan() {
    return (
      <div className="bg-gray-100 mt-20">
        <ContainerWrapper>
          <div className="mt-4 pb-8 w-full">
            <h1 className="w-full text-2xl md:text-3xl mt-1 pt-4 font-bold text-center">
              Eligibility for{" "}
              <span className="text-red-500"> Business Loan</span>
            </h1>
            <p className="text-center text-sm md:text-md font-medium  mt-2">
              rate of interest 5% and the loan amount will Upto 1 lakh - 25
              lakhs
            </p>

            <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
              <Card title="Required Documents Of Loanee">
                <Bullets>5 Photographs</Bullets>
                <Bullets>Address Proof</Bullets>
                <Bullets>I.D. Proof</Bullets>
                <Bullets>Bank Statement of Last 6 months</Bullets>
                <Bullets>File Charge = {general.data.fileCharge} Rs.</Bullets>
              </Card>
              <Card title="Required Documents of Guarantor">
                <Bullets>5 Recent Photographs of Guarantor</Bullets>
                <Bullets> Address Proof </Bullets>
                <Bullets> ID Proof </Bullets>
                <Bullets> Bank Details </Bullets>
                <Bullets>
                  {" "}
                  Property Documents (in case of property guarantor)
                </Bullets>
                <Bullets>
                  {" "}
                  Last two month of pay slip & last six month bank statement (in
                  case of govt/pvt)
                </Bullets>
              </Card>
              <Card title="Valid Documents as I.D. Proof">
                <Bullets> Aadhar Card </Bullets>
                <Bullets> Pan Card </Bullets>
                <Bullets> Voter Card </Bullets>
                <Bullets> Driving License </Bullets>
              </Card>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    );
  }
  function PersonalLoan() {
    return (
      <div className="bg-gray-100 mt-20">
        <ContainerWrapper>
          <div className="mt-4 pb-8 w-full">
            <h1 className="w-full text-2xl md:text-3xl mt-1 pt-4 font-bold text-center">
              Eligibility for{" "}
              <span className="text-red-500"> Personal Loan</span>
            </h1>
            <p className="text-center text-sm md:text-md font-medium  mt-2">
              rate of interest 5% and the loan amount will Upto 1 lakh - 30
              lakhs
            </p>

            <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
              <Card title="Required Documents Of Loanee">
                <Bullets>5 Photographs</Bullets>
                <Bullets>Address Proof</Bullets>
                <Bullets>I.D. Proof</Bullets>
                <Bullets>Bank Statement of Last 6 months</Bullets>
                <Bullets>File Charge = {general.data.fileCharge} Rs.</Bullets>
              </Card>
              <Card title="Required Documents of Guarantor">
                <Bullets>5 Recent Photographs of Guarantor</Bullets>
                <Bullets> Address Proof </Bullets>
                <Bullets> ID Proof </Bullets>
                <Bullets> Bank Details </Bullets>
                <Bullets>
                  {" "}
                  Property Documents (in case of property guarantor)
                </Bullets>
                <Bullets>
                  {" "}
                  Last two month of pay slip & last six month bank statement (in
                  case of govt/pvt)
                </Bullets>
              </Card>
              <Card title="Valid Documents as I.D. Proof">
                <Bullets> Aadhar Card </Bullets>
                <Bullets> Pan Card </Bullets>
                <Bullets> Voter Card </Bullets>
                <Bullets> Driving License </Bullets>
              </Card>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    );
  }
  function HomeLoan() {
    return (
      <div className="bg-gray-100 mt-20">
        <ContainerWrapper>
          <div className="mt-4 pb-8 w-full">
            <h1 className="w-full text-2xl md:text-3xl mt-1 pt-4 font-bold text-center">
              Eligibility for <span className="text-red-500"> Home Loan</span>
            </h1>
            <p className="text-center text-sm md:text-md font-medium  mt-2">
              rate of interest 5%, According to market Value 70% to 80%
            </p>

            <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
              <Card title="Required Documents Of Loanee">
                <Bullets>5 Photographs</Bullets>
                <Bullets>Address Proof</Bullets>
                <Bullets>I.D. Proof</Bullets>
                <Bullets>Bank Statement of Last 6 months</Bullets>
                <Bullets>File Charge = {general.data.fileCharge} Rs.</Bullets>
                <Bullets>
                  Papers of Property (Khasra, Khaitoni, Registry, Bainama).
                </Bullets>
              </Card>
              <Card title="Required Documents of Guarantor">
                <Bullets>5 Recent Photographs of Guarantor</Bullets>
                <Bullets> Address Proof </Bullets>
                <Bullets> ID Proof </Bullets>
                <Bullets> Bank Details </Bullets>
                <Bullets>
                  {" "}
                  Property Documents (in case of property guarantor)
                </Bullets>
                <Bullets>
                  {" "}
                  Last two month of pay slip & last six month bank statement (in
                  case of govt/pvt)
                </Bullets>
              </Card>
              <Card title="Valid Documents as I.D. Proof">
                <Bullets> Aadhar Card </Bullets>
                <Bullets> Pan Card </Bullets>
                <Bullets> Voter Card </Bullets>
                <Bullets> Driving License </Bullets>
              </Card>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    );
  }
  function ITRLoan() {
    return (
      <div className="bg-gray-100 mt-20">
        <ContainerWrapper>
          <div className="mt-4 pb-8 w-full">
            <h1 className="w-full text-2xl md:text-3xl mt-1 pt-4 font-bold text-center">
              Eligibility for <span className="text-red-500"> ITR Loan</span>
            </h1>
            <p className="text-center text-sm md:text-md font-medium  mt-2">
              rate of interest 5% can get 3 to 4 times (according to ITR)
            </p>

            <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
              <Card title="Required Documents Of Loanee">
                <Bullets>5 Photographs</Bullets>
                <Bullets>Address Proof</Bullets>
                <Bullets>I.D. Proof</Bullets>
                <Bullets>Bank Statement of Last 6 months</Bullets>
                <Bullets>File Charge = {general.data.fileCharge} Rs.</Bullets>
                <Bullets>Copy Of Last 2 Year ITR</Bullets>
              </Card>
              <Card title="Required Documents of Guarantor">
                <Bullets>5 Recent Photographs of Guarantor</Bullets>
                <Bullets> Address Proof </Bullets>
                <Bullets> ID Proof </Bullets>
                <Bullets> Bank Details </Bullets>
                <Bullets>
                  {" "}
                  Property Documents (in case of property guarantor)
                </Bullets>
                <Bullets>
                  {" "}
                  Last two month of pay slip & last six month bank statement (in
                  case of govt/pvt)
                </Bullets>
              </Card>
              <Card title="Valid Documents as I.D. Proof">
                <Bullets> Aadhar Card </Bullets>
                <Bullets> Pan Card </Bullets>
                <Bullets> Voter Card </Bullets>
                <Bullets> Driving License </Bullets>
              </Card>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    );
  }
  function PaySlipLoan() {
    return (
      <div className="bg-gray-100 mt-20">
        <ContainerWrapper>
          <div className="mt-4 pb-8 w-full">
            <h1 className="w-full text-2xl md:text-3xl mt-1 pt-4 font-bold text-center">
              Eligibility for{" "}
              <span className="text-red-500"> Pay Slip Loan</span>
            </h1>
            <p className="text-center text-sm md:text-md font-medium  mt-2">
              rate of interest 5%, 40 to 50 times (according to salary)
            </p>

            <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
              <Card title="Required Documents Of Loanee">
                <Bullets>5 Photographs</Bullets>
                <Bullets>Address Proof</Bullets>
                <Bullets>I.D. Proof</Bullets>
                <Bullets>Bank Statement of Last 6 months</Bullets>
                <Bullets>File Charge = {general.data.fileCharge} Rs.</Bullets>
              </Card>
              <Card title="Required Documents of Guarantor">
                <Bullets>5 Recent Photographs of Guarantor</Bullets>
                <Bullets> Address Proof </Bullets>
                <Bullets> ID Proof </Bullets>
                <Bullets> Bank Details </Bullets>
                <Bullets>
                  {" "}
                  Property Documents (in case of property guarantor)
                </Bullets>
                <Bullets>
                  {" "}
                  Last two month of pay slip & last six month bank statement (in
                  case of govt/pvt)
                </Bullets>
              </Card>
              <Card title="Valid Documents as I.D. Proof">
                <Bullets> Aadhar Card </Bullets>
                <Bullets> Pan Card </Bullets>
                <Bullets> Voter Card </Bullets>
                <Bullets> Driving License </Bullets>
                <Bullets>
                  {" "}
                  Job Certificate (at present) issued from company in which
                  applicant working{" "}
                </Bullets>
              </Card>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    );
  }
  function GroupLoan() {
    return (
      <div className="bg-gray-100 mt-20">
        <ContainerWrapper>
          <div className="mt-4 pb-8 w-full">
            <h1 className="w-full text-2xl md:text-3xl mt-1 pt-4 font-bold text-center">
              Eligibility for <span className="text-red-500"> Group Loan</span>
            </h1>
            <p className="text-center text-sm md:text-md font-medium  mt-2">
              rate of interest 5%, and amount will be 50000 to 3 lakhs
            </p>

            <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
              <Card title="Required Documents Of Loanee">
                <Bullets>5 Photographs</Bullets>
                <Bullets>Address Proof</Bullets>
                <Bullets>I.D. Proof</Bullets>
                <Bullets>Bank Statement of Last 6 months</Bullets>
                <Bullets>File Charge = {general.data.fileCharge} Rs.</Bullets>
              </Card>
              <Card title="Required Documents of Guarantor">
                <Bullets>5 Recent Photographs of Guarantor</Bullets>
                <Bullets> Address Proof </Bullets>
                <Bullets> ID Proof </Bullets>
                <Bullets> Bank Details </Bullets>
                <Bullets>
                  {" "}
                  Property Documents (in case of property guarantor)
                </Bullets>
                <Bullets>
                  {" "}
                  Last two month of pay slip & last six month bank statement (in
                  case of govt/pvt)
                </Bullets>
              </Card>
              <Card title="Valid Documents as I.D. Proof">
                <Bullets> Aadhar Card </Bullets>
                <Bullets> Pan Card </Bullets>
                <Bullets> Voter Card </Bullets>
                <Bullets> Driving License </Bullets>
              </Card>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    );
  }

  if (slug === "personal-loan") {
    return <PersonalLoan />;
  } else if (slug === "home-loan") {
    return <HomeLoan />;
  } else if (slug === "business-loan") {
    return <BusinessLoan />;
  } else if (slug === "education-loan") {
    return <EducationLoan />;
  } else if (slug === "property-loan") {
    return <PropertyLoan />;
  } else if (slug === "agriculture-loan") {
    return <AgricultureLoan />;
  } else if (slug === "itr-loan") {
    return <ITRLoan />;
  } else if (slug === "pay-slip-loan") {
    return <PaySlipLoan />;
  } else if (slug === "group-loan") {
    return <GroupLoan />;
  } else {
    return (
      <div className="bg-gray-100 mt-20">
        <ContainerWrapper>
          <div className="mt-4 pb-8 w-full">
            <h1 className="w-full text-2xl md:text-3xl mt-1 pt-4 font-bold text-center">
              Eligibility for <span className="text-red-500"> Loan</span>
            </h1>
            <p className="text-center text-sm md:text-md  mt-2 font-medium">
              rate of interest 5% and the loan amount will Upto 1 lakh - 25
              lakhs
            </p>

            <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
              <Card title="Required Documents Of Loanee">
                <Bullets>5 Photographs</Bullets>
                <Bullets>Address Proof</Bullets>
                <Bullets>I.D. Proof</Bullets>
                <Bullets>Bank Statement of Last 6 months</Bullets>
                <Bullets>File Charge = {general.data.fileCharge} Rs.</Bullets>
              </Card>
              <Card title="Required Documents of Guarantor">
                <Bullets>5 Recent Photographs of Guarantor</Bullets>
                <Bullets> Address Proof </Bullets>
                <Bullets> ID Proof </Bullets>
                <Bullets> Bank Details </Bullets>
                <Bullets>
                  {" "}
                  Property Documents (in case of property guarantor)
                </Bullets>
                <Bullets>
                  {" "}
                  Last two month of pay slip & last six month bank statement (in
                  case of govt/pvt)
                </Bullets>
              </Card>
              <Card title="Valid Documents as I.D. Proof">
                <Bullets> Aadhar Card </Bullets>
                <Bullets> Pan Card </Bullets>
                <Bullets> Voter Card </Bullets>
                <Bullets> Driving License </Bullets>
              </Card>
            </div>
          </div>
        </ContainerWrapper>
      </div>
    );
  }
}

export default Loan;
