import { Button } from "@nextui-org/react";

const BackToTopButton = (): JSX.Element => {
  const onBackToTopButtonClick = (): void =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <span className="fixed bottom-0 right-0 z-50 p-2 lg:p-5 bg-slate-50 rounded-tl-3xl">
      <Button
        onClick={onBackToTopButtonClick}
        color="primary"
        variant="flat"
        className="font-semibold text-md text-white bg-gradient-to-tr from-cyan-500 to-blue-500 shadow-lg"
      >
        To top
      </Button>
    </span>
  );
};

export default BackToTopButton;
