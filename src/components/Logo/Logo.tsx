import { Image, ImageProps } from "@nextui-org/react";
import cn from "classnames";

interface ILogoProps extends ImageProps {
  imgSrc?: string;
  alt?: string;
  className?: string;
  wrapperClassName?: string;
}

const Logo = ({
  imgSrc = "./public/assets/logo.png",
  alt = "AMA Logo",
  className,
  wrapperClassName,
  ...props
}: ILogoProps): JSX.Element => {
  return (
    <div className={cn("mr-5 w-10 sm:w-12", wrapperClassName)}>
      <Image
        className={cn("px-2 py-2", className)}
        radius="full"
        shadow="md"
        removeWrapper
        alt={alt}
        src={imgSrc}
        {...props}
      />
    </div>
  );
};

export default Logo;
