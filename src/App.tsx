import { useCallback, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useAuthStore } from "./store/auth";
import { useQuestionsStore } from "./store/questions";
import { Path } from "./constants";

import NavBar from "./components/NavBar/NavBar";

import { mockQuestions } from "./mock/questions";

const App = (): JSX.Element => {
  const { jwtToken, refreshingToken, refreshToken } = useAuthStore();
  const { setQuestions, setWordsCloud } = useQuestionsStore();

  const location = useLocation();

  const [tickInterval, setTickInterval] = useState<NodeJS.Timeout>();

  const toggleRefresh = useCallback(
    (status: boolean) => {
      if (status) {
        const intervalId = setInterval(() => {
          refreshToken();
        }, 1000 * 60 * 10);

        setTickInterval(intervalId);
      } else {
        setTickInterval(undefined);
        clearInterval(tickInterval);
      }
    },
    [tickInterval]
  );

  useEffect(() => {
    if (!jwtToken && !refreshingToken) {
      refreshToken();
      toggleRefresh(true);
    }
  }, [jwtToken, toggleRefresh]);

  useEffect(() => {
    setQuestions(mockQuestions);
    setWordsCloud();
  }, []);

  if (location.pathname === Path.AUTH) {
    return <Outlet />;
  }

  return (
    <div>
      <NavBar />

      <Outlet />
    </div>
  );
};

export default App;

