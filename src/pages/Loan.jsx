import React from "react";
import CarouselBanner from "../components/CarouselBanner";
import ContainerWrapper from "../components/ui/containtWrapper";
import HeadingWrapper from "../components/ui/heading Wrapper";
import { useParams } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";

function Loan() {
  const { slug } = useParams();

  function Bullets({ children }) {
    return (
      <p className="text-gray-600 text-sm font-medium h-full w-full flex items-center justify-start gap-4">
        <ChevronLeft className="text-green-600 w-4 h-4 rotate-180" />{" "}
        <span className="w-[95%]">{children}</span>
      </p>
    );
  }

  function Card({ title, children }) {
    return (
      <div className="bg-green-100 shadow-md rounded-md p-4">
        <h1 className="text-xl font-bold text-left w-full">{title}</h1>
        <div className="mt-4 flex gap-3 flex-col">{children}</div>
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
      <div className="bg-gray-100">
        <ContainerWrapper>
          <HeadingWrapper
            heading={"Education Loan"}
            title={"Green Apple Financial Services Pvt. Ltd."}
          >
            <div className="mt-4 pb-8 w-full">
              <h1 className="w-full text-2xl md:text-3xl mt-1 font-bold text-center">
                Eligibility for{" "}
                <span className="text-green-500"> Education Loan</span>
              </h1>
              <p className="text-center text-sm md:text-md font-medium  mt-2">
                Rate of interest 5% and the loan amount will Upto 1 lakh - 30
                lakhs
              </p>

              <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-4">
                <Card title="Required Documents Of Loanee">
                  <Bullets>5 Photographs</Bullets>
                  <Bullets>Address Proof</Bullets>
                  <Bullets>I.D. Proof</Bullets>
                  <Bullets>Bank Statement of Last 6 months</Bullets>
                  <Bullets>File Charge Rs. 3500+18% GST = 4130 Rs.</Bullets>
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
                    Last two month of pay slip & last six month bank statement
                    (in case of govt/pvt)
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
          </HeadingWrapper>
        </ContainerWrapper>
      </div>
    );
  }
  function AgricultureLoan() {
    return (
      <div className="bg-gray-100">
        <ContainerWrapper>
          <HeadingWrapper
            heading={"Agriculture Loan"}
            title={"Green Apple Financial Services Pvt. Ltd."}
          >
            <div className="mt-4 pb-8 w-full">
              <h1 className="w-full text-2xl md:text-3xl mt-1 font-bold text-center">
                Eligibility for{" "}
                <span className="text-green-500"> Agriculture Loan</span>
              </h1>
              <p className="text-center text-sm md:text-md font-medium  mt-2">
                Rate of interest 5% and the loan amount will Upto 1 lakh - 5 Cr
              </p>

              <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
                <Card title="Required Documents Of Loanee">
                  <Bullets>5 Photographs</Bullets>
                  <Bullets>Address Proof</Bullets>
                  <Bullets>I.D. Proof</Bullets>
                  <Bullets>Bank Statement of Last 6 months</Bullets>
                  <Bullets>File Charge Rs. 3500+18% GST = 4130 Rs.</Bullets>
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
                    Last two month of pay slip & last six month bank statement
                    (in case of govt/pvt)
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
          </HeadingWrapper>
        </ContainerWrapper>
      </div>
    );
  }
  function PropertyLoan() {
    return (
      <div className="bg-gray-100">
        <ContainerWrapper>
          <HeadingWrapper
            heading={"Property Loan"}
            title={"Green Apple Financial Services Pvt. Ltd."}
          >
            <div className="mt-4 pb-8 w-full">
              <h1 className="w-full text-2xl md:text-3xl mt-1 font-bold text-center">
                Eligibility for{" "}
                <span className="text-green-500"> Property Loan</span>
              </h1>
              <p className="text-center text-sm md:text-md font-medium  mt-2">
                Rate of interest 5% and the loan amount will be (according to
                market value 70% to 80%)
              </p>

              <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
                <Card title="Required Documents Of Loanee">
                  <Bullets>5 Photographs</Bullets>
                  <Bullets>Address Proof</Bullets>
                  <Bullets>I.D. Proof</Bullets>
                  <Bullets>Bank Statement of Last 6 months</Bullets>
                  <Bullets>File Charge Rs. 3500+18% GST = 4130 Rs.</Bullets>
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
                    Last two month of pay slip & last six month bank statement
                    (in case of govt/pvt)
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
          </HeadingWrapper>
        </ContainerWrapper>
      </div>
    );
  }
  function BusinessLoan() {
    return (
      <div className="bg-gray-100">
        <ContainerWrapper>
          <HeadingWrapper
            heading={"Business Loan"}
            title={"Green Apple Financial Services Pvt. Ltd."}
          >
            <div className="mt-4 pb-8 w-full">
              <h1 className="w-full text-2xl md:text-3xl mt-1 font-bold text-center">
                Eligibility for{" "}
                <span className="text-green-500"> Business Loan</span>
              </h1>
              <p className="text-center text-sm md:text-md font-medium  mt-2">
                Rate of interest 5% and the loan amount will Upto 1 lakh - 5
                lakhs
              </p>

              <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
                <Card title="Required Documents Of Loanee">
                  <Bullets>5 Photographs</Bullets>
                  <Bullets>Address Proof</Bullets>
                  <Bullets>I.D. Proof</Bullets>
                  <Bullets>Bank Statement of Last 6 months</Bullets>
                  <Bullets>File Charge Rs. 3500+18% GST = 4130 Rs.</Bullets>
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
                    Last two month of pay slip & last six month bank statement
                    (in case of govt/pvt)
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
          </HeadingWrapper>
        </ContainerWrapper>
      </div>
    );
  }
  function PersonalLoan() {
    return (
      <div className="bg-gray-100">
        <ContainerWrapper>
          <HeadingWrapper
            heading={"Personal Loan"}
            title={"Green Apple Financial Services Pvt. Ltd."}
          >
            <div className="mt-4 pb-8 w-full">
              <h1 className="w-full text-2xl md:text-3xl mt-1 font-bold text-center">
                Eligibility for{" "}
                <span className="text-green-500"> Personal Loan</span>
              </h1>
              <p className="text-center text-sm md:text-md font-medium  mt-2">
                Rate of interest 5% and the loan amount will Upto 1 lakh - 30
                lakhs
              </p>

              <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
                <Card title="Required Documents Of Loanee">
                  <Bullets>5 Photographs</Bullets>
                  <Bullets>Address Proof</Bullets>
                  <Bullets>I.D. Proof</Bullets>
                  <Bullets>Bank Statement of Last 6 months</Bullets>
                  <Bullets>File Charge Rs. 3500+18% GST = 4130 Rs.</Bullets>
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
                    Last two month of pay slip & last six month bank statement
                    (in case of govt/pvt)
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
          </HeadingWrapper>
        </ContainerWrapper>
      </div>
    );
  }
  function HomeLoan() {
    return (
      <div className="bg-gray-100">
        <ContainerWrapper>
          <HeadingWrapper
            heading={"Home Loan"}
            title={"Green Apple Financial Services Pvt. Ltd."}
          >
            <div className="mt-4 pb-8 w-full">
              <h1 className="w-full text-2xl md:text-3xl mt-1 font-bold text-center">
                Eligibility for{" "}
                <span className="text-green-500"> Home Loan</span>
              </h1>
              <p className="text-center text-sm md:text-md font-medium  mt-2">
                Rate of interest 5%, According to market Value 70% to 80%
              </p>

              <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
                <Card title="Required Documents Of Loanee">
                  <Bullets>5 Photographs</Bullets>
                  <Bullets>Address Proof</Bullets>
                  <Bullets>I.D. Proof</Bullets>
                  <Bullets>Bank Statement of Last 6 months</Bullets>
                  <Bullets>File Charge Rs. 3500+18% GST = 4130 Rs.</Bullets>
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
                    Last two month of pay slip & last six month bank statement
                    (in case of govt/pvt)
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
          </HeadingWrapper>
        </ContainerWrapper>
      </div>
    );
  }
  function ITRLoan() {
    return (
      <div className="bg-gray-100">
        <ContainerWrapper>
          <HeadingWrapper
            heading={"ITR Loan"}
            title={"Green Apple Financial Services Pvt. Ltd."}
          >
            <div className="mt-4 pb-8 w-full">
              <h1 className="w-full text-2xl md:text-3xl mt-1 font-bold text-center">
                Eligibility for{" "}
                <span className="text-green-500"> ITR Loan</span>
              </h1>
              <p className="text-center text-sm md:text-md font-medium  mt-2">
                Rate of interest 5% can get 3 to 4 times (according to ITR)
              </p>

              <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
                <Card title="Required Documents Of Loanee">
                  <Bullets>5 Photographs</Bullets>
                  <Bullets>Address Proof</Bullets>
                  <Bullets>I.D. Proof</Bullets>
                  <Bullets>Bank Statement of Last 6 months</Bullets>
                  <Bullets>File Charge Rs. 3500+18% GST = 4130 Rs.</Bullets>
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
                    Last two month of pay slip & last six month bank statement
                    (in case of govt/pvt)
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
          </HeadingWrapper>
        </ContainerWrapper>
      </div>
    );
  }
  function PaySlipLoan() {
    return (
      <div className="bg-gray-100">
        <ContainerWrapper>
          <HeadingWrapper
            heading={"Pay Slip Loan"}
            title={"Green Apple Financial Services Pvt. Ltd."}
          >
            <div className="mt-4 pb-8 w-full">
              <h1 className="w-full text-2xl md:text-3xl mt-1 font-bold text-center">
                Eligibility for{" "}
                <span className="text-green-500"> Pay Slip Loan</span>
              </h1>
              <p className="text-center text-sm md:text-md font-medium  mt-2">
                Rate of interest 5%, 40 to 50 times (according to salary)
              </p>

              <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
                <Card title="Required Documents Of Loanee">
                  <Bullets>5 Photographs</Bullets>
                  <Bullets>Address Proof</Bullets>
                  <Bullets>I.D. Proof</Bullets>
                  <Bullets>Bank Statement of Last 6 months</Bullets>
                  <Bullets>File Charge Rs. 3500+18% GST = 4130 Rs.</Bullets>
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
                    Last two month of pay slip & last six month bank statement
                    (in case of govt/pvt)
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
          </HeadingWrapper>
        </ContainerWrapper>
      </div>
    );
  }
  function GroupLoan() {
    return (
      <div className="bg-gray-100">
        <ContainerWrapper>
          <HeadingWrapper
            heading={"Group Loan"}
            title={"Green Apple Financial Services Pvt. Ltd."}
          >
            <div className="mt-4 pb-8 w-full">
              <h1 className="w-full text-2xl md:text-3xl mt-1 font-bold text-center">
                Eligibility for{" "}
                <span className="text-green-500"> Group Loan</span>
              </h1>
              <p className="text-center text-sm md:text-md font-medium  mt-2">
                Rate of interest 5%, and amount will be 50000 to 3 lakhs
              </p>

              <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
                <Card title="Required Documents Of Loanee">
                  <Bullets>5 Photographs</Bullets>
                  <Bullets>Address Proof</Bullets>
                  <Bullets>I.D. Proof</Bullets>
                  <Bullets>Bank Statement of Last 6 months</Bullets>
                  <Bullets>File Charge Rs. 3500+18% GST = 4130 Rs.</Bullets>
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
                    Last two month of pay slip & last six month bank statement
                    (in case of govt/pvt)
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
          </HeadingWrapper>
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
      <div className="bg-gray-100">
        <ContainerWrapper>
          <HeadingWrapper
            heading={"Loan"}
            title={"Green Apple Financial Services Pvt. Ltd."}
          >
            <div className="mt-4 pb-8 w-full">
              <h1 className="w-full text-2xl md:text-3xl mt-1 font-bold text-center">
                Eligibility for <span className="text-green-500"> Loan</span>
              </h1>
              <p className="text-center text-sm md:text-md  mt-2 font-medium">
                Rate of interest 5% and the loan amount will Upto 1 lakh - 5
                lakhs
              </p>

              <div className="grid gap-4 mt-6 grid-cols-1 md:grid-cols-3">
                <Card title="Required Documents Of Loanee">
                  <Bullets>5 Photographs</Bullets>
                  <Bullets>Address Proof</Bullets>
                  <Bullets>I.D. Proof</Bullets>
                  <Bullets>Bank Statement of Last 6 months</Bullets>
                  <Bullets>File Charge Rs. 3500+18% GST = 4130 Rs.</Bullets>
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
                    Last two month of pay slip & last six month bank statement
                    (in case of govt/pvt)
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
          </HeadingWrapper>
        </ContainerWrapper>
      </div>
    );
  }
}

export default Loan;
