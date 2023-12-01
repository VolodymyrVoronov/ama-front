import { useEffect } from "react";
import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import { Progress, Chip } from "@nextui-org/react";
import useInterval from "ahooks/lib/useInterval";

import { useAuthStore } from "./store/auth";
import { useQuestionsStore } from "./store/questions";
import { Path } from "./constants";

import NavBar from "./components/NavBar/NavBar";

const App = (): JSX.Element => {
  const { jwtToken, errorRefreshingToken, refreshToken } = useAuthStore();
  const { loadingQuestions, errorLoadingQuestions, setQuestions } =
    useQuestionsStore();

  const location = useLocation();

  useInterval(() => {
    if (jwtToken) {
      void refreshToken();
    }
  }, 1000 * 60 * 10);

  useEffect(() => {
    if (!jwtToken) {
      void refreshToken();
    }
  }, [jwtToken]);

  useEffect(() => {
    void setQuestions();
  }, []);

  if (location.pathname === Path.AUTH) {
    return <Outlet />;
  }

  return (
    <div>
      <NavBar />
      {errorLoadingQuestions ? (
        <div className="flex justify-center mt-5">
          <Chip color="danger">{errorLoadingQuestions}</Chip>
        </div>
      ) : null}

      {errorRefreshingToken ? (
        <div className="flex justify-center mt-5">
          <Chip color="danger">{errorRefreshingToken}</Chip>
        </div>
      ) : null}

      {loadingQuestions ? (
        <motion.div
          className="flex flex-col items-center"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: {
              duration: 0.5,
              delay: 1.5,
            },
          }}
        >
          <Progress size="sm" isIndeterminate aria-label="Loading..." />
        </motion.div>
      ) : null}

      <Outlet />
    </div>
  );
};

export default App;

