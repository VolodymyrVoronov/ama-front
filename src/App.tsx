import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useQuestionsStore } from "./store/questions";
import { Path } from "./constants";

import NavBar from "./components/NavBar/NavBar";

import { mockQuestions } from "./mock/questions";

const App = (): JSX.Element => {
  const { setQuestions, setWordsCloud } = useQuestionsStore();

  const location = useLocation();

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

