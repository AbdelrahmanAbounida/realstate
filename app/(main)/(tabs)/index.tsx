import { Text, View } from "@/components/Themed";
import HomeHeader from "@/components/home/header";
import SearchBar from "@/components/shared/searchbar";
import FeaturesSlider from "@/components/home/features-slider";
import Recommendations from "@/components/home/home-recommendations";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "react-native";
import ProfileImage from "@/assets/icons/Home.svg";

export default function TabOneScreen() {
  return (
    <SafeAreaView className="h-full flex items-center ">
      <Text>This is home v3</Text>

      <Text className="mt-10">This is image asd asd</Text>
      {/* <ProfileImage
        width={100}
        height={100}
        source={ProfileImage}
        resizeMode="cover"
      /> */}
      <Image
        resizeMode="contain"
        alt="test image"
        source={require("@/assets/icons/Search.png")}
      />
      {/** 1- header */}
      {/* <HomeHeader />
      <SearchBar />
      <FeaturesSlider />
      <Recommendations /> */}
    </SafeAreaView>
  );
}
