import { useEffect, useState } from "react";
import {
  FiEye,
  FiEyeOff,
  FiMail,
  FiLock,
  FiArrowRight,
} from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { googleAuthThunk, signinThunk } from "../../redux/User/userThunk";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../../firebase";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await dispatch(signinThunk(formData)).unwrap();
      navigate(response.user?.role?.toLowerCase() === "owner" ? "/owner" : "/", { replace: true });
    } catch (submitError) {
      setError(submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await dispatch(
        googleAuthThunk({
          email: user.email,
          name: user.displayName || user.email?.split("@")[0] || "Google User",
          mobile: "",
          profileImage: {
            url: user.photoURL || "",
            public_id: user.photoURL || "",
          },
          role: "user",
        })
      ).unwrap();

      navigate(response.user?.role?.toLowerCase() === "owner" ? "/owner" : "/", { replace: true });
    } catch (error) {
      console.error("Google login failed:", error);
      setError(error?.message || "Google sign-in failed. Please try again.");
    }
  };

   
    useEffect(() => {
    if (!error) return;
  
    const timer = setTimeout(() => {
      setError("")
    }, 5000);
  
    return () => clearTimeout(timer);
  }, [error, dispatch]);
  

  return (
    <main
      className="
        min-h-screen
        relative
        flex
        items-center
        justify-center
        px-4
        py-8
        overflow-hidden
        select-none
        bg-[#182017]
      "
    >

      {/* ================= BACKGROUND IMAGE ================= */}
      <img
        src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=2000&q=85"
        alt=""
        className="
          absolute
          inset-0
          w-full
          h-full
          object-cover
        "
      />

      {/* ================= DARK OVERLAY ================= */}
      <div
        className="
          absolute
          inset-0
          bg-[#182017]/65
        "
      />

      {/* ================= SOFT GRADIENT ================= */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-[#182017]/80
          via-transparent
          to-[#11150f]/80
        "
      />

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 w-full max-w-[420px]">

        {/* ================= LOGIN CARD ================= */}
        <div
          className="
            bg-[#fffdf8]/95
            backdrop-blur-xl
            border
            border-[#e8ddc9]
            rounded-xl
            shadow-[0_25px_80px_rgba(0,0,0,0.35)]
            px-6
            py-8
            sm:px-9
            sm:py-5
          "
        >

          {/* ================= BRAND ================= */}
          <div className="text-center">

            <div className="flex items-center justify-center gap-3">

              <span className="w-8 h-px bg-[#c9a96e]" />

              <span className="text-[#c9a96e] text-xs">
                ✦
              </span>

              <span className="w-8 h-px bg-[#c9a96e]" />

            </div>

            <h1
              onClick={() => navigate("/")}
              className="
                font-serif
                text-3xl
                sm:text-4xl
                tracking-[5px]
                text-[#293b25]
                
              "
            >
              SWARNIKA
            </h1>

            <p
              className="
                text-[8px]
                tracking-[4px]
                text-[#8a877b]
                mt-1
              "
            >
              JEWELLERY & FASHION
            </p>

          </div>


          {/* ================= HEADING ================= */}
          <div className="text-center mt-2">

            <h2
              className="
                font-serif
                text-sm
                sm:text-xl
                text-[#30352c]
              "
            >
              Welcome Back
            </h2>

            <p className="text-[11px] sm:text-xs text-[#8b887e] ">
              Sign in to continue your journey with us
            </p>

          </div>


          {/* ================= FORM ================= */}
          <form
            onSubmit={handleSubmit}
            className="mt-5"
          >
            {error && <p className="mb-3 text-center text-xs text-red-600">{error}</p>}

            {/* EMAIL */}
            <div>

              <label
                className="
                  block
                  text-[9px]
                  uppercase
                  tracking-[1.5px]
                  font-medium
                  text-[#56594f]
                  mb-2
                "
              >
                Email Address
              </label>

              <div className="relative">

                <FiMail
                  size={15}
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-[#aaa397]
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="
                    w-full
                    h-9

                    pl-10
                    pr-3

                    rounded-md

                    border
                    border-[#ddd5c7]

                    bg-[#fffefa]

                    text-sm
                    text-[#33362f]

                    placeholder:text-[#aaa69c]

                    outline-none

                    focus:border-[#b89a60]
                    focus:ring-1
                    focus:ring-[#c9a96e]/30

                    transition
                  "
                />

              </div>

            </div>


            {/* PASSWORD */}
            <div className="mt-3">

              <div className="flex items-center justify-between mb-2">

                <label
                  className="
                    text-[9px]
                    uppercase
                    tracking-[1.5px]
                    font-medium
                    text-[#56594f]
                  "
                >
                  Password
                </label>

                <button
                  onClick={() => navigate("/forget-password")}
                  type="button"
                  className="
                    text-[10px]
                    text-[#8d7650]
                    hover:text-[#293b25]
                    transition
                  "
                >
                  Forgot Password?
                </button>

              </div>

              <div className="relative">

                <FiLock
                  size={15}
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-[#aaa397]
                  "
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="
                    w-full
                    h-9

                    pl-10
                    pr-11

                    rounded-md

                    border
                    border-[#ddd5c7]

                    bg-[#fffefa]

                    text-sm
                    text-[#33362f]

                    placeholder:text-[#aaa69c]

                    outline-none

                    focus:border-[#b89a60]
                    focus:ring-1
                    focus:ring-[#c9a96e]/30

                    transition
                  "
                />

                {/* SHOW / HIDE */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-[#8d8a81]
                    hover:text-[#293b25]
                    transition
                  "
                >
                  {showPassword ? (
                    <FiEyeOff size={16} />
                  ) : (
                    <FiEye size={16} />
                  )}
                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                group

                w-full
                h-9

                mt-4

                rounded-xl

                bg-[#293b25]
                hover:bg-[#1e2e1a]

                text-white

                flex
                items-center
                justify-center
                gap-2

                text-[10px]
                sm:text-xs

                tracking-[1.5px]
                font-medium

                shadow-[0_6px_18px_rgba(41,59,37,0.18)]

                transition-all
                duration-300
              "
            >
              {isSubmitting ? "SIGNING IN..." : "SIGN IN"}

              <FiArrowRight
                size={14}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </button>

          </form>


          {/* ================= DIVIDER ================= */}
          <div className="flex items-center gap-3 my-3">

            <span className="flex-1 h-px bg-[#e6dfd3]" />

            <span
              className="
                text-[9px]
                text-[#aaa398]
                uppercase
                tracking-wider
              "
            >
              Or continue with
            </span>

            <span className="flex-1 h-px bg-[#e6dfd3]" />

          </div>


          {/* ================= GOOGLE ================= */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="
              w-full
              h-9

              rounded-xl

              border
              border-[#ddd5c7]

              bg-white

              flex
              items-center
              justify-center
              gap-3

              text-xs
              font-medium
              text-[#464840]

              hover:bg-[#faf8f3]
              hover:border-[#c9bda9]

              transition-all
              duration-300
            "
          >

            <FcGoogle size={18} />

            Continue with Google

          </button>


          {/* ================= SIGN UP ================= */}
          <div className="text-center mt-3">

            <p className="text-[11px] text-[#8b887e]">

              Don't have an account?

              <Link
                to="/signup"
                className="
                  ml-1.5
                  text-[#293b25]
                  font-medium
                  hover:text-[#a07d43]
                  transition
                "
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>


        {/* ================= BOTTOM TEXT ================= */}
        <p
          className="
            text-center
            text-[8px]
            sm:text-[9px]
            text-white/55
            tracking-wide
            mt-2
          "
        >
          © 2026 Swarnika · Crafted for timeless elegance
        </p>

      </div>

    </main>
  );
};

export default Signin;