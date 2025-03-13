import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
//import { validateRegisterForm } from '../../../helpers/validator/authSchema';
import { signup } from "../../../api/entity";
//import { errorMessage } from '../../../helpers/errorMessage';
import { Button, Input } from "@heroui/react";
import { EyeSlashFilledIcon } from "../../../Icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../Icons/EyeFilledIcon";
import { Alert } from "antd";
import "./Register.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { validateRegisterForm } from "../../../validator/authSchema";
import { getCookie } from "../../../services/cookie.service";

export default function Register() {
  const [formError, setFormError] = useState("");
  const [field, setField] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setPasswordConfirmVisible] = useState(false);

  const { auth, setAuth } = useContext(AuthContext);

  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const togglePasswordConfirmVisibility = () =>
    setPasswordConfirmVisible(!isConfirmPasswordVisible);

  const validate = (values) => validateRegisterForm(values);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await signup(values);
        if (result.isSuccess) {
          setAuth(getCookie("auth"));
          setFormError("");
          setRedirect(true);
        } else {
          setFormError(
            result?.error?.message || "Une erreur inconnue est survenue"
          );
          setRedirect(false);
        }
      } catch (error) {
        setFormError(
          "Une erreur s'est produite lors du processus d'inscription"
        );
        setRedirect(false);
      } finally {
        setIsLoading(false);
      }
    },
  });

  if (auth?.token) {
    return <Navigate to="/" />;
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-2">
      <div
        className="absolute inset-0 blur-3xl h-[80px]"
        style={{
          background:
            "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)",
        }}
      ></div>
      <div className="bg-gradient-to-l from-slate-300 to-slate-100 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl text-green-800 font-bold mb-6 text-center">
          Créer un compte
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {formError && (
            <Alert description={formError} type="error" className="mb-5" />
          )}

          <div className="w-full flex flex-col gap-9">
            <p className="text-sm text-gray-400">
              Entrez vos informations personnelles pour créer un compte.
            </p>

            <div className="">
              <Input
                size={"sm"}
                type="text"
                label="Nom et Prenom"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                isInvalid={formik.touched.name && !!formik.errors.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null}
            </div>

            <div className="">
              <Input
                size={"sm"}
                type="email"
                label="Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                isInvalid={formik.touched.email && !!formik.errors.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null}
            </div>

            <div>
              <Input
                size={"sm"}
                type={isPasswordVisible ? "text" : "password"}
                label="Mot de passe"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                isInvalid={formik.touched.password && !!formik.errors.password}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isPasswordVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error">{formik.errors.password}</div>
              ) : null}
            </div>

            <div>
              <Input
                size={"sm"}
                type={isConfirmPasswordVisible ? "text" : "password"}
                label="Confirmation"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                isInvalid={
                  formik.touched.confirmPassword &&
                  !!formik.errors.confirmPassword
                }
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={togglePasswordConfirmVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="error">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>

            <div className="mb-4">
              <Button
                size="lg"
                type="submit"
                className="w-full bg-green-700 hover:bg-green-900 text-white py-3 px-4 rounded focus:outline-none focus:shadow-outline"
                isLoading={isLoading ? "isLoading" : null}
              >
                Créer un compte
              </Button>
            </div>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Vous n'avez pas de compte ?{" "}
          <Link to="/login" className="text-green-700 hover:text-green-900">
            Veuillez cliquer ici{" "}
          </Link>
          pour créer un compte.
        </p>
      </div>
    </div>
  );
}
