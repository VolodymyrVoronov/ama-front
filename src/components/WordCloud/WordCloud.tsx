import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";

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
      className="flex flex-grow text-md text-white capitalize border-1 border-purple-100"
      variant={selected ? "shadow" : "flat"}
      color={selected ? "primary" : "default"}
      as={motion.button}
      whileHover={{ scale: 1.05 }}
    >
      {word}
    </Button>
  );
};

export default WordCloud;
