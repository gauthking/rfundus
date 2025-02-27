import React, { useState } from "react";
import { CiUser } from "react-icons/ci";
import { countryCodes } from "@/utils/exports";
import { useRouter } from "next/navigation";

const AuthMerchant = () => {
  const [identifier, setIdentifier] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [signUpFlag, setSignUpFlag] = useState<"login" | "signup">("login");
  const [method, setMethod] = useState<"email" | "mobile">("email");
  const [countryCode, setCountryCode] = useState<string>("+1");

  const router = useRouter();

  const showAlert = (message: string, isSuccess = true) => {
    isSuccess ? setSuccess(message) : setError(message);
    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);
  };

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const payload = {
        type: method,
        value: method === "mobile" ? `${countryCode}${identifier}` : identifier,
      };
      const response = await fetch("/api/otp/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      showAlert(
        `OTP sent successfully. Check your ${
          method === "email" ? "Email" : "SMS"
        }.`
      );
      setOtpSent(true);
    } catch (err) {
      showAlert("Failed to send OTP. Please try again.", false);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthentication = async () => {
    try {
      setLoading(true);
      await handleVerifyOtp();

      const payload = {
        type: method,
        value: method === "mobile" ? `${countryCode}${identifier}` : identifier,
        role: "merchant",
      };

      const response = await fetch(
        signUpFlag === "signup" ? "/api/auth/signup" : "/api/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        showAlert(`An error occured - ${data.message}`, false);
        throw new Error(data.message);
      }

      showAlert(`${signUpFlag === "signup" ? "Sign Up" : "Login"} Successful!`);

      router.push("/dashlanding");
    } catch (err) {
      console.log(err);
      showAlert(`Authentication failed. Please try again. - ${err}`, false);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const payload = {
        type: method,
        value: method === "mobile" ? `${countryCode}${identifier}` : identifier,
        otp,
      };

      const response = await fetch("/api/otp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      showAlert("OTP Verified!");
    } catch (error) {
      console.log(error);
      showAlert(`OTP Verification failed. Please try again. - ${error}`, false);
    }
  };

  const handleAuthType = (type: "login" | "signup") => {
    setIdentifier("");
    setOtp("");
    setOtpSent(false);
    setSignUpFlag(type);
  };

  const handleMethodChange = (method: "email" | "mobile") => {
    setMethod(method);
    setIdentifier("");
  };

  return (
    <section className="p-3 flex flex-col w-full h-full">
      {error && <p className="text-red-500 font-semibold">{error}</p>}
      {success && <p className="text-green-500 font-semibold">{success}</p>}

      {!otpSent ? (
        <>
          <div className="flex flex-col my-2">
            <p className="font-kanitmedium opacity-80 mx-2">Select Method:</p>
            <div className="flex gap-2 my-2">
              <button
                className={`px-4 py-2 rounded-lg border ${
                  method === "email"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handleMethodChange("email")}
              >
                Email
              </button>
              <button
                className={`px-4 py-2 rounded-lg border ${
                  method === "mobile"
                    ? "bg-black text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => handleMethodChange("mobile")}
              >
                Phone Number
              </button>
            </div>
          </div>

          <div className="flex flex-col my-2">
            <p className="font-kanitmedium opacity-80 mx-2">
              {method === "email" ? "Email Address:" : "Phone Number:"}
            </p>
            <div className="flex items-center gap-2 border p-2 rounded-lg">
              {method === "mobile" && (
                <select
                  className="border rounded-lg p-2"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countryCodes.map((c) => (
                    <option
                      key={c.code}
                      value={c.code}
                    >{`${c.country} (${c.code})`}</option>
                  ))}
                </select>
              )}
              <CiUser />
              <input
                type="text"
                className="rounded-lg outline-none w-full"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={
                  method === "email"
                    ? "Enter merchant email"
                    : "Enter merchant mobile number"
                }
              />
            </div>
          </div>

          <button
            className="font-mono p-3 w-full bg-black text-white rounded-xl my-4 hover:bg-gray-800"
            onClick={handleSendOtp}
            disabled={loading}
          >
            {loading
              ? "Sending OTP..."
              : signUpFlag === "signup"
              ? "OTP & Sign Up"
              : "OTP & Login"}
          </button>
        </>
      ) : (
        <>
          <div className="flex flex-col my-2">
            <p className="font-kanitmedium opacity-80 mx-2">Enter OTP:</p>
            <div className="flex items-center gap-2 border p-2 rounded-lg">
              <input
                type="text"
                className="rounded-lg outline-none w-full"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
              />
            </div>
          </div>

          <button
            className="font-mono p-3 w-full bg-black text-white rounded-xl my-4 hover:bg-gray-800"
            onClick={handleAuthentication}
            disabled={loading}
          >
            {loading
              ? "Processing..."
              : signUpFlag === "signup"
              ? "Sign Up"
              : "Login"}
          </button>
        </>
      )}

      <div className="text-sm text-gray-500 mx-3">
        {signUpFlag === "login" ? (
          <button
            onClick={() => handleAuthType("signup")}
            className="underline underline-offset-4 font-mono"
          >
            Not Registered? Sign Up
          </button>
        ) : (
          <button
            onClick={() => handleAuthType("login")}
            className="underline underline-offset-4 font-mono"
          >
            Already Registered? Login
          </button>
        )}
      </div>
    </section>
  );
};

export default AuthMerchant;
