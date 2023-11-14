import { Outlet } from "react-router-dom";

import NavBar from "./components/NavBar/NavBar";

const App = (): JSX.Element => {
  return (
    <div>
      <NavBar />

      <Outlet />
    </div>
  );
};

export default App;

