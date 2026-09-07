import { useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



export default function CategorySection() {
  const {categories} = useSelector((state) => state.category)
  return (

    <section className="w-full bg-[#fffdf8]  ">
      {/* Heading */}
      <div className="text-center py-1">
        <h2
          className="
            font-serif
            text-[#293b25]
            text-lg
            md:text-2xl
          "
        >
          Shop by Category
        </h2>
        {/* Decorative line */}
        <div className="flex items-center justify-center gap-2 ">
          <span className="w-8 sm:w-12 h-px bg-[#c9a96e]" />

          <span className="text-[#c9a96e] text-xs">◆</span>

          <span className="w-8 sm:w-12 h-px bg-[#c9a96e]" />
        </div>
      </div>

      {/* Categories */}
      <div
        className="
          max-w-[1400px]
          mx-auto
          px-4
          sm:px-6
          lg:px-10
        "
      >
        <div
          className="
            flex
            gap-4
            sm:gap-6
            md:gap-5
            overflow-x-auto
            scrollbar-hide
            justify-start
            pb-2
          "
        >
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <button
      className="
        group
        flex
        flex-col
        items-center
        shrink-0
        w-[72px]
        sm:w-[82px]
        md:w-[90px]
        lg:w-[100px]
      "
      onClick={() => navigate(`/category/${category._id}`)}
    >
      {/* Image Circle */}
      <div
        className="
          relative
          w-[68px]
          h-[68px]
          sm:w-[76px]
          sm:h-[76px]
          md:w-[84px]
          md:h-[84px]
          lg:w-[92px]
          lg:h-[92px]

          rounded-full
          overflow-hidden

          bg-[#f5efe4]
          border
          border-[#eee3d0]

          transition-all
          duration-300

          group-hover:scale-105
          group-hover:border-[#c9a96e]
          group-hover:shadow-md
        "
      >
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        {/* Hover overlay */}
        <div
          className="
            absolute
            inset-0
            bg-black/0
            group-hover:bg-black/10
            transition
          "
        />
      </div>

      {/* Name */}
      <span
        className="
          mt-2
          sm:mt-3
          text-[10px]
          sm:text-xs
          md:text-sm
          text-[#39352e]
          font-medium
          text-center
        "
      >
        {category.name}
      </span>
    </button>
  );
}
