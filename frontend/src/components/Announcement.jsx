
import React from "react";

const Announcement = () => {
  const announcements = [
    "🚚 Free Shipping on Orders Above 999",
    "🔄 Easy 7 Days Returns",
    "🎁 10% off on First Order - Use Code: WELCOME10",
  ];

  return (
    <div className="w-full h-9 bg-green-900 text-white overflow-hidden flex items-center">
      <div className="flex min-w-max animate-marquee">
        {/* First set */}
        {announcements.map((item, index) => (
          <span
            key={`first-${index}`}
            className="text-xs sm:text-sm font-medium px-6 whitespace-nowrap"
          >
            {item}
          </span>
        ))}

        {/* Duplicate set for infinite loop */}
        {announcements.map((item, index) => (
          <span
            key={`second-${index}`}
            className="text-xs sm:text-sm font-medium px-6 whitespace-nowrap"
          >
            {item}
          </span>
        ))}

        {announcements.map((item, index) => (
          <span
            key={`third-${index}`}
            className="text-xs sm:text-sm font-medium px-6 whitespace-nowrap"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Announcement;