import { useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useQuestionsStore } from "./components/store/questions";

import NavBar from "./components/NavBar/NavBar";

import { mockQuestions } from "./components/mock/questions";

const App = (): JSX.Element => {
  const { setQuestions } = useQuestionsStore();

  useEffect(() => {
    setQuestions(mockQuestions);
  }, []);

  return (
    <div>
      <NavBar />

      <Outlet />
    </div>
  );
};

export default App;

