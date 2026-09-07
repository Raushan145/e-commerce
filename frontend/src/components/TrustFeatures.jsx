import React from "react";
import {
  
  FiAward,
  FiRefreshCw,
  FiTruck,
} from "react-icons/fi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const features = [
  {
    id: 1,
    icon: IoShieldCheckmarkOutline,
    title: "100% Secure Payment",
    description: "Safe & encrypted checkout",
  },
  {
    id: 2,
    icon: FiAward,
    title: "Premium Quality",
    description: "Crafted with finest materials",
  },
  {
    id: 3,
    icon: FiRefreshCw,
    title: "Easy Returns",
    description: "Hassle-free return policy",
  },
  {
    id: 4,
    icon: FiTruck,
    title: "Fast Shipping",
    description: "Quick & reliable delivery",
  },
];

const TrustFeatures = () => {
  return (
    <section className="w-full bg-[#f8f4eb] border-y border-[#eee5d6] my-2 ">
      <div
        className="
          max-w-[1400px]
          mx-auto
          px-3
          sm:px-6
          lg:px-10
          py-5
          sm:py-6
          md:py-7
        "
      >
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-y-6
            md:gap-y-0
          "
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className={`
                  flex
                  items-center
                  justify-center
                  gap-3
                  px-3
                  sm:px-5
                  md:px-4
                  lg:px-8

                  ${
                    index !== 0
                      ? "md:border-l md:border-[#ddd3c2]"
                      : ""
                  }
                `}
              >
                {/* Icon */}
                <div
                  className="
                    shrink-0
                    w-9
                    h-9
                    sm:w-11
                    sm:h-11

                    rounded-full

                    border
                    border-[#c9a96e]

                    bg-[#fffdf8]

                    flex
                    items-center
                    justify-center

                    text-[#293b25]

                    transition-all
                    duration-300

                    hover:bg-[#293b25]
                    hover:text-white
                  "
                >
                  <Icon
                    size={17}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Content */}
                <div className="min-w-0">
                  <h3
                    className="
                      text-[#293b25]
                      text-[9px]
                      sm:text-xs
                      md:text-sm

                      font-medium

                      whitespace-nowrap
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      text-[#8a877e]
                      text-[7px]
                      sm:text-[9px]
                      md:text-[10px]

                      mt-0.5

                      whitespace-nowrap
                    "
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustFeatures;
