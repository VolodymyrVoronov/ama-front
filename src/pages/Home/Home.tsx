import QuestionForm from "../../components/QuestionForm/QuestionForm";

const Home = (): JSX.Element => {
  return (
    <div className="max-w-screen-xl m-auto mt-5 px-3 md:px-6">
      <QuestionForm />

      <div className="container grid grid-cols-12 gap-5 mt-5">
        <div className="tile col-span-8 bg-slate-300">1</div>
        <div className="tile col-span-4 bg-slate-700">2</div>
      </div>
    </div>
  );
};

export default Home;
