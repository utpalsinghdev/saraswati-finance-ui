import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "./";
  
  import React from "react";
  
  const AccordianGroup = ({ data }) => {
    return (
      <Accordion type="single" collapsible className="w-full ">
        {data.map((a) => (
          <AccordionItem
            key={a.id}
            value={`item-${a.id}`}
            className="border px-8 bg-[#ECF3F7] rounded-xl mb-4"
          >
            <AccordionTrigger className="no-underline text-lg font-medium hover:no-underline">
              {a.title}
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 text-md">
              {a.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    );
  };
  
  export default AccordianGroup;