import { FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import NewArrivalCard from "./NewArrivalCard";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

// const newArrivals = [
//   {
//     id: 1,
//     name: "Pearl Drop Earrings",
//     image:
//       "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=80",
//     price: 899,
//   },

//   {
//     id: 2,
//     name: "Kundan Necklace Set",
//     image:
//       "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
//     price: 2499,
//   },
//   {
//     id: 8,
//     name: "Kundan Necklace Set",
//     image:
//       "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
//     price: 2499,
//   },
//   {
//     id: 9,
//     name: "Kundan Necklace Set",
//     image:
//       "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=700&q=80",
//     price: 2499,
//   },

//   {
//     id: 3,
//     name: "Butterfly Ring",
//     image:
//       "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=700&q=80",
//     price: 549,
//   },

//   {
//     id: 4,
//     name: "Layered Necklace",
//     image:
//       "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=700&q=80",
//     price: 1299,
//   },

//   {
//     id: 5,
//     name: "Bangle Set",
//     image:
//       "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=80",
//     price: 1199,
//   },

//   {
//     id: 6,
//     name: "Maang Tikka",
//     image:
//       "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=700&q=80",
//     price: 699,
//   },
// ];


export default function NewArrival() {
    const navigate = useNavigate();
  const {newArrivals} = useSelector((state) => state.product)
  return (
    <section className="bg-[#fffdf8] ">

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="flex px-2 md:px-5 items-center justify-between py-1 ">
            <button></button>

          <div >

            <h2
              className="
                font-serif
                text-[#293b25]
                text-lg
                md:text-2xl
              "
            >
              New Arrivals
            </h2>

            <div className="flex justify-center items-center gap-2 ">
              <span className="w-7 sm:w-10 h-px bg-[#c9a96e]" />

              <span className="text-[#c9a96e] text-[8px]">
                ◆
              </span>

              <span className="w-7 sm:w-10 h-px bg-[#c9a96e]" />
            </div>
          </div>

          <button
            onClick={()=> navigate("/new-arrivals")}
            className="
              text-[10px]
              sm:text-xs
              text-[#5a5a4e]
              underline
              underline-offset-4
              hover:text-[#293b25] cursor-pointer
            "
          >
            View All
          </button>

        </div>

        {/* Products */}
        <div className="relative ">

          {/* Left Arrow - Desktop */}
          {/* <button
            className="
              hidden
              lg:flex

              absolute
              -left-4
              top-1/2
              -translate-y-1/2
              z-10

              w-9
              h-9

              rounded-full
              bg-white
              border
              border-[#e6dfd2]

              items-center
              justify-center

              shadow-sm

              hover:bg-[#293b25]
              hover:text-white

              transition
            "
          >
            <FiChevronLeft size={18} />
          </button> */}

          <div
            className="
              flex
              gap-3
              sm:gap-4
              overflow-x-auto
              scrollbar-hide
            "
          >
            {newArrivals.slice(0,9).map((product) => (
              <NewArrivalCard
                key={product?._id}
                product={product}
              />
            ))}
          </div>

          {/* Right Arrow - Desktop */}
          {/* <button
            className="
              hidden
              lg:flex

              absolute
              -right-4
              top-1/2
              -translate-y-1/2
              z-10

              w-9
              h-9

              rounded-full
              bg-white
              border
              border-[#e6dfd2]

              items-center
              justify-center

              shadow-sm

              hover:bg-[#293b25]
              hover:text-white

              transition
            "
          >
            <FiChevronRight size={18} />
          </button> */}

        </div>

      </div>
    </section>
  );
}