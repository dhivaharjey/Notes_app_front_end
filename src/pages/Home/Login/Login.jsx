import React, { useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../../../components/inputs/PasswordInput";
import { useFormik } from "formik";
import { logInValidation } from "../../../Utils/yupValidation";

import { encryptValues } from "../../../Utils/helper";
import { login } from "../../../Utils/axiosInstance";
// import { toast } from "react-toastify";
import { MdWarning } from "react-icons/md";
import { toast } from "react-toastify";
import { useAppContext } from "../../../context/AuthContext";
import Loader from "../../../components/Theme/Loader/Loader";
import { useNoteContext } from "../../../context/NoteProvider";

const Login = () => {
  const [error, setError] = useState(null);
  const { setUserInfo } = useAppContext();
  const { getAllNotesOfUser } = useNoteContext();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const formik = useFormik({
    initialValues,
    validationSchema: logInValidation,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setError(null);
        setSubmitting(true);

        const { email, password } = encryptValues(values);

        // console.log(email, password);

        const payload = {
          email,
          password,
        };
        // console.log(payload);
        const res = await login(payload);

        if (res?.data) {
          resetForm();

          setUserInfo(res?.data?.user);
          navigate("/dashboard", { replace: true });
          await getAllNotesOfUser();
          toast.success(res?.data?.message);
        }

        // console.log(values, formik.isSubmitting);
      } catch (error) {
        console.log(error);

        setError(
          error?.response?.data?.message ||
            error?.message ||
            "Something went wrong"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });
  // console.log("password render");
  // console.log(error);

  return (
    <>
      {/* <Navbar /> */}
      <div className="pb-[9rem] min-w-full flex items-center justify-center mt-28 px-4 sm:px-0">
        <div className=" w-96 border rounded-xl bg-slate-200 px-7 py-10">
          <form onSubmit={formik.handleSubmit}>
            <h4 className=" text-2xl mb-7 text-center font-semibold">Login</h4>
            {error && (
              <p className="flex  items-center gap-3 text-base font-medium text-red-500 bg-red-300 w-full p-2 mb-2 rounded-lg">
                <MdWarning size={22} />
                {error}
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
              placeholder="Password"
              value={formik.values.password}
              handleBlur={formik.handleBlur}
              handleChange={formik.handleChange}
            />
            {formik.touched.password && formik.errors.password && (
              <p
                className=" text-red-500 text-xs  ml-3
              mb-3 mt-[-.6rem]"
              >
                {formik.errors?.password}
              </p>
            )}
            <button
              type="submit"
              className="btn-primary"
              onClick={formik.handleSubmit}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <span className="flex justify-center">
                  <Loader />
                </span>
              ) : (
                "Login"
              )}
            </button>
            <button
              type="submit"
              className="btn-primary mt-4 bg-green-600"
              onClick={() => {
                formik.setFieldValue("email", "example@gmail.com");
                formik.setFieldValue("password", "Dhiva467@");
              }}
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? (
                <span className="flex justify-center">
                  <Loader />
                </span>
              ) : (
                "Guest Login"
              )}
            </button>
            <p className=" text-sm text-center mt-4">
              Not Registered yet?{" "}
              <Link
                to="/signup"
                className=" font-medium text-primary underline"
              >
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
