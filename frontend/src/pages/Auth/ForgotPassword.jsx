import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FiMail, FiLock, FiShield, FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import {
  resetForgotPasswordThunk,
  sendForgotPasswordOtpThunk,
  verifyForgotPasswordOtpThunk,
} from "../../redux/User/userThunk";
import { useDispatch, useSelector } from "react-redux";

const ForgotPassword = () => {
  const primaryColor = "#293b25";
  const goldColor = "#b8955a";

  const [step, setStep] = useState(1);
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const [showEnterPassword, setShowEnterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(0);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { loading } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (resendSeconds <= 0) return;

    const timer = setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendSeconds]);


   useEffect(() => {
    if (!feedback ) return;
  
    const timer = setTimeout(() => {
      setFeedback({ type: "", text: "" })
    }, 5000);
  
    return () => clearTimeout(timer);
  }, [feedback, dispatch]);


  const setMessage = (type, text) => {
    setFeedback({ type, text });
  };

  const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const isValidPassword = (value) => {
    return value.length >= 6 && /[A-Z]/.test(value) && /\d/.test(value) && /[^A-Za-z0-9]/.test(value);
  };

  // SEND OTP
  const handleSendOtp = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage("error", "Please enter your email");
      return;
    }

    if (!isValidEmail(trimmedEmail)) {
      setMessage("error", "Please enter a valid email address");
      return;
    }

    const result = await dispatch(sendForgotPasswordOtpThunk(trimmedEmail));

    if (sendForgotPasswordOtpThunk.fulfilled.match(result)) {
      setMessage("success", result.payload?.message || "OTP sent successfully");
      setResendSeconds(60);
      setStep(2);
    } else {
      setMessage("error", result.payload || "Unable to send OTP");
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setMessage("error", "Please enter your email before verifying OTP");
      return;
    }

    if (!otp.trim()) {
      setMessage("error", "Please enter the OTP");
      return;
    }

    const result = await dispatch(
      verifyForgotPasswordOtpThunk({
        email: trimmedEmail,
        otp,
      })
    );

    if (verifyForgotPasswordOtpThunk.fulfilled.match(result)) {
      setMessage("success", result.payload?.message || "OTP verified successfully");
      setStep(3);
    } else {
      setMessage("error", result.payload || "Invalid OTP");
    }
  };

  // RESET PASSWORD
  const handleResetPassword = async () => {
    const trimmedEmail = email.trim();

    if (!newPassword || !confirmPassword) {
      setMessage("error", "Please fill both password fields");
      return;
    }

    if (!isValidPassword(newPassword)) {
      setMessage(
        "error",
        "Password must be at least 6 characters and include an uppercase letter, a number, and a special character"
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("error", "Passwords do not match");
      return;
    }

    const result = await dispatch(
      resetForgotPasswordThunk({
        email: trimmedEmail,
        newPassword,
      })
    );

    if (resetForgotPasswordThunk.fulfilled.match(result)) {
      setMessage("success", result.payload?.message || "Password reset successfully");
      setTimeout(() => navigate("/signin"), 700);
    } else {
      setMessage("error", result.payload || "Unable to reset password");
    }
  };

  const stepData = [
    {
      number: 1,
      title: "Email",
      icon: <FiMail />,
    },
    {
      number: 2,
      title: "Verify",
      icon: <FiShield />,
    },
    {
      number: 3,
      title: "Password",
      icon: <FiLock />,
    },
  ];

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-[#fffdfa] px-4 py-10 relative"
    >
      <div className="w-full max-w-[460px] ">

        {/* ==============================
            BACK BUTTON
        ============================== */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex justify-center items-center absolute left-7 top-15  bg-gray-200 px-3 py-1 rounded-full gap-2 text-sm text-gray-500 hover:text-[#293b25] transition cursor-pointer"
        >
          <IoIosArrowBack size={18} />
          Back
        </button>

        {/* ==============================
            MAIN CARD
        ============================== */}
        <div className="bg-white border border-[#eeeae2] rounded-2xl shadow-[0_15px_50px_rgba(41,59,37,0.08)] overflow-hidden">

          {/* ==============================
              HEADER
          ============================== */}
          <div className="px-6 sm:px-8 pt-8 pb-6 text-center">

            {/* Logo */}
            <div
              className="mx-auto mb-5 w-12 h-12 rounded-full flex items-center justify-center border"
              style={{
                color: primaryColor,
                borderColor: `${goldColor}55`,
                backgroundColor: "#faf7ef",
              }}
            >
              {step === 1 && <FiMail size={22} />}
              {step === 2 && <FiShield size={22} />}
              {step === 3 && <FiLock size={22} />}
            </div>

           
            <h1
              className="text-2xl sm:text-3xl font-semibold"
              style={{
                color: primaryColor,
                fontFamily: "serif",
              }}
            >
              {step === 1 && "Forgot Password?"}
              {step === 2 && "Verify Your Email"}
              {step === 3 && "Create New Password"}
            </h1>

            <p className="text-sm text-gray-500 mt-2 max-w-[330px] mx-auto leading-6">
              {step === 1 &&
                "Enter your registered email and we'll send you a verification code."}

              {step === 2 &&
                `We've sent a verification code to ${email}`}

              {step === 3 &&
                "Your identity has been verified. Create a new password for your account."}
            </p>
          </div>

          {/* ==============================
              STEP INDICATOR
          ============================== */}
          <div className="px-6 sm:px-8 pb-7">
            <div className="flex items-center">

              {stepData.map((item, index) => (
                <React.Fragment key={item.number}>

                  <div className="flex flex-col items-center min-w-[55px]">

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all duration-300 ${
                        step >= item.number
                          ? "text-white"
                          : "bg-[#f5f3ee] text-gray-400"
                      }`}
                      style={
                        step >= item.number
                          ? { backgroundColor: primaryColor }
                          : {}
                      }
                    >
                      {step > item.number ? (
                        <FiCheck size={16} />
                      ) : (
                        item.icon
                      )}
                    </div>

                    <span
                      className={`text-[10px] mt-2 font-medium ${
                        step >= item.number
                          ? "text-[#293b25]"
                          : "text-gray-400"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  {index < stepData.length - 1 && (
                    <div
                      className={`h-[1px] flex-1 mx-2 transition-all duration-300 ${
                        step > item.number
                          ? "bg-[#293b25]"
                          : "bg-[#e8e5dd]"
                      }`}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ==============================
              FORM
          ============================== */}
          <div className="px-6 sm:px-8 pb-4">

            {/* ==============================
                STEP 1
            ============================== */}
            {step === 1 && (
              <div>

                <label className="block text-sm font-medium text-[#293b25] mb-2">
                  Email Address
                </label>

                <div className="relative">

                  <FiMail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    size={18}
                  />

                  <input
                    type="email"
                    placeholder="Enter your registered email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendOtp();
                      }
                    }}
                    className="w-full h-12 rounded-xl border border-[#e5e1d8] bg-[#fffdfa] pl-11 pr-4 text-sm outline-none transition focus:border-[#b8955a] focus:ring-2 focus:ring-[#b8955a]/10"
                  />

                </div>

                <div className={`grid transition-all duration-300 ease-in-out ${feedback.text ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                        <div className={`rounded-lg border px-3 py-2 text-xs ${feedback.type === "success" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}>
                        {feedback.text || "\u00A0"}
                        </div>
                    </div>
                </div>

                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  className="w-full h-12 mt-6 rounded-xl text-sm font-semibold text-white flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  {loading ? (
                    <BeatLoader size={8} color="white" />
                  ) : (
                    "Send Verification Code"
                  )}
                </button>

                <p className="text-center text-xs text-gray-400 mt-5">
                  Make sure you enter the email linked to your Swarnika account.
                </p>

              </div>
            )}

            {/* ==============================
                STEP 2
            ============================== */}
            {step === 2 && (
              <div>

                <label className="block text-sm font-medium text-[#293b25] mb-2">
                  Verification Code
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleVerifyOtp();
                    }
                  }}
                  className="w-full h-14 rounded-xl border border-[#e5e1d8] bg-[#fffdfa] px-4 text-center text-xl tracking-[8px] font-semibold text-[#293b25] outline-none transition focus:border-[#b8955a] focus:ring-2 focus:ring-[#b8955a]/10"
                />

                <div className={`grid transition-all duration-300 ease-in-out ${feedback.text ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                        <div className={`rounded-lg border px-3 py-2 text-xs ${feedback.type === "success" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}>
                        {feedback.text || "\u00A0"}
                        </div>
                    </div>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full h-12 mt-6 rounded-xl text-sm font-semibold text-white flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  {loading ? (
                    <BeatLoader size={8} color="white" />
                  ) : (
                    "Verify Code"
                  )}
                </button>

                <div className="flex items-center justify-center gap-1 mt-5 text-xs">
                  <span className="text-gray-400">
                    {resendSeconds > 0
                      ? `Resend available in ${resendSeconds}s`
                      : "Didn't receive the code?"}
                  </span>

                  <button
                    onClick={handleSendOtp}
                    disabled={loading || resendSeconds > 0}
                    className="font-semibold cursor-pointer hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ color: goldColor }}
                  >
                    {resendSeconds > 0 ? "Wait" : "Resend OTP"}
                  </button>
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="block mx-auto mt-4 text-xs text-gray-400 hover:text-[#293b25] cursor-pointer"
                >
                  Change email
                </button>

              </div>
            )}

            {/* ==============================
                STEP 3
            ============================== */}
            {step === 3 && (
              <div>

                {/* New Password */}
                <div className="mb-5">

                  <label className="block text-sm font-medium text-[#293b25] mb-2">
                    New Password
                  </label>

                  <div className="relative">

                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={17}
                    />

                    <input
                      type={showEnterPassword ? "text" : "password"}
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) =>
                        setNewPassword(e.target.value)
                      }
                      className="w-full h-12 rounded-xl border border-[#e5e1d8] bg-[#fffdfa] pl-11 pr-12 text-sm outline-none transition focus:border-[#b8955a] focus:ring-2 focus:ring-[#b8955a]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowEnterPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#293b25] cursor-pointer"
                    >
                      {showEnterPassword ? (
                        <IoMdEyeOff size={19} />
                      ) : (
                        <IoMdEye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Confirm Password */}
                <div className="mb-5">

                  <label className="block text-sm font-medium text-[#293b25] mb-2">
                    Confirm Password
                  </label>

                  <div className="relative">

                    <FiLock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                      size={17}
                    />

                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) =>
                        setConfirmPassword(e.target.value)
                      }
                      className="w-full h-12 rounded-xl border border-[#e5e1d8] bg-[#fffdfa] pl-11 pr-12 text-sm outline-none transition focus:border-[#b8955a] focus:ring-2 focus:ring-[#b8955a]/10"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#293b25] cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <IoMdEyeOff size={19} />
                      ) : (
                        <IoMdEye size={19} />
                      )}
                    </button>

                  </div>

                </div>

                {/* Password Requirements */}
                <div className="rounded-xl bg-[#faf8f2] border border-[#eeeae2] p-4 mb-5">

                  <p className="text-xs font-semibold text-[#293b25] mb-2">
                    Password should contain
                  </p>

                  <div className="grid grid-cols-2 gap-y-2 text-[11px] text-gray-500">

                    <span className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#b8955a]" />
                      At least 6 characters
                    </span>

                    <span className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#b8955a]" />
                      One uppercase letter
                    </span>

                    <span className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#b8955a]" />
                      One number
                    </span>

                    <span className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#b8955a]" />
                      One special character
                    </span>

                  </div>

                </div>

                <div className={`grid transition-all duration-300 ease-in-out ${feedback.text ? "mt-4 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"}`}>
                    <div className="overflow-hidden">
                        <div className={`rounded-lg border px-3 py-2 text-xs ${feedback.type === "success" ? "border-green-200 bg-green-50 text-green-700" : "border-red-200 bg-red-50 text-red-700"}`}>
                        {feedback.text || "\u00A0"}
                        </div>
                    </div>
                </div>

                <button
                  onClick={handleResetPassword}
                  disabled={loading}
                  className="w-full h-12 rounded-xl text-sm font-semibold text-white flex items-center justify-center transition-all active:scale-[0.98] disabled:opacity-70 cursor-pointer"
                  style={{ backgroundColor: primaryColor }}
                >
                  {loading ? (
                    <BeatLoader size={8} color="white" />
                  ) : (
                    "Reset Password"
                  )}
                </button>

              </div>
            )}

          </div>

          {/* ==============================
              FOOTER
          ============================== */}
          <div className="border-t border-[#eeeae2] px-6 py-4 text-center bg-[#fffdfa]">

            <p className="text-[11px] text-gray-400">
              Your account security matters to{" "}
              <span
                className="font-semibold"
                style={{ color: primaryColor }}
              >
                SWARNIKA
              </span>
            </p>

          </div>

        </div>

        {/* SIGN IN */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Remember your password?{" "}
          <button
            onClick={() => navigate("/signin")}
            className="font-semibold cursor-pointer hover:underline"
            style={{ color: primaryColor }}
          >
            Sign In
          </button>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassword;