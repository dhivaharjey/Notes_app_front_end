import React, { useState } from "react";
import { useFormik } from "formik";
import PasswordInput from "../../../components/inputs/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { signUpValidation } from "../../../Utils/yupValidation";
import { signUp } from "../../../Utils/axiosInstance";
import { encryptValues } from "../../../Utils/helper";
import { toast } from "react-toastify";
import Loader from "../../../components/Theme/Loader/Loader";

const SignUp = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const initialValues = {
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: signUpValidation,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setError(null);
        setSubmitting(true);
        const { email, password, confirmPassword } = encryptValues(values);

        // console.log(email, password, confirmPassword);

        const payload = {
          userName: values.userName,
          email,
          password,
          confirmPassword,
        };
        const res = await signUp(payload);
        if (res?.data) {
          resetForm();
          navigate("/", { replace: true });
          // toast.success(res?.data?.message);
        }
      } catch (error) {
        const errMsg =
          error?.response?.data?.message ||
          error?.messsage ||
          "Oops somethinf went wrong";
        setError(errMsg);
        toast.error(errMsg);
      }
    },
  });

  return (
    <>
      <div className="min-w-full flex items-center justify-center mt-28 pb-[4rem]">
        <div className=" w-96 border rounded-xl bg-slate-200 px-7 py-10">
          <form>
            <h4 className=" text-2xl mb-7 text-center font-semibold">SignUp</h4>
            <input
              id="userName"
              type="text"
              placeholder="Username"
              className="input-box "
              name="userName"
              value={formik?.values?.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
            />
            {formik.touched?.userName && formik.errors?.userName && (
              <p
                className=" text-red-500 text-xs  ml-3
              mb-3 mt-[-.6rem]"
              >
                {formik.errors?.userName}
              </p>
            )}
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="input-box "
              required
              name="email"
              value={formik?.values?.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {/* <InputBox
              inputName="email"
              id="email"
              type="email"
              placeholder="Email"
              value={formik?.values?.email}
              handleChange={formik.handleChange}
              handleBlur={formik.handleBlur}
              required
            /> */}
            {formik.touched.email && formik.errors?.email && (
              <p
                className=" text-red-500 text-xs  ml-3
              mb-3 mt-[-.6rem]"
              >
                {formik.errors?.email}
              </p>
            )}
            <PasswordInput
              inputName="password"
              placeholder="password"
              value={formik.values?.password}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors?.password && (
              <p
                className=" text-red-500 text-xs  ml-3
              mb-3 mt-[-.6rem]"
              >
                {formik.errors?.password}
              </p>
            )}
            <PasswordInput
              inputName="confirmPassword"
              placeholder="Confirm Password"
              value={formik.values?.confirmPassword}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
            />
            {formik.touched?.confirmPassword &&
              formik.errors?.confirmPassword && (
                <p
                  className=" text-red-500 text-xs  ml-3
              mb-3 mt-[-.6rem]"
                >
                  {formik.errors?.confirmPassword}
                </p>
              )}
            <button
              type="submit"
              className="btn-primary"
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? <Loader /> : "Create Account"}
            </button>
            <p className=" text-sm text-center mt-4">
              If you already have an account?{" "}
              <Link to="/" className=" font-medium text-primary underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
