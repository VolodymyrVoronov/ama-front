import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button, Input, Image } from "@nextui-org/react";
import useKeyPress from "ahooks/lib/useKeyPress";

import { Path } from "../../constants";

import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
} from "../../components/Icons/Icons";

import { useAuthStore } from "../../store/auth";

const userDataInitialState = {
  email: "",
  password: "",
};

const Auth = (): JSX.Element => {
  const navigate = useNavigate();

  const { loggingIn, errorLoggingIn, jwtToken, logIn } = useAuthStore();

  const [isVisible, setIsVisible] = useState(false);
  const [userData, setUserData] = useState(userDataInitialState);

  const toggleVisibility = (): void => setIsVisible(!isVisible);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const onBackButtonClick = (): void => {
    navigate(Path.HOME);
  };

  const onSubmitClick = (): void => {
    void logIn(userData, navigate);
  };

  useKeyPress(27, (): void => {
    setUserData(userDataInitialState);
  });

  const areFieldsEmpty = (): boolean => {
    return (
      userData.email === "" ||
      userData.password === "" ||
      userData.email === undefined ||
      userData.password === undefined
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen p-4 sm:p-0 bg-gradient-to-tr from-cyan-500 to-blue-500">
      <motion.div
        className="flex flex-col gap-5 w-[350px] sm:w-[400px] md:w-[450px] lg:w-[500px] p-2 sm:p-4 shadow-lg bg-white rounded-xl"
        initial={{
          opacity: 0,
          filter: "blur(50px)",
          translateY: 150,
        }}
        animate={{
          opacity: 1,
          filter: "blur(0px)",
          translateY: 0,
          transition: {
            duration: 1,
            ease: "easeInOut",
          },
        }}
      >
        {jwtToken ? (
          <div className="flex flex-col gap-5 items-center">
            <Image
              className="px-1 py-1 md:px-2 md:py-2"
              src="./assets/logo.png"
              shadow="md"
              alt="Question logo"
              classNames={{
                wrapper: "w-16 md:w-20",
              }}
            />

            <span className="text-2xl text-center bg-gradient-to-tr from-cyan-500 to-blue-500 bg-clip-text text-transparent">
              You are logged in. What do you want to do here?
            </span>

            <Button
              onClick={onBackButtonClick}
              color="danger"
              variant="shadow"
              aria-label="Clear"
              className="w-full font-semibold text-lg"
            >
              Take me home
            </Button>
          </div>
        ) : (
          <>
            <Input
              className="w-full"
              onChange={onInputChange}
              value={userData.email}
              size="lg"
              type="email"
              name="email"
              label="Email"
              variant="bordered"
              color="primary"
              placeholder="Enter your email"
              classNames={{
                label: "mb-1",
              }}
            />

            <Input
              className="w-full"
              onChange={onInputChange}
              value={userData.password}
              size="lg"
              label="Password"
              name="password"
              variant="bordered"
              color="primary"
              placeholder="Enter your password"
              classNames={{
                label: "mb-1",
              }}
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              errorMessage={errorLoggingIn}
            />

            <div className="flex flex-row gap-5">
              <Button
                onClick={onBackButtonClick}
                isDisabled={loggingIn}
                color="danger"
                variant="shadow"
                aria-label="Clear"
                className="w-full font-semibold text-lg"
              >
                Back
              </Button>

              <Button
                onClick={onSubmitClick}
                isDisabled={areFieldsEmpty()}
                isLoading={loggingIn}
                color="primary"
                variant="shadow"
                aria-label="Submit"
                className="w-full font-semibold text-lg bg-gradient-to-tr from-cyan-500 to-blue-500"
              >
                Login
              </Button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default Auth;
