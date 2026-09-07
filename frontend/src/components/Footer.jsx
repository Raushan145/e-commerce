import React from "react";
import {
  FiPhone,
  FiMail,
  FiClock,
  FiInstagram,
  FiFacebook,
  FiTwitter,
  FiArrowUpRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#182017] text-white">

      {/* ================= TOP BRAND STRIP ================= */}
      <div className="border-b border-[#c9a96e]/20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <span className="w-8 sm:w-10 h-px bg-[#c9a96e]" />

                <span className="text-[#c9a96e] text-[9px]">
                  ✦
                </span>

                <span className="text-[9px] tracking-[4px] text-[#c9a96e] uppercase">
                  Since 2026
                </span>
              </div>

              <h2
                className="
                  mt-2
                  font-serif
                  text-2xl
                  sm:text-3xl
                  tracking-[5px]
                  text-[#f5efe3]
                "
              >
                SWARNIKA
              </h2>

              <p className="text-[8px] tracking-[5px] text-[#a8aa9d] mt-1">
                JEWELLERY & FASHION
              </p>
            </div>

            {/* Tagline */}
            <p
              className="
                max-w-md
                text-xs
                sm:text-sm
                leading-6
                text-[#aeb2a7]
                md:text-right
              "
            >
              Timeless jewellery, thoughtfully crafted for
              <span className="text-[#d2b477]"> every special moment.</span>
            </p>

          </div>
        </div>
      </div>


      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-12">

        <div
          className="
            grid
            grid-cols-2
            lg:grid-cols-4
            gap-x-7
            gap-y-10
            lg:gap-x-16
          "
        >

          {/* ================= BRAND ================= */}
          <div className="col-span-2 lg:col-span-1">

            <h3
              className="
                text-[11px]
                uppercase
                tracking-[2px]
                text-[#d2b477]
                font-medium
                mb-4
              "
            >
              About Swarnika
            </h3>

            <p
              className="
                text-xs
                sm:text-sm
                text-[#9fa49b]
                leading-6
                max-w-xs
              "
            >
              Discover elegant jewellery designed to celebrate
              your everyday moments and unforgettable occasions.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mt-6">

              <a
                href="#"
                aria-label="Instagram"
                className="
                  w-9
                  h-9
                  rounded-full
                  border
                  border-[#c9a96e]/30
                  flex
                  items-center
                  justify-center
                  text-[#b8b9ae]
                  hover:bg-[#c9a96e]
                  hover:text-[#182017]
                  hover:border-[#c9a96e]
                  transition-all
                  duration-300
                "
              >
                <FiInstagram size={15} />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="
                  w-9
                  h-9
                  rounded-full
                  border
                  border-[#c9a96e]/30
                  flex
                  items-center
                  justify-center
                  text-[#b8b9ae]
                  hover:bg-[#c9a96e]
                  hover:text-[#182017]
                  hover:border-[#c9a96e]
                  transition-all
                  duration-300
                "
              >
                <FiFacebook size={15} />
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="
                  w-9
                  h-9
                  rounded-full
                  border
                  border-[#c9a96e]/30
                  flex
                  items-center
                  justify-center
                  text-[#b8b9ae]
                  hover:bg-[#c9a96e]
                  hover:text-[#182017]
                  hover:border-[#c9a96e]
                  transition-all
                  duration-300
                "
              >
                <FiTwitter size={15} />
              </a>

            </div>
          </div>


          {/* ================= QUICK LINKS ================= */}
          <div>

            <h3
              className="
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[2px]
                text-[#e0c68f]
                font-medium
                mb-5
              "
            >
              Quick Links
            </h3>

            <ul className="space-y-3">

              {[
                ["About Us", "/about"],
                ["Shop", "/shop"],
                ["New Arrivals", "/new-arrivals"],
                ["Best Sellers", "/best-sellers"],
                ["Contact Us", "/contact"],
              ].map(([label, link]) => (
                <li key={label}>
                  <Link
                    to={link}
                    className="
                      group
                      flex
                      items-center
                      gap-1
                      w-fit

                      text-[11px]
                      sm:text-xs

                      text-[#969c92]

                      hover:text-[#f2e8d5]

                      transition
                    "
                  >
                    {label}

                    <FiArrowUpRight
                      size={11}
                      className="
                        opacity-0
                        -translate-x-1
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        transition-all
                      "
                    />
                  </Link>
                </li>
              ))}

            </ul>
          </div>


          {/* ================= HELP ================= */}
          <div>

            <h3
              className="
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[2px]
                text-[#e0c68f]
                font-medium
                mb-5
              "
            >
              Help & Support
            </h3>

            <ul className="space-y-3">

              {[
                ["Shipping Policy", "/shipping-policy"],
                ["Return & Refund", "/return-refund"],
                ["Privacy Policy", "/privacy-policy"],
                ["Terms & Conditions", "/terms"],
                ["FAQ", "/faq"],
                ["Track Order", "/track-order"],
              ].map(([label, link]) => (
                <li key={label}>
                  <Link
                    to={link}
                    className="
                      group
                      flex
                      items-center
                      gap-1
                      w-fit

                      text-[11px]
                      sm:text-xs

                      text-[#969c92]

                      hover:text-[#f2e8d5]

                      transition
                    "
                  >
                    {label}

                    <FiArrowUpRight
                      size={11}
                      className="
                        opacity-0
                        -translate-x-1
                        group-hover:opacity-100
                        group-hover:translate-x-0
                        transition-all
                      "
                    />
                  </Link>
                </li>
              ))}

            </ul>
          </div>


          {/* ================= CUSTOMER CARE ================= */}
          <div className="col-span-2 lg:col-span-1">

            <h3
              className="
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[2px]
                text-[#e0c68f]
                font-medium
                mb-5
              "
            >
              Customer Care
            </h3>


            {/* Mobile */}
            <div className="flex items-start gap-3 mb-4">

              <div
                className="
                  w-8
                  h-8
                  shrink-0
                  rounded-full
                  bg-[#c9a96e]/10
                  flex
                  items-center
                  justify-center
                  text-[#d2b477]
                "
              >
                <FiPhone size={14} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-wider text-[#6f776c] mb-1">
                  Call Us
                </p>

                <a
                  href="tel:+919999999999"
                  className="text-xs sm:text-sm text-[#c8cbc2] hover:text-white transition"
                >
                  +91 99999 99999
                </a>
              </div>

            </div>


            {/* Email */}
            <div className="flex items-start gap-3 mb-4">

              <div
                className="
                  w-8
                  h-8
                  shrink-0
                  rounded-full
                  bg-[#c9a96e]/10
                  flex
                  items-center
                  justify-center
                  text-[#d2b477]
                "
              >
                <FiMail size={14} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-wider text-[#6f776c] mb-1">
                  Email
                </p>

                <a
                  href="mailto:support@swarnika.com"
                  className="text-xs sm:text-sm text-[#c8cbc2] hover:text-white transition break-all"
                >
                  support@swarnika.com
                </a>
              </div>

            </div>


            {/* Hours */}
            <div className="flex items-start gap-3">

              <div
                className="
                  w-8
                  h-8
                  shrink-0
                  rounded-full
                  bg-[#c9a96e]/10
                  flex
                  items-center
                  justify-center
                  text-[#d2b477]
                "
              >
                <FiClock size={14} />
              </div>

              <div>
                <p className="text-[9px] uppercase tracking-wider text-[#6f776c] mb-1">
                  Support Hours
                </p>

                <p className="text-xs sm:text-sm text-[#c8cbc2]">
                  Mon - Fri
                </p>

                <p className="text-[10px] sm:text-xs text-[#777e74] mt-0.5">
                  10:00 AM - 7:00 PM
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>


      {/* ================= NEWSLETTER / TRUST ================= */}
      <div className="border-t border-[#c9a96e]/15">

        <div
          className="
            max-w-7xl
            mx-auto
            px-5
            sm:px-8
            lg:px-10
            py-6
          "
        >

          <div
            className="
              flex
              flex-col
              sm:flex-row
              items-center
              justify-between
              gap-4
            "
          >

            <div className="flex items-center gap-2 text-center sm:text-left">

              <span className="text-[#c9a96e] text-xs">
                ✦
              </span>

              <p className="text-[9px] sm:text-[10px] text-[#777e74] tracking-wide">
                Secure payments · Premium quality · Easy returns · Fast shipping
              </p>

            </div>

            <p className="text-[9px] text-[#686f65]">
              © 2026 Swarnika. All rights reserved.
            </p>

          </div>

        </div>
      </div>


      {/* ================= BOTTOM ================= */}
      <div className="bg-[#121812]">

        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-3">

          <p className="text-center text-[8px] sm:text-[9px] tracking-[2px] text-[#555c54] uppercase">
            Crafted with care for jewellery lovers
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;