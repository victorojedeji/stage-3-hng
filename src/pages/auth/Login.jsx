import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { GALLERY } from "../../lib/routes";
import { useLogin } from "../../hooks/auth";
import { emailValidate, passwordValidate } from "../../utils/form-validate";
import { Ring } from "@uiball/loaders";

export default function Login() {

  const { login, isLoginLoading } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: null, password: null });

  async function handleSignIn(e) {
    e.preventDefault();

    const emailError = validateField("email", email, emailValidate);
    const passwordError = validateField("password", password, passwordValidate);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });

      setTimeout(() => {
        setErrors({ email: null, password: null });
      }, 3000);

      return;
    }


    const success = await login({
      email: email,
      password: password,
      redirectTo: GALLERY,
    });

    if (success) {
      setEmail("");
      setPassword("");
      setErrors({ email: null, password: null });
    }
  }

  const validateField = (fieldName, value, validationRules) => {
    let error = "";

    for (const rule in validationRules) {
      if (validationRules.hasOwnProperty(rule)) {
        const ruleValue = validationRules[rule];
        if (rule === "required" && ruleValue.value && !value) {
          error = ruleValue.message;
        } else if (rule === "minLength" && value.length < ruleValue.value) {
          error = ruleValue.message;
        } else if (rule === "pattern" && !ruleValue.value.test(value)) {
          error = ruleValue.message;
        }
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: error,
    }));

    return error;
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#1d2951]">
      <div className="w-[90%] md:w-[60%] lg:w-[30%] bg-white flex flex-col items-center pt-8 pb-8 pl-2 pr-2 rounded-[16px]">
        <h1 className="text-h5 font-bold font-head text-center">
          Welcome back!
        </h1>
        <p className="text-para text-center">
          Enter your credentials to see the Gallery.
        </p>

        <form onSubmit={handleSignIn} className="mt-8 min-w-[80%]">
          {/* // EMAIL INPUT FIELD  */}
          <div className="relative">
            <input
              type="text"
              placeholder="Enter your email"
              className={`block ${
                errors.email === null ? "mb-4" : "mb-0"
              } pt-2 pb-2 pr-8 pl-2 w-full rounded-[64px] border-2 border-base focus:outline-none focus:ring focus:border-[#1d2951] placeholder:text-gray-500`}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AiOutlineMail className="text-[#1d2951]" />
            </span>
          </div>

          {errors.email !== null && (
            <div className="mt-1 text-small text-center mb-4 text-red-500">
              {errors.email}
            </div>
          )}

          {/* // PASSWORD INPUT FIELD  */}

          <div
            className={`
                        relative ${errors.password === null ? "mb-8" : "mb-0"}
                    `}
          >
            <input
              type="password"
              placeholder="Enter your password"
              className="block pt-2 pb-2 pr-8 pl-2 w-full rounded-[64px] border-2 border-base focus:outline-none focus:ring focus:border-[#1d2951] placeholder:text-gray-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AiOutlineLock className="text-[#1d2951]" />
            </span>
          </div>

          {errors.password !== null && (
            <div className="mt-1 text-small text-center mb-4 text-red-500">
              {errors.password}
            </div>
          )}

          <button
            className={`w-full ${
              isLoginLoading ? "opacity-50" : "opacity-100"
            } bg-[#1d2951] text-white rounded-[64px] pt-2 pb-2 mb-8 relative`}
            disabled={isLoginLoading ? true : false}
          >
            {isLoginLoading ? (
              <div className="flex items-center justify-center">
                <Ring />
                Processing...
              </div>
            ) : (
              "Sign In"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
