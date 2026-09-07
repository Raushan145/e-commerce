import NewArrivalCard from "./NewArrivalCard";
export default function RecentlyView({ products = [] }) {

  // Don't show section when user has not viewed anything
  if (!products.length) return null;

  return (
    <section className="bg-[#fffdf8] ">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
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
              "
            >
              Recently Viewed
            </h2>

           <div className="flex items-center justify-center gap-2 ">
          <span className="w-8 sm:w-12 h-px bg-[#c9a96e]" />

          <span className="text-[#c9a96e] text-xs">◆</span>

          <span className="w-8 sm:w-12 h-px bg-[#c9a96e]" />
        </div>
          </div>

          <button
            className="
              text-[9px]
              sm:text-xs
              text-gray-500
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
          "
        >
          {products.map((product) => (
            <NewArrivalCard
              key={product._id}
              product={product}
            />
          ))}
        </div>

      </div>
    </section>
  );
}