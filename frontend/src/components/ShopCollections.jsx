import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// const collections = [
//   {
//     title: "Everyday Jewellery",
//     image:
//       "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Traditional",
//     image:
//       "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Party Wear",
//     image:
//       "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Minimal",
//     image:
//       "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Bridal Collection",
//     image:
//       "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&q=80",
//   },
// ];

export default function ShopCollections() {
  const { collections } = useSelector((state) => state.collection);
  return (
    <section className="bg-[#fffdf8] ">
      {/* Heading */}
      <div className="text-center py-1">
        <h2 className=" font-serif text-[#293b25] text-lg md:text-2xl ">
          Shop by Collection
        </h2>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 ">
          <span className="w-8 sm:w-12 h-px bg-[#c9a96e]" />

          <span className="text-[#c9a96e] text-[9px]">◆</span>

          <span className="w-8 sm:w-12 h-px bg-[#c9a96e]" />
        </div>
      </div>

      {/* Collection Cards */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className=" flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-hide pb-2 ">
          {collections.map((collection) => (
            <CollectionCard key={collection?.name} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CollectionCard({ collection }) {
  const navigate = useNavigate();

  return (
    <button 
      className="
        relative
        shrink-0

        w-[150px]
        h-[105px]

        sm:w-[190px]
        sm:h-[125px]

        md:w-[220px]
        md:h-[145px]

        lg:w-[220px]
        lg:h-[155px]

        overflow-hidden
        rounded-md

        group
        text-left
      "
      onClick={() => navigate(`/collection/${collection._id}`)}
    >
      {/* Image */}
      <img
        src={collection.image}
        alt={collection.name}
        loading="lazy"
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover

          transition-transform
          duration-700
          group-hover:scale-110
        "
      />

      {/* Dark Gradient */}
      <div
        className="
          absolute
          inset-0

          bg-gradient-to-t
          from-black/75
          via-black/20
          to-transparent

          group-hover:from-black/85
          transition-all
          duration-300
        "
      />

      {/* Content */}
      <div
        className="
          absolute
          left-3
          bottom-3

          sm:left-4
          sm:bottom-4

          text-white
        "
      >
        <h3
          className="
            font-serif
            text-[12px]
            sm:text-sm
            md:text-base
            font-medium
          "
        >
          {collection.name}
        </h3>

        <p
          className="
            mt-1

            text-[8px]
            sm:text-[9px]
            md:text-[10px]

            opacity-90
            tracking-wide
          "
        >
          Explore Now →
        </p>
      </div>
    </button>
  );
}
