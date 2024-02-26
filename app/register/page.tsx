"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import FacebookIcon from "/public/facebookIcon.svg";
import Image from "next/image";
import GoogleIcon from "/public/googleIcon.svg";
import HorizontalRule from "@/components/layouts/HorizontalRule";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import { redirect } from "next/navigation";
import { UserCreateAndLoginFormInputs } from "../db/dbMock";

interface UserCreateFormInputs {
  email: string;
  password: string;
  passwordValidation: string;
}

function RegisterUser() {
  const [userData, setUser] = useState<UserCreateFormInputs>({
    email: "",
    password: "",
    passwordValidation:""
  });

  const [errorInputs, setErrorInputs] = useState({
    email: { valid: false, message: "" },
    password: { valid: false, message: "" },
  });

  const validateInputs = (): boolean => {
    const validEmail = userData.email.length >= 12;
    const validPassword = userData.password.length >= 8;

    const messageEmail = !validEmail
      ? "Tu email debe tener u mínimo de 12 caracteres."
      : "";
    const messagePassword = !validPassword
      ? "Tu contraseña debe tener 8 o más caracteres."
      : "";

    setErrorInputs({
      email: { valid: validEmail, message: messageEmail },
      password: { valid: validPassword, message: messagePassword },
    });

    const passworRepeatValid=userData.password!==userData.passwordValidation;

    return validEmail && validPassword && passworRepeatValid;
  };

  const { user, register, authWithGoogle } = useAuthUserContext();

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setUser({ ...userData, password: value });
  };

  const handleChangePasswordValidation = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setUser({ ...userData, passwordValidation: value });
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setUser({ ...userData, email: value });
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      await register({email:userData.email, password:userData.password});
    }
  };

  useEffect(() => {
    if (user.logged) {
      redirect("/");
    }
  }, [user.logged]);

  return (
    <div>
      <div className="flex flex-col">
        <p className="uppercase text-center text-xs px-4 font-semibold">
          También puedes ingresar mediante
        </p>
        <div className="flex justify-center gap-10 my-6">
          <div className=" aspect-square w-14 flex justify-center items-center">
            <Image
              alt="Icono de red social Facebook"
              className="relative transition-all duration-150 cursor-pointer hover:w-20"
              src={FacebookIcon}
            ></Image>
          </div>
          <div className=" aspect-square w-14 flex justify-center items-center">
            <Image
              onClick={authWithGoogle}
              alt="Icono de red social Google"
              className="relative transition-all duration-150 cursor-pointer hover:w-20"
              src={GoogleIcon}
            ></Image>
          </div>
        </div>
        <HorizontalRule />
      </div>
      <div>
        <form
          action=""
          className="flex flex-col text-xs"
          onSubmit={handleSubmit}
        >
          <div className="relative flex flex-col">
            <label className="mt-8 mb-2" htmlFor="inputUser">
              Email
            </label>
            <input required
              onChange={handleChangeEmail}
              value={userData.email}
              className="bg-c-transparent border-b outline-none border-secondary-text"
              id="inputUser"
              type="text"
              placeholder="Ingresa tu email"
            />
            <p className={` text-delete-hover text-xs absolute top-full ${!errorInputs.email.valid?"visible":"invisible"}`}>{errorInputs.email.message}</p>
          </div>
          <div className="relative flex flex-col">
            <label className="mt-8 mb-2" htmlFor="inputPassword">
              Contraseña
            </label>
            <input required
              value={userData.password}
              onChange={handleChangePassword}
              className="bg-c-transparent border-b outline-none border-secondary-text"
              id="inputPassword"
              type="password"
              placeholder="Ingresa tu contraseña"
            />
            <p className={` text-delete-hover text-xs absolute top-full ${!errorInputs.password.valid?"visible":"invisible"}`}>{errorInputs.password.message}</p>
          </div>
          <div className="relative flex flex-col">
            <label className="mt-8 mb-2" htmlFor="inputPasswordValidation">
              Verificar Contraseña
            </label>
            <input required
              className="bg-c-transparent border-b outline-none border-secondary-text"
              id="inputPasswordValidation"
              type="password"
              placeholder="Pepite tu contraseña"
              onChange={handleChangePasswordValidation}
            />
            <p className={` text-delete-hover text-xs absolute top-full ${(userData.passwordValidation!=="") && userData.password!==userData.passwordValidation?"visible": "invisible"}`}>La contraseña debe coincidir con la ingresada</p>
            <p className={` text-success text-xs absolute top-full ${(userData.passwordValidation!=="") && userData.password===userData.passwordValidation?"visible": "invisible"}`}>Verificado</p>
          </div>
          <input
            type="submit"
            value="Crear Cuenta"
            className="mt-16 mb-6 py-3 bg-primary-buttons text-white mx-3 cursor-pointer transition-all duration-500 hover:brightness-150"
          />
        </form>
      </div>
      <div className="flex text-xs justify-center gap-1">
        <p className=" font-semibold">¿Ya tienes una cuenta?</p>
        <p>|</p>
        <Link
          href="/login"
          className="text-primary-buttons transition-all duration-500 hover:brightness-150 uppercase"
        >
          Inicia Sesión
        </Link>
      </div>
    </div>
  );
}

export default RegisterUser;
