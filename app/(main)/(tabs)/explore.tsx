import HomeHeader from "@/components/home/header";
import SearchBar from "@/components/shared/searchbar";
import Recommendations from "@/components/home/home-recommendations";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";

const ExploreScreenTab = () => {
  return (
    <SafeAreaView className="h-full w-full bg-[#FDFDFD] flex flex-col  items-center ">
      <ScrollView className="px-[20px] py-[20px] flex flex-col gap-7 h-full ">
        <HomeHeader className="my-3" />
        <SearchBar />
        <Recommendations />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ExploreScreenTab;
