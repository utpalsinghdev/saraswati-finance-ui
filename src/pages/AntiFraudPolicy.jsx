import React from "react";
import HeadingWrapper from "../components/ui/heading Wrapper";
import ContainerWrapper from "../components/ui/containtWrapper";
import CarouselBanner from "../components/CarouselBanner";

const AntiFraudPolicy = () => {
  return (
    <div className="bg-gray-100">
      <CarouselBanner />
      <ContainerWrapper>
        <HeadingWrapper
          heading={"Anti-Fraud Policy"}
          title={"Green Apple Financial Services Private Limited."}
        >
          <div className="px-4 mt-4 flex flex-col gap-2">
            <h3 className="text-green-500 text-2xl font-semibold">Payment</h3>
            <p className="text-gray-600 text-sm font-medium">
              If you make payment online, then pay only on the account of Green
              Apple Financial Services Private Limited which is mentioned on the
              bank section of our website. If person asks you to pay to a bank
              account which is Having no relevance to Green Apple Financial Services Private
              Limited then never make this kind of Payments Also never pay any
              amount to any person claiming that he/she is an agent or
              representative of Green Apple Financial Services Private Limited outside the
              office branches any agent, representative offers you extra care to
              process your application faster or to Manage a document on an
              additional fee, we highly discourage this kind of misuse of our
              services. Also, immediately contact our official no -8272814112 to
              stop this type of unwanted scam
            </p>
            <h3 className="text-green-500 text-2xl font-semibold">
              Fake/False Documentation
            </h3>
            <p className="text-gray-600 text-sm font-medium">
              For avoiding any delay or cancellation of your application, UK Fin
              Service Private Limited suggests you to always provide genuine and
              updated document to fulfill the documentation criteria of a loan
              Process. If our team or loan department find a document provided
              by you is fake/false, then you will be solely responsible for the
              delay or cancellation of your application. Also, you will not be
              liable to ask for any kind of refund.
            </p>
            <h3 className="text-green-500 text-2xl font-semibold">
              Suggestion For You
            </h3>
            <p className="text-gray-600 text-sm font-medium">
              Green Apple Financial Services Private Limited suggest you, if you find any type
              of fraud or scam with our agent or representative please contact
              us immediately. We are always happy to help you.
            </p>
          </div>
        </HeadingWrapper>
      </ContainerWrapper>
    </div>
  );
};

export default AntiFraudPolicy;
