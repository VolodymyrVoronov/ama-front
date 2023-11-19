import { Button } from "@nextui-org/react";

interface IWordCloudProps {
  word: string;
  selected: boolean;
  onWordClickHandler: (word: string) => void;
}

const WordCloud = ({
  word,
  selected,
  onWordClickHandler,
}: IWordCloudProps): JSX.Element => {
  const onWordClick = (): void => {
    onWordClickHandler(word);
  };

  return (
    <Button
      onClick={onWordClick}
      className="flex flex-grow text-md text-default-100 capitalize border-1 border-purple-100"
      variant={selected ? "shadow" : "flat"}
      color={selected ? "primary" : "default"}
    >
      {word}
    </Button>
  );
};

export default WordCloud;
