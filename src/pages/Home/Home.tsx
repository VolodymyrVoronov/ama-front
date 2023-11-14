import { Divider } from "@nextui-org/react";

import QuestionForm from "../../components/QuestionForm/QuestionForm";
import QuestionCards from "../../components/QuestionCards/QuestionCards";

const sectionTitle = (title: string): JSX.Element => {
  return (
    <span className="flex justify-center text-2xl font-semibold tracking-widest text-default-100">
      {title}
    </span>
  );
};

const Home = (): JSX.Element => {
  return (
    <div className="max-w-screen-xl m-auto mt-5 px-3 md:px-6">
      <QuestionForm />

      <div className="max-w-screen-xl container grid grid-cols-12 gap-5 mt-5">
        <div className="tile col-span-12 md:col-span-8 p-2 sm:p-4 bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg rounded-xl">
          {sectionTitle("10 Latest Questions")}

          <Divider className="my-3 bg-default-100 h-0.5 md:h-1 rounded" />

          <QuestionCards />
        </div>

        <div className="tile col-span-12 md:col-span-4 p-2 sm:p-4 bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg rounded-xl">
          {sectionTitle("Words Cloud")}

          <Divider className="my-3 bg-default-100 h-0.5 md:h-1 rounded" />
        </div>
      </div>
    </div>
  );
};

export default Home;
