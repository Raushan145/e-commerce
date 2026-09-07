import { useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiArrowRight,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getActiveBannersThunk } from "../redux/Banner/bannerThunk";

export default function Banner() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activeBanners = [], loading } = useSelector(
    (state) => state.banner,
  );

  const [current, setCurrent] = useState(0);

  // ==========================================
  // GET ACTIVE BANNERS
  // ==========================================

  useEffect(() => {
    dispatch(getActiveBannersThunk());
  }, [dispatch]);

  // ==========================================
  // AUTO SLIDE
  // ==========================================

  useEffect(() => {
    if (activeBanners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrent(
        (prev) => (prev + 1) % activeBanners.length,
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [activeBanners.length]);

  // ==========================================
  // RESET SLIDE
  // ==========================================

  useEffect(() => {
    setCurrent(0);
  }, [activeBanners.length]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading && activeBanners.length === 0) {
    return (
      <section className="w-full px-3 py-2 sm:px-5 lg:px-6">
        <div
          className="
            mx-auto
            h-[145px]
            max-w-[1400px]
            animate-pulse
            rounded-lg
            bg-gray-100

            sm:h-[175px]
            md:h-[205px]
            lg:h-[230px]
          "
        />
      </section>
    );
  }

  // ==========================================
  // NO BANNER
  // ==========================================

  if (activeBanners.length === 0) {
    return null;
  }

  const banner =
    activeBanners[current] || activeBanners[0];

  // ==========================================
  // NAVIGATION
  // ==========================================

  const nextSlide = () => {
    setCurrent(
      (prev) => (prev + 1) % activeBanners.length,
    );
  };

  const prevSlide = () => {
    setCurrent(
      (prev) =>
        (prev - 1 + activeBanners.length) %
        activeBanners.length,
    );
  };

  // ==========================================
  // BUTTON
  // ==========================================

  const handleButton = () => {
    if (banner.buttonLink) {
      navigate(banner.buttonLink);
    }
  };

  return (
    <section className="w-full px-3 py-2 sm:px-5 lg:px-6">
      <div
        className="
          relative
          mx-auto
          max-w-[1400px]

          h-[145px]
          sm:h-[175px]
          md:h-[205px]
          lg:h-[230px]

          overflow-hidden
          rounded-lg
          sm:rounded-xl

          bg-[#e4c99d]

          shadow-[0_5px_25px_rgba(41,59,37,0.08)]
        "
      >
        {/* ======================================
            IMAGE
        ====================================== */}

        <img
          key={banner._id}
          src={banner.image}
          alt={banner.title || banner.tag || "Banner"}
          className="
            absolute
            inset-0

            h-full
            w-full

            object-cover

            animate-[fadeIn_0.6s_ease-in-out]
          "
        />

        {/* ======================================
            MAIN OVERLAY
        ====================================== */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-r
            from-[#ead0a5]/95
            via-[#dfc193]/70
            via-45%
            to-transparent
          "
        />

        {/* ======================================
            BOTTOM OVERLAY
        ====================================== */}

        <div
          className="
            absolute
            inset-x-0
            bottom-0

            h-24

            bg-gradient-to-t
            from-black/20
            via-black/5
            to-transparent
          "
        />

        {/* ======================================
            CONTENT
        ====================================== */}

        <div
          className="
            absolute
            inset-0
            z-10

            px-8
            sm:px-12
            md:px-16
            lg:px-15

            py-5
            sm:py-7
            md:py-8
          "
        >
          {/* ====================================
              TEXT CONTENT
          ==================================== */}

          <div className="max-w-[460px]">
            {/* TAG */}

            {banner.tag && (
              <div
                className="
                  mb-1.5
                  flex
                  items-center
                  gap-2

                  sm:mb-2.5
                "
              >
                <span
                  className="
                    h-px
                    w-5
                    bg-[#a27e42]

                    sm:w-7
                  "
                />

                <span
                  className="
                    text-[7px]
                    font-medium
                    uppercase
                    tracking-[2px]
                    text-[#765d32]

                    sm:text-[9px]
                    sm:tracking-[3px]
                  "
                >
                  {banner.tag}
                </span>
              </div>
            )}

            {/* TITLE */}

            {(banner.title || banner.subtitle) && (
            <h1
              className="
                flex
                flex-wrap
                items-baseline
                gap-x-2

                font-serif
                text-[#293b25]

                text-[27px]
                leading-none

                sm:text-[38px]
                md:text-[47px]
                lg:text-[55px]
              "
            >
              {banner.title && (
                <span>
                  {banner.title}
                </span>
              )}

              {banner.subtitle && (
                <span className="text-[#425a38]">
                  {banner.subtitle}
                </span>
              )}
            </h1>
)}

            {/* DESCRIPTION */}

            {banner.description && (
              <p
                className="
                  mt-2
                  max-w-[320px]

                  text-[9px]
                  leading-relaxed
                  text-[#514b3e]

                  sm:text-[10px]
                  md:mt-3
                  md:text-xs
                  lg:text-sm
                "
              >
                {banner.description}
              </p>
            )}
          </div>
        </div>

        {/* ======================================
            BOTTOM BUTTON
            ALWAYS BOTTOM
        ====================================== */}

        {banner.buttonText && (
          <button
            type="button"
            onClick={handleButton}
            className="
              group

              absolute
              bottom-4
              left-8
              z-20

              flex
              items-center
              gap-2

              rounded-sm

              bg-[#293b25]
              px-3
              py-1.5

              text-[8px]
              font-medium
              tracking-wide
              text-white

              shadow-sm

              transition-all
              duration-300

              hover:bg-[#1d2c1a]
              hover:shadow-md

              sm:bottom-5
              sm:left-12
              sm:px-5
              sm:py-2.5
              sm:text-[10px]

              md:left-16
              md:text-xs

              lg:left-20
            "
          >
            {banner.buttonText}

            <FiArrowRight
              size={12}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          </button>
        )}

        {/* ======================================
            PREVIOUS
        ====================================== */}

        {activeBanners.length > 1 && (
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous banner"
            className="
              absolute
              left-2
              top-1/2
              z-20

              flex
              h-7
              w-7
              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              bg-white/80
              text-[#293b25]

              shadow-sm
              backdrop-blur-sm

              transition

              hover:bg-[#293b25]
              hover:text-white

              sm:left-3
              sm:h-8
              sm:w-8

              md:left-4
              md:h-9
              md:w-9
            "
          >
            <FiChevronLeft size={16} />
          </button>
        )}

        {/* ======================================
            NEXT
        ====================================== */}

        {activeBanners.length > 1 && (
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next banner"
            className="
              absolute
              right-2
              top-1/2
              z-20

              flex
              h-7
              w-7
              -translate-y-1/2

              items-center
              justify-center

              rounded-full

              bg-white/80
              text-[#293b25]

              shadow-sm
              backdrop-blur-sm

              transition

              hover:bg-[#293b25]
              hover:text-white

              sm:right-3
              sm:h-8
              sm:w-8

              md:right-4
              md:h-9
              md:w-9
            "
          >
            <FiChevronRight size={16} />
          </button>
        )}

        {/* ======================================
            DOTS
        ====================================== */}

        {activeBanners.length > 1 && (
          <div
            className="
              absolute
              bottom-2.5
              left-1/2
              z-20

              flex
              -translate-x-1/2
              items-center
              gap-1.5

              sm:bottom-4
            "
          >
            {activeBanners.map((item, index) => (
              <button
                key={item._id}
                type="button"
                onClick={() => setCurrent(index)}
                aria-label={`Go to banner ${index + 1}`}
                className={`
                  rounded-full
                  transition-all
                  duration-300

                  ${
                    current === index
                      ? "h-1.5 w-5 bg-[#293b25]"
                      : "h-1.5 w-1.5 bg-[#293b25]/40"
                  }
                `}
              />
            ))}
          </div>
        )}

        {/* ======================================
            SLIDE NUMBER
        ====================================== */}

        {activeBanners.length > 1 && (
          <div
            className="
              absolute
              bottom-4
              right-5
              z-20

              hidden
              items-center
              gap-1

              text-[9px]
              tracking-widest
              text-[#293b25]/70

              md:flex
            "
          >
            <span>
              {String(current + 1).padStart(2, "0")}
            </span>

            <span className="text-[#293b25]/30">
              /
            </span>

            <span>
              {String(activeBanners.length).padStart(2, "0")}
            </span>
          </div>
        )}
      </div>

      {/* ========================================
          ANIMATION
      ======================================== */}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(1.02);
          }

          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}