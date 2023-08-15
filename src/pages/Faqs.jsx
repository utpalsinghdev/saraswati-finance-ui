import React from "react";
import CarouselBanner from "../components/CarouselBanner";
import ContainerWrapper from "../components/ui/containtWrapper";
import HeadingWrapper from "../components/ui/heading Wrapper";
import AccordianGroup from "../components/ui/accordian/AccordianGroup";

function Faqs() {
  return (
    <div className="bg-gray-100">
      <CarouselBanner height="96" />
      <ContainerWrapper>
        <HeadingWrapper
          heading="Frequently Asked Questions"
          title="Green Apple Financial Services Private Limited."
        >
          <div className="py-10">
            <AccordianGroup
              data={[
                {
                  id: 1,
                  title:
                    "हम कितने लाख तक लोन के लिए आवेदन कर सकते हैं (How many lac can we apply for loan)",
                  content:
                    "एक लाख से 5 करोड़ तक (From 1 lac to 5 crore) एजुकेशन लोन 40 लाख तक, सालाना आईटीआर का 5 गुणा अगर आपकी आईटीआर एक साल का 2 लाख है तो 10 लाख तक लोन, सैलरी स्लिप का 50 गुणा, प्रॉपर्टी का 80% प्रॉजेक्ट रिर्पोट का 80% Education loan up to 40 lakh, For ITR loan 5 times of the annual ITR, If your ITR is 2 lac for 1 year then loan up to 10 lac, 50 times of salary slip, 80%  of property, 80% of project report.",
                },
                {
                  id: 2,
                  title:
                    "कितने साल तक तक आवेदन कर सकते है (For how many years can I apply?)",
                  content: "6%",
                },
                {
                  id: 3,
                  title:
                    "अगर हमारे पास कोई गारंटर नही है तो क्या हम आवेदन कर सकते हैं (Can we apply if we do not have any guarantor?)",
                  content:
                    "नही, हमारी कम्पनी बिना गारंटर के लोन नही देती (No, our company does not give loan without guarantor.)",
                },
                {
                  id: 4,
                  title:
                    "लोन लेने के लिए कितनी उम्र होनी चाहिए (How old should one be to take a loan?)",
                  content: "18 से 60 वर्ष (From 18 to 60 years.)",
                },
                {
                  id: 5,
                  title:
                    "क्या आपकी कम्पनी भारत सरकार द्वारा मान्यता प्राप्त है (Is your company recognised by the Government of India?)",
                  content: "हाँ (Yes),",
                },
                {
                  id: 6,
                  title:
                    "क्या आपकी कम्पनी ऑनलाइन लोन देती है (Does your company offer online loans?)",
                  content:
                    " हाँ, कम्पनी की वेबसाइट पर जाकर ऑनलाइन आवेदन कर सकते हैं (Yes, you can apply online by visiting the company's website.)",
                },
                {
                  id: 7,
                  title:
                    "क्या भारत से कोई भी लोन के लिए आवेदन कर सकता है (Can anyone from all over India apply for the loan?)",
                  content: " हाँ (Yes)",
                },
                {
                  id: 8,
                  title:
                    " क्या हम कम्पनी के साथ जुड़कर काम कर सकते है (Can we work in association with the company?)",
                  content: "Yes, आप कम्पनी में एजेंट, फील्ड ऑफिसर, डीलरशिप लेकर काम कर सकते हैं (Yes, you can work in the company by taking Dealership or you can work as a agent, field officer.)",
                },
                {
                  id: 9,
                  title:
                    "कम्पनी में काम करने के लिए काम से काम कितनी योग्यता होनी चाहिए (What is the minimum qualification required to work in the company?)",
                  content: "आठवीं (8th)",
                },
              ]}
            />
          </div>
        </HeadingWrapper>
      </ContainerWrapper>
    </div>
  );
}

export default Faqs;
