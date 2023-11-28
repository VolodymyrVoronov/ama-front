import { useEffect } from "react";
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
      refreshToken();
    }
  }, 1000 * 60 * 10);

  useEffect(() => {
    if (!jwtToken) {
      refreshToken();
    }
  }, [jwtToken]);

  useEffect(() => {
    setQuestions();
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
        <Progress size="sm" isIndeterminate aria-label="Loading..." />
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default App;

