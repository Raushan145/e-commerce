import ProductCard from "./ProductCard";
export default function JustForYou({ products = [] }) {
  return (
    <section className="bg-[#fffdf8] ">

      {/* Heading */}
      <div className="max-w-[1400px] mx-auto px-4  sm:px-6 lg:px-10">

        <div className="flex items-end justify-between py-2">

            <button></button>

          <div>
            <h2
              className="
                font-serif
                text-[#293b25]
                text-xl
                sm:text-xl
                md:text-2xl
                text-center
              "
            >
              Just For You
            </h2>

            <div className="flex items-center justify-center gap-2 ">
          <span className="w-8 sm:w-12 h-px bg-[#c9a96e]" />

          <span className="text-[#c9a96e] text-[9px]">
            ◆
          </span>

          <span className="w-8 sm:w-12 h-px bg-[#c9a96e]" />
        </div>
          </div>

          <button
            className="
              text-[10px]
              sm:text-xs
              text-[#5a5a4e]
              hover:text-[#293b25]
              underline
              underline-offset-4
            "
          >
            View All
          </button>

        </div>

        {/* Products */}
        <div
          className="
            flex
            gap-3
            sm:gap-4
            overflow-x-auto
            scrollbar-hide
            pb-2
            
          "
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
