import HomeHeader from "@/components/home/header";
import SearchBar from "@/components/shared/searchbar";
import FeaturesSlider from "@/components/home/features-slider";
import Recommendations from "@/components/home/home-recommendations";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, ScrollView } from "react-native";

export default function TabOneScreen() {
  return (
    <SafeAreaView className="h-full w-full bg-[#FDFDFD] flex flex-col  items-center ">
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-[10px] py-[20px] flex flex-col gap-7 h-full "
      >
        <HomeHeader className="my-3" />
        <SearchBar />
        <FeaturesSlider className="mt-4" />
        <Recommendations />
      </ScrollView>
    </SafeAreaView>
  );
}
