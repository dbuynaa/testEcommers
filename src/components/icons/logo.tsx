import { content } from "lib/Settings";
import Image from "next/image";

const Logo = ({ ...props }) => {
  return (
    <Image src={content.logo} {...props} alt="logo" width={120} height={120} />
  );
};

export default Logo;
