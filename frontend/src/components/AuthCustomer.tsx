import React, { useState } from "react";
import { CiMail, CiLock, CiUser } from "react-icons/ci";
import { FaEye } from "react-icons/fa";
import bcrypt from "bcryptjs";

const AuthCustomer = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [customerID, setCustomerID] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [signUpFlag, setSignUpFlag] = useState<string>("login");

  const handleLogin = async () => {};

  const handleAuthType = (type: string) => {
    setCustomerID("");
    setPassword("");
    setEmail("");
    setSignUpFlag(type);
  };

  if (signUpFlag === "login") {
    return (
      <section className="p-3 flex flex-col w-full h-full">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="flex flex-col my-2">
          <p className="font-kanitmedium opacity-80 mx-2">vat customer id:</p>
          <div className="flex justify-between items-center p-2 gap-2 border">
            <CiUser />
            <input
              type="text"
              className="rounded-lg outline-none w-full"
              value={customerID}
              onChange={(e) => setCustomerID(e.target.value)}
              placeholder="enter customer vat id"
            />
          </div>
        </div>

        <div className="flex flex-col my-2">
          <p className="font-kanitmedium opacity-80 mx-2">password:</p>
          <div className="flex justify-between items-center p-2 gap-2 border">
            <CiLock />
            <input
              type={showPassword ? "text" : "password"}
              className="rounded-lg outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password"
            />
            <FaEye
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer mx-2 hover:scale-105 ease-in-out"
            />
          </div>
        </div>

        <button
          className="font-mono p-3 w-full bg-black text-white rounded-xl my-12 hover:bg-gray-800"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="text-sm text-gray-500 mx-3">
          <button
            onClick={() => handleAuthType("signup")}
            className="underline underline-offset-4 font-mono"
          >
            Not Registered ? Sign Up
          </button>
        </div>
      </section>
    );
  } else if (signUpFlag === "signup") {
    return (
      <section className="p-3 flex flex-col w-full h-full">
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <div className="flex flex-col my-2">
          <p className="font-kanitmedium opacity-80 mx-2">email id:</p>
          <div className="flex justify-between items-center p-2 gap-2 border">
            <CiUser />
            <input
              type="text"
              className="rounded-lg outline-none w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="enter customer email id"
            />
          </div>
        </div>

        <div className="flex flex-col my-2">
          <p className="font-kanitmedium opacity-80 mx-2">vat customer id:</p>
          <div className="flex justify-between items-center p-2 gap-2 border">
            <CiUser />
            <input
              type="text"
              className="rounded-lg outline-none w-full"
              value={customerID}
              onChange={(e) => setCustomerID(e.target.value)}
              placeholder="enter customer vat id"
            />
          </div>
        </div>

        <div className="flex flex-col my-2">
          <p className="font-kanitmedium opacity-80 mx-2">password:</p>
          <div className="flex justify-between items-center p-2 gap-2 border">
            <CiLock />
            <input
              type={showPassword ? "text" : "password"}
              className="rounded-lg outline-none w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="enter password"
            />
            <FaEye
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer mx-2 hover:scale-105 ease-in-out"
            />
          </div>
        </div>

        <button
          className="font-mono p-3 w-full bg-black text-white rounded-xl my-2 hover:bg-gray-800"
          onClick={handleLogin}
        >
          Sign Up
        </button>

        <div className="text-sm text-gray-500 mx-3">
          <button
            onClick={() => handleAuthType("login")}
            className="underline underline-offset-4 font-mono"
          >
            Customer Login
          </button>
        </div>
      </section>
    );
  }
};

export default AuthCustomer;
