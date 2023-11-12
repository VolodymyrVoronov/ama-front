import { Image, ImageProps } from "@nextui-org/react";
import cn from "classnames";

interface ILogoProps extends ImageProps {
  imgSrc?: string;
  alt?: string;
  logoTextShort?: string;
  logoTextLong?: string;
  className?: string;
  wrapperClassName?: string;
}

const Logo = ({
  imgSrc = "./public/assets/logo.png",
  alt = "AMA Logo",
  logoTextShort = "AMA",
  logoTextLong = "Ask Me Anything",
  className,
  wrapperClassName,
  ...props
}: ILogoProps): JSX.Element => {
  return (
    <>
      <div className={cn("mr-5 w-10 sm:w-12", wrapperClassName)}>
        <Image
          className={cn("px-1 py-1", className)}
          radius="sm"
          shadow="md"
          removeWrapper
          alt={alt}
          src={imgSrc}
          {...props}
        />
      </div>
      <p className="font-semibold text-xl">
        <span className="inline md:hidden">{logoTextShort}</span>
        <span className="hidden md:inline">{logoTextLong}</span>
      </p>
    </>
  );
};

export default Logo;
