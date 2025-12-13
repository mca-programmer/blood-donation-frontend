import React from "react";
// ===================== FAQ Section =====================
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
<section className="py-16 bg-white">
<div className="max-w-5xl mx-auto px-4">
<h2 className="text-3xl font-bold text-center text-red-600 mb-10">
Frequently Asked Questions
</h2>


<div className="space-y-4">
{faqs.map((faq, index) => (
<details
key={index}
className="group border rounded-xl p-5 cursor-pointer"
>
<summary className="flex justify-between items-center font-semibold text-gray-800">
{faq.question}
<span className="text-red-500 group-open:rotate-180 transition">▼</span>
</summary>
<p className="mt-3 text-gray-600 leading-relaxed">
{faq.answer}
</p>
</details>
))}
</div>
</div>
</section>
);
};