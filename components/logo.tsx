import { Image, Text } from "react-native";
import icons from "@/constants/icons";
import { Link } from "expo-router";

const Logo = () => {
  return (
    <Link href={"/"}>
      <Image source={icons.LogoIcon} />
    </Link>
  );
};

export default Logo;
