import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useQuestionsStore } from "./store/questions";

import NavBar from "./components/NavBar/NavBar";

import { mockQuestions } from "./components/mock/questions";

const App = (): JSX.Element => {
  const { setQuestions, setWordsCloud } = useQuestionsStore();

  useEffect(() => {
    setQuestions(mockQuestions);
    setWordsCloud();
  }, []);

  return (
    <div>
      <NavBar />

      <Outlet />
    </div>
  );
};

export default App;

