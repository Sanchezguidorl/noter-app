"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import FacebookIcon from "/public/facebookIcon.svg";
import Image from "next/image";
import GoogleIcon from "/public/googleIcon.svg";
import HorizontalRule from "@/components/layouts/HorizontalRule";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import { redirect } from "next/navigation";

interface UserCreateFormInputs {
  email: string;
  password: string;
}

function RegisterUser() {
  const [userData, setUser] = useState<UserCreateFormInputs>({
    email: "",
    password: "",
  });
const {user,register}=useAuthUserContext();

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setUser({ ...userData, password: value });
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setUser({ ...userData, email: value });
  };

  const handleSubmit=async(event:React.ChangeEvent<HTMLFormElement>)=>{
event.preventDefault();
await register(userData)
  }

useEffect(()=>{
if(user.logged){
  redirect("/");
}
},[user.logged]);

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
              alt="Icono de red social Google"
              className="relative transition-all duration-150 cursor-pointer hover:w-20"
              src={GoogleIcon}
            ></Image>
          </div>
        </div>
        <HorizontalRule />
      </div>
      <div>
        <form action="" className="flex flex-col text-xs" onSubmit={handleSubmit}>
          <label className="mt-8 mb-2" htmlFor="inputUser">
            Email
          </label>
          <input
            onChange={handleChangeEmail}
            value={userData.email}
            className="bg-c-transparent border-b outline-none border-secondary-text"
            id="inputUser"
            type="text"
            placeholder="Ingresa tu email"
          />
          <label className="mt-8 mb-2" htmlFor="inputPassword">
            Contraseña
          </label>
          <input
            value={userData.password}
            onChange={handleChangePassword}
            className="bg-c-transparent border-b outline-none border-secondary-text"
            id="inputPassword"
            type="text"
            placeholder="Ingresa tu contraseña"
          />
          <label className="mt-8 mb-2" htmlFor="inputPassword">
            Verificar Contraseña
          </label>
          <input
            className="bg-c-transparent border-b outline-none border-secondary-text"
            id="inputPassword"
            type="text"
            placeholder="Pepite tu contraseña"
          />
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
