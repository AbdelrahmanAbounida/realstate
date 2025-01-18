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
    <SafeAreaView className="h-full w-full bg-white flex flex-col  items-center ">
      <View className="px-[20px] py-[20px] w-full flex flex-col gap-7 ">
        <HomeHeader className="" />
        <SearchBar />
        <FeaturesSlider />
        <Recommendations />
      </View>
    </SafeAreaView>
  );
}
