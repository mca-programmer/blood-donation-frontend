import React from "react";

// FAQ Section
export const FAQSection = () => {
  const faqs = [
    {
      question: "Who can donate blood?",
      answer:
        "Healthy adults aged between 18 and 60 years can donate blood if they meet the basic health requirements.",
    },
    {
      question: "How often can I donate blood?",
      answer:
        "A healthy person can donate blood every 3–4 months depending on medical guidelines.",
    },
    {
      question: "Is blood donation safe?",
      answer:
        "Yes, blood donation is completely safe. Sterile and disposable equipment is used for every donor.",
    },
  ];

  return (
    <section className="container mx-auto py-10 bg-gradient-to-b from-white to-red-50 ">
      <div className="max-w-5xl mx-auto px-4 ">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-red-600 mb-12">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="group border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
            >
              <summary className="flex justify-between items-center font-semibold text-gray-800 text-lg md:text-xl">
                {faq.question}
                <span className="text-red-500 transform group-open:rotate-180 transition-transform duration-300">
                  ▼
                </span>
              </summary>
              <p className="mt-3 text-gray-600 leading-relaxed text-base md:text-lg">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
