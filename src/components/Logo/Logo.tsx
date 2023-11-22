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
      <div className="font-semibold text-xl bg-gradient-to-tr from-cyan-500 to-blue-500 bg-clip-text text-transparent">
        <span className="inline lg:hidden">{logoTextShort}</span>
        <span className="hidden lg:inline">{logoTextLong}</span>
      </div>
    </>
  );
};

export default Logo;
