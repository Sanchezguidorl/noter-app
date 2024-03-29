"use client";
import { useEffect, useState } from "react";
import GoogleIcon from "/public/googleIcon.svg";
import FacebookIcon from "/public/facebookIcon.svg";
import Link from "next/link";
import Image from "next/image";
import HorizontalRule from "@/components/layouts/HorizontalRule";
import { UserCreateAndLoginFormInputs } from "../db/dbMock";
import { useAuthUserContext } from "@/contexts/AuthUserProvider";
import { redirect } from "next/navigation";
import IdentificationContainer from "@/components/layouts/IdentificationContainer";

function LoginUser() {
  const [userData, setUser] = useState<UserCreateAndLoginFormInputs>({
    email: "",
    password: "",
  });
  const [inputsErrors, setInputsErrors] = useState({
    email: { valid: false, message: "" },
    password: { valid: false, message: "" },
  });

  const { user, authUser, authWithGoogle } = useAuthUserContext();

  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setUser({ ...userData, password: value });
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setUser({ ...userData, email: value });
  };

  const validateInputs = () => {
    const emailValid = userData.email.length >= 12;
    const passwordValid = userData.password.length >= 8;

    const messageEmail = !emailValid
      ? "Tu email debe tener u mínimo de 12 caracteres."
      : "";
    const validEmail = emailValid;
    const messagePassword = !passwordValid
      ? "Tu contraseña debe tener 8 o más caracteres."
      : "";
    const validPassword = passwordValid;

    setInputsErrors({
      email: { valid: validEmail, message: messageEmail },
      password: { valid: validPassword, message: messagePassword },
    });
    return emailValid && passwordValid;
  };

  const handleSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validateInputs()) {
      await authUser(userData);
    }
  };

  useEffect(() => {
    if (user.logged) {
      redirect("/");
    }
  }, [user.logged]);

  return (
    <IdentificationContainer>
      <div>
        <div className="flex flex-col">
          <p className="uppercase text-center text-xs px-4 font-semibold">
            También puedes ingresar mediante
          </p>
          <div className="flex justify-center gap-10 my-6">
            {/**
   *             <div className=" aspect-square w-14 flex justify-center items-center">
              <Image
                alt="Icono de red social Facebook"
                className="relative transition-all duration-150 cursor-pointer hover:w-20"
                src={FacebookIcon}
              ></Image>
            </div>
   * 
   */}
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
            <div className="flex flex-col relative">
              {" "}
              <label className="mt-8 mb-2" htmlFor="inputUser">
                {" "}
                Usuario{" "}
              </label>
              <input
                required
                className="bg-c-transparent border-b-2 outline-none border-secondary-text"
                id="inputUser"
                type="text"
                placeholder="Ingresa tu usuario"
                value={userData.email}
                onChange={handleChangeEmail}
              />
              <p
                className={`text-delete-hover absolute top-full ${
                  !inputsErrors.email.valid ? "visible" : "invisible"
                }`}
              >
                {inputsErrors.email.message}
              </p>
            </div>
            <div className="flex flex-col relative">
              <label className="mt-8 mb-2" htmlFor="inputPassword">
                {" "}
                Contraseña{" "}
              </label>
              <input
                required
                className="bg-c-transparent border-b-2 outline-none border-secondary-text"
                id="inputPassword"
                type="text"
                placeholder="Ingresa tu contraseña"
                value={userData.password}
                onChange={handleChangePassword}
              />
              <p
                className={`text-delete-hover absolute top-full ${
                  !inputsErrors.password.valid ? "visible" : "invisible"
                }`}
              >
                {inputsErrors.password.message}
              </p>
            </div>
            <input
              required
              type="submit"
              value="Iniciar Sesión"
              className="mt-16 mb-6 py-3 bg-primary-buttons text-white mx-3 cursor-pointer transition-all duration-500 hover:brightness-150"
            />
          </form>
        </div>
        <div className="flex text-xs justify-center gap-1">
          <p className=" font-semibold">¿No tienes una cuenta?</p>
          <p>|</p>
          <Link
            href="/register"
            className="text-primary-buttons transition-all duration-500 hover:brightness-150 uppercase"
          >
            Registrate
          </Link>
        </div>
      </div>
    </IdentificationContainer>
  );
}

export default LoginUser;
