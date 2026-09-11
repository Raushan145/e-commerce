import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiLock, FiShield, FiLogOut, FiAlertTriangle } from "react-icons/fi";
import { logoutAllDevicesThunk } from "../../redux/User/userThunk";
import { useNavigate } from "react-router-dom";

const PasswordSecurity = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.user);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogoutAll = async () => {
    const result = await dispatch(logoutAllDevicesThunk());

    if (logoutAllDevicesThunk.fulfilled.match(result)) {
      window.location.href = "/signin";
    }
  };

  return (
    <div className="min-h-screen bg-[#fffdfa] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Password & Security
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your password and account security
          </p>
        </div>

        {/* Password */}
        <div className="mb-5 rounded-2xl border border-[#eeeae2] bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f6f1e8] text-[#8b6b32]">
              <FiLock size={20} />
            </div>

            <div className="flex-1">
              <h2 className="font-medium text-gray-900">
                Password
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Keep your account secure with a strong password.
              </p>

              <button
               onClick={() => navigate("/forget-password")}
                type="button"
                className="mt-4 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Email Verification */}
        <div className="mb-5 rounded-2xl border border-[#eeeae2] bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f6f1e8] text-[#8b6b32]">
              <FiShield size={20} />
            </div>

            <div className="flex-1">
              <h2 className="font-medium text-gray-900">
                Email Verification
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your email address is used to secure your account and
                recover your password.
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500" />

                <span className="text-sm font-medium text-green-600">
                  Email Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Logout All Devices */}
        <div className="mb-5 rounded-2xl border border-[#eeeae2] bg-white p-5 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f6f1e8] text-[#8b6b32]">
              <FiLogOut size={20} />
            </div>

            <div className="flex-1">
              <h2 className="font-medium text-gray-900">
                Logout from all devices
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                This will sign you out from all devices where your
                SWARNIKA account is currently logged in.
              </p>

              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="mt-4 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
              >
                Logout All Devices
              </button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-2xl border border-red-100 bg-red-50/40 p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              <FiAlertTriangle size={20} />
            </div>

            <div>
              <h2 className="font-medium text-gray-900">
                Account Security
              </h2>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Never share your password or verification codes with
                anyone.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-[2px]"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <FiLogOut size={21} />
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              Logout from all devices?
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              All active sessions will be invalidated and you will need
              to login again.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleLogoutAll}
                disabled={loading}
                className="flex-1 rounded-lg bg-[#293b25] px-4 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging out..." : "Logout All"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordSecurity;