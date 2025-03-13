import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { signin } from "../../../api/entity";
import { Button, Input } from "@heroui/react";
import { EyeSlashFilledIcon } from "../../../Icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../../Icons/EyeFilledIcon";
import { Alert } from "antd";
import "./Login.css";
import { getCookie } from "../../../services/cookie.service";
import { validateLoginForm } from "../../../validator/authSchema";
import { AuthContext } from "../../../contexts/AuthContext";

export default function Login() {
  const [formError, setFormError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const validate = (values) => validateLoginForm(values);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const result = await signin(values);
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
        setIsLoading(false);
        setFormError(
          "Une erreur s'est produite lors du processus de connexion"
        );
        setRedirect(false);
      } finally {
        setIsLoading(false);
      }
    },
  });

  useEffect(() => {}, []);

  if (redirect) {
    return <Navigate to="/" />;
  }

  if (auth?.token) {
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
      <div className="bg-gradient-to-l from-slate-300 to-slate-100 p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl text-green-800 font-bold mb-6 text-center">
          Connectez-vous
        </h2>
        <form onSubmit={formik.handleSubmit}>
          {formError && (
            <Alert
              /* message="Message d'erreur" */
              description={formError}
              type="error"
              className="mb-5"
              /* showIcon */
            />
          )}

          <div className="w-full flex flex-col gap-9">
            <p className="text-sm text-gray-400">
              Entrez votre email et mot de passe pour vous connecter.
            </p>
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
                type={isVisible ? "text" : "password"}
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
                    onClick={toggleVisibility}
                    aria-label="toggle password visibility"
                  >
                    {isVisible ? (
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

            <div className="mb-2">
              <Button
                size="lg"
                type="submit"
                className="w-full bg-green-700 hover:bg-green-900 text-white p-3 px-4 rounded focus:outline-none focus:shadow-outline"
                isLoading={isLoading ? "isLoading" : null}
              >
                Se connecter
              </Button>
            </div>
          </div>
        </form>

        <p className="text-gray-600 flex justify-end mt-2">
          <Link
            to="/forgot-password"
            className="text-green-700 text-sm hover:text-green-900"
          >
            Mot de passe oublié ?
          </Link>
        </p>

        {/*  <p className="mt-4 text-center text-gray-600">
                    Avez-vous un compte ?{' '}
                    <Link to="/signup" className="text-green-700 hover:text-green-900">
                        Veuillez cliquer ici{' '}
                    </Link>
                    pour vous connecter.
                </p> */}
      </div>
    </div>
  );
}
