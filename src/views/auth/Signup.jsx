import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import CustomValidationErrorMessage from "../../components/errors/CustomValidationErrorMessage";
import Loader from "../../components/loader/index";
import { sendOtp, signup } from "../../services/authService";
import { toast } from "react-toastify";
import AuthLayout from "../layout/AuthLayout";
import AppLogo from "../../components/images/AppLogo";
import image from "../../assets/images/sign_up_new_bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  KeyIcon,
  UserIcon,
  MailIcon,
  PhoneIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { phoneCodes } from "../../helpers/phoneNumberCode";
import { getAuthToken } from "../../helpers/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/actions/userActions";

const signUpalidation = Yup.object({
  name: Yup.string()
    .required("Name field is required")
    .min(3, "The Name length should be atleast 3 characters"),
  email: Yup.string()
    .email("Not a Valid Email Address")
    .required("The Email Address field is required"),
  phoneNumber: Yup.string()
    .min(10, "Phone Number should be of atleast 10 digits")
    .max(10, "Phone Number should not be more than 10 digits")
    .required("Phone Number field is required"),
  password: Yup.string()
    .required("Password field is required")
    .min(8, "The Password length should be atleast 8 characters"),
  examType: Yup.number()
    .min(1, "Please Select a value")
    .required("Exam Type field is required"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const appInApp = useSelector((state) => state.appInApp.appInApp);

  useEffect(() => {
    const authToken = getAuthToken();
    if (authToken?.length) {
      navigate("/dashboard");
    }
  }, []);

  const handleSignUp = async (values, setErrors) => {
    if (!values.consent) {
      setErrors({ consent: "Please accept the terms of service." });
      return;
    }
    setLoading(true);
    // try {
    //   const response = await sendOtp(
    //     `${values.countryCode}${values.phoneNumber}`
    //   );
    //   const { status } = response;
    //   if (status >= 200 && status < 300) {
    //     toast.success(
    //       `OTP Sent Succesfully to ${values.countryCode}${values.phoneNumber}`
    //     );
    //     navigate("/verify-otp", { state: { values } });
    //   }
    // } catch (err) {
    //   console.error("Error : ", err);
    try {
      const response = await signup(values);
      const { status } = response;
      if (status >= 200 && status < 300) {
        dispatch(setUser(response?.data?.data));
        localStorage.setItem("authToken", response?.data?.token);
        navigate("/profile");
        toast.success("Welcome to MNNIT Event Portal");
      }
    } catch (err) {
      console.error("Error : ", err);
      toast.error(err?.response?.data?.error || "Something went Wrong");
    }
    //   toast.error(err?.response?.data?.error || "Something went Wrong.");

    // }
    setLoading(false);
  };

  return (
    <>
      <AuthLayout
        imageLink={image}
        title={"Sign Up"}
        description={
          "Sign Up and create an account and get access to exclusive content right away."
        }
        form={
          <div className="w-11/12 lg:w-10/12 xl:w-2/3 max-w-2xl flex flex-col items-center justify-center pt-4">
            <AppLogo
              width={"100px"}
              height={"100px"}
              classname={"mx-auto mb-4"}
            />
            <Formik
              initialValues={{
                name: "",
                countryCode: "+91",
                phoneNumber: "",
                email: "",
                password: "",
                examType: 0,
                consent: false,
              }}
              validationSchema={signUpalidation}
              onSubmit={(values, { setErrors }) => {
                handleSignUp(values, setErrors);
              }}
            >
              {({ values, touched, errors, handleChange, handleSubmit }) => {
                return (
                  <>
                    <div className="w-11/12">
                      <div className="bg-gray-100 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                        <UserIcon className="w-5 h-5" />
                        <input
                          id="name"
                          placeholder="John Doe"
                          className="p-2.5 text-lg rounded-lg bg-gray-100 w-full focus:outline-none"
                          type="text"
                          value={values.name}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.name && errors.name ? true : false}
                        error={errors.name}
                      />
                      <div className="bg-gray-100 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                        <MailIcon className="w-5 h-5" />
                        <input
                          id="email"
                          placeholder="name@example.com"
                          className="p-2.5 text-lg rounded-lg bg-gray-100 w-full focus:outline-none"
                          type="email"
                          value={values.email}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.email && errors.email ? true : false}
                        error={errors.email}
                      />
                      <div className="bg-gray-100 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                        <PhoneIcon className="w-6 h-6" />
                        <select
                          id="countryCode"
                          className="p-2.5 text-lg rounded-lg bg-gray-100 focus:outline-none w-20"
                          name="countryCode"
                          value={values.countryCode}
                          onChange={handleChange}
                        >
                          {phoneCodes?.map((val) => (
                            <option value={val?.dial_code}>
                              {val?.dial_code}
                            </option>
                          ))}
                        </select>
                        <input
                          id="phoneNumber"
                          placeholder="956905xxxx"
                          className="p-2.5 text-lg rounded-lg bg-gray-100 w-full focus:outline-none"
                          type="tel"
                          value={values.phoneNumber}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={
                          touched.phoneNumber && errors.phoneNumber
                            ? true
                            : false
                        }
                        error={errors.phoneNumber}
                      />
                      <div className="bg-gray-100 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                        <KeyIcon className="w-4 h-4" />
                        <input
                          id="password"
                          placeholder="Password"
                          className="p-2.5 text-lg rounded-lg bg-gray-100 w-full focus:outline-none"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={
                          touched.password && errors.password ? true : false
                        }
                        error={errors.password}
                      />
                      <div className="bg-gray-100 text-secondary flex gap-3 items-center px-3 rounded-lg my-5 shadow-lg">
                        <PencilIcon className="w-4 h-4" />
                        <select
                          id="examTYpe"
                          className="p-2.5 text-lg rounded-lg bg-gray-100 w-full focus:outline-none"
                          name="examType"
                          value={values.examType}
                          onChange={handleChange}
                        >
                          <option value={0} disabled>
                            Select Year
                          </option>
                          {[
                            2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
                            2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
                          ].map((val) => (
                            <option value={val}>{val}</option>
                          ))}
                        </select>
                      </div>
                      <CustomValidationErrorMessage
                        show={
                          touched.examType && errors.examType ? true : false
                        }
                        error={errors.examType}
                      />
                      <div className="flex items-center justify-start gap-3 ">
                        <input
                          id="consent"
                          className="p-2.5 text-lg rounded-lg bg-gray-100 focus:outline-none"
                          name="consent"
                          type="checkbox"
                          value={values.consent}
                          onChange={handleChange}
                        />
                        <div>
                          <h1 className="text-sm">
                            I accept the{" "}
                            <a
                              className="text-primary hover:underline font-semibold"
                              href="http://www.mnnit.ac.in/"
                              target="_blank"
                            >
                              terms of service
                            </a>{" "}
                            &{" "}
                            <a
                              className="text-primary hover:underline font-semibold"
                              href="http://www.mnnit.ac.in/"
                              target="_blank"
                            >
                              privacy policy
                            </a>
                            .
                          </h1>
                        </div>
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.consent && errors.consent ? true : false}
                        error={errors.consent}
                      />
                      <button
                        className="p-2.5 text-lg rounded-lg bg-secondary text-white my-4 w-full shadow-lg"
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader width={25} height={25} />
                        ) : (
                          "Sign Up"
                        )}
                      </button>
                      <div className="text-sm my-3 w-full text-center">
                        Already Have an account ?{" "}
                        <Link
                          to={"/login"}
                          className="text-primary font-semibold"
                        >
                          Sign In
                        </Link>
                      </div>
                    </div>
                  </>
                );
              }}
            </Formik>
          </div>
        }
      />
    </>
  );
};

export default SignUp;
