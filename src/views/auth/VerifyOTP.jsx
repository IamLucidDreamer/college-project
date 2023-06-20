import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import OTPInput, { ResendOTP } from "otp-input-react";
import { toast } from "react-toastify";

import CustomValidationErrorMessage from "../../components/errors/CustomValidationErrorMessage";
import Loader from "../../components/loader/index";
import { sendOtp, signup } from "../../services/authService";
import AuthLayout from "../layout/AuthLayout";
import AppLogo from "../../components/images/AppLogo";
import image from "../../assets/images/verify_otp_bg.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { setUser } from "../../store/actions/userActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const loginValidation = Yup.object({
  otp: Yup.string()
    .min(6, "OTP must be 6 digits")
    .required("The OTP is required"),
});

const VerifyOTP = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const appInApp = useSelector((state) => state.appInApp.appInApp);

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!state) {
      navigate("/signup");
    }
  }, []);

  const resenOTP = async () => {
    setResendLoading(true);
    try {
      const response = await sendOtp(
        `${state.values.countryCode}${state.values.phoneNumber}`
      );
      const { status } = response;
      if (status >= 200 && status < 300) {
        toast.success(
          `OTP Re-Sent Succesfully to ${state.values.countryCode}${state.values.phoneNumber}`
        );
      }
    } catch (err) {
      console.error("Error : ", err);
      toast.error(err?.message || "Something went Wrong");
    }
    setResendLoading(false);
  };

  const handleSignUp = async (values) => {
    setLoading(true);
    const data = { ...state.values, ...values };
    try {
      const response = await signup(data);
      const { status } = response;
      if (status >= 200 && status < 300) {
        if (appInApp) {
          navigate(
            `/login-success?app_in_app=true&auth_token=${response?.data?.token}&user_id=${response?.data?.data?._id}`
          );
        } else {
          dispatch(setUser(response?.data?.data));
          localStorage.setItem("authToken", response?.data?.token);
          navigate("/profile");
        }
        toast.success("Welcome to Career Kick");
      }
    } catch (err) {
      console.error("Error : ", err);
      toast.error(err?.response?.data?.error || "Something went Wrong");
    }
    setLoading(false);
  };

  return (
    <>
      <AuthLayout
        show={true}
        imageLink={image}
        title={"Verify OTP"}
        description={
          "Enter the OTP sent to your Mobile Number to verify your identity."
        }
        form={
          <div className="w-11/12 lg:w-10/12 xl:w-2/3 flex flex-col items-center justify-center max-w-sm">
            <AppLogo
              width={"250px"}
              height={"250px"}
              classname={"mx-auto mb-4"}
            />
            <Formik
              initialValues={{
                otp: "",
              }}
              validationSchema={loginValidation}
              onSubmit={(values) => handleSignUp(values)}
            >
              {({
                values,
                touched,
                errors,
                setFieldValue,
                handleChange,
                handleSubmit,
              }) => {
                return (
                  <>
                    <div className="w-11/12">
                      <h1 className="text-lg text-secondary">
                        {`Enter the OTP sent to : ${
                          state?.values?.countryCode || ""
                        }${state?.values?.phoneNumber || ""}`}
                      </h1>
                      <div className="text-secondary items-center rounded-lg my-3">
                        <OTPInput
                          style={{
                            justifyContent: "space-between",
                            gap: 25,
                          }}
                          inputStyles={{
                            backgroundColor: "#e5e7eb",
                            width: "100%",
                            margin: "0px",
                            borderRadius: 5,
                            boxShadow: "0 5px 8px -3px rgb(0 0 0 / 0.2)",
                          }}
                          value={values.otp}
                          onChange={(e) => {
                            setFieldValue("otp", e);
                          }}
                          autoFocus
                          OTPLength={6}
                          otpType="number"
                          disabled={false}
                          secure
                        />
                      </div>
                      <CustomValidationErrorMessage
                        show={touched.otp && errors.otp ? true : false}
                        error={errors.otp}
                      />
                    </div>
                    <button
                      className="p-2.5 text-lg rounded-lg bg-secondary text-white w-11/12 my-3 shadow-lg"
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <Loader width={25} height={25} /> : "Verify"}
                    </button>
                    <div className="text-sm flex w-full justify-end px-5">
                      <ResendOTP
                        className="flex justify-between items-center gap-5"
                        onResendClick={() => {
                          resenOTP();
                        }}
                      />
                    </div>
                  </>
                );
              }}
            </Formik>
            {resendLoading ? (
              <Loader coverFullScreen={true} width={25} height={25} />
            ) : null}
          </div>
        }
      />
    </>
  );
};

export default VerifyOTP;
