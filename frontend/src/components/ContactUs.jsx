import React, { useState } from "react";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
} from "react-icons/fi";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Contact Form:", formData);

    // API call yaha kar sakte ho
    // POST /api/contact

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <section className="bg-[#fffdf8] py-4 sm:py-10 mt-1 md:px-10 px-0">
      <div className="max-w-6xl mx-auto md:px-15 px-5">

        {/* Heading */}
        <div className="text-center mb-5">
          <p className="text-[#c9a96e] uppercase tracking-[0.25em] text-xs font-medium mb-3">
            We’re Here To Help
          </p>

          <h2 className="text-3xl sm:text-4xl font-serif text-[#293b25]">
            Contact Us
          </h2>

          <div className="flex items-center justify-center gap-3 mt-1">
            <span className="w-12 h-[1px] bg-[#c9a96e]" />
            <span className="text-[#c9a96e]">◇</span>
            <span className="w-12 h-[1px] bg-[#c9a96e]" />
          </div>

          <p className="text-gray-500 text-sm mt-1 max-w-xl mx-auto">
            Have a question about our jewellery, orders or delivery?
            We would love to hear from you.
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Left - Contact Information */}
          <div className="md:block hidden">
            <h3 className="text-2xl font-serif text-[#293b25] mb-6 ">
              Get In Touch
            </h3>

            <div className="space-y-5">

              {/* Address */}
              <div className="flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-full border border-[#c9a96e] flex items-center justify-center text-[#c9a96e]">
                  <FiMapPin size={19} />
                </div>

                <div>
                  <h4 className="text-[#293b25] font-medium">
                    Our Store
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    Your Store Address,<br />
                    Bhopal, Madhya Pradesh, India
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-full border border-[#c9a96e] flex items-center justify-center text-[#c9a96e]">
                  <FiPhone size={19} />
                </div>

                <div>
                  <h4 className="text-[#293b25] font-medium">
                    Call Us
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    +91 XXXXX XXXXX
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-full border border-[#c9a96e] flex items-center justify-center text-[#c9a96e]">
                  <FiMail size={19} />
                </div>

                <div>
                  <h4 className="text-[#293b25] font-medium">
                    Email Us
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    support@yourbrand.com
                  </p>
                </div>
              </div>

              {/* Timing */}
              <div className="flex gap-4">
                <div className="w-11 h-11 shrink-0 rounded-full border border-[#c9a96e] flex items-center justify-center text-[#c9a96e]">
                  <FiClock size={19} />
                </div>

                <div>
                  <h4 className="text-[#293b25] font-medium">
                    Working Hours
                  </h4>
                  <p className="text-gray-500 text-sm mt-1">
                    Monday – Saturday<br />
                    10:00 AM – 7:00 PM
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-[#f8f4eb] p-6 sm:p-8 mt-2 rounded-2xl">
            <h3 className="text-2xl font-serif text-[#293b25] mb-6">
              Send Us A Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid sm:grid-cols-2 gap-4">

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#c9a96e]"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#c9a96e]"
                />

              </div>

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-[#c9a96e]"
              />

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="4"
                required
                className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none resize-none focus:border-[#c9a96e]"
              />

              <button
                type="submit"
                className="w-full sm:w-auto px-7 py-2 cursor-pointer bg-[#293b25] text-white rounded-lg flex items-center justify-center gap-2 text-sm tracking-wide hover:bg-[#1f2d1c] transition"
              >
                <FiSend size={16} />
                SEND MESSAGE
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactUs;