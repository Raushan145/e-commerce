import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
  {
    question: "What materials are your jewellery made from?",
    answer:
      "Our jewellery is made using high-quality materials such as gold plating, stainless steel, sterling silver and carefully selected stones. Material details are mentioned on every product page.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Orders are generally delivered within 3–7 business days, depending on your location. You can track your order using the tracking information provided after dispatch.",
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer:
      "Yes, Cash on Delivery is available for eligible locations and products. Availability and applicable charges are shown during checkout.",
  },
  {
    question: "Can I return or exchange my order?",
    answer:
      "Yes, eligible products can be returned or exchanged within the specified return period. The product must meet our return-condition requirements.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order has been shipped, you will receive tracking details. You can also check the current status from the My Orders section of your account.",
  },
  {
    question: "How should I take care of my jewellery?",
    answer:
      "Keep jewellery away from water, perfume, sweat and harsh chemicals. Store each piece separately in a dry place when not in use.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept online payments through supported payment methods such as UPI, cards and net banking. Cash on Delivery may also be available for eligible orders.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#f8f4eb] py-3 sm:py-3 lg:py-4">

      <div className="max-w-[900px] mx-auto px-4 sm:px-6">

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">

          <p className="
            uppercase
            tracking-[0.25em]
            text-[8px]
            sm:text-[10px]
            text-[#a48755]
          ">
            Need Help?
          </p>

          <h2 className="
            font-serif
            text-[#293b25]
            text-2xl
            sm:text-3xl
            md:text-4xl
            mt-1
          ">
            Frequently Asked Questions
          </h2>

          <div className="flex justify-center items-center gap-2 mt-2">
            <span className="w-8 sm:w-12 h-px bg-[#c9a96e]" />
            <span className="text-[#c9a96e] text-[8px]">
              ◆
            </span>
            <span className="w-8 sm:w-12 h-px bg-[#c9a96e]" />
          </div>

        </div>

        {/* FAQ List */}
        <div className="space-y-2 sm:space-y-3">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="
                  bg-white
                  border
                  border-[#e9e1d3]
                  rounded-sm
                  overflow-hidden
                "
              >

                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    gap-4

                    px-4
                    sm:px-5

                    py-3.5
                    sm:py-4

                    text-left

                    text-[#35352f]

                    text-[11px]
                    sm:text-xs
                    md:text-sm

                    font-medium

                    hover:text-[#293b25]

                    transition
                  "
                >
                  <span>{faq.question}</span>

                  <span className="
                    shrink-0
                    text-[#9d8150]
                  ">
                    {isOpen ? (
                      <FiMinus size={15} />
                    ) : (
                      <FiPlus size={15} />
                    )}
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`
                    grid
                    transition-all
                    duration-300
                    ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }
                  `}
                >
                  <div className="overflow-hidden">
                    <p className="
                      px-4
                      sm:px-5
                      pb-4

                      text-[10px]
                      sm:text-xs

                      leading-relaxed

                      text-gray-500

                      max-w-[800px]
                    ">
                      {faq.answer}
                    </p>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

        {/* Contact */}
        <div className="text-center mt-4 sm:mt-6">

          <p className="text-[10px] sm:text-xs text-gray-500">
            Still have questions?
          </p>

          <button className="
            mt-2
            text-[10px]
            sm:text-xs
            text-[#293b25]
            font-medium
            underline
            underline-offset-4
            hover:text-[#a48755]
          ">
            Contact Us →
          </button>

        </div>

      </div>

    </section>
  );
}