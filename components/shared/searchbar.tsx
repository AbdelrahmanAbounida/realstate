import icons from "@/constants/icons";
import React from "react";
import { Image, TextInput, View } from "react-native";

const SearchBar = () => {
  return (
    <View className="  w-full flex items-center gap-2 flex-row justify-between bg-accent-100  rounded-lg p-3">
      <View className="flex flex-1  flex-row gap-2 items-center h-full w-full">
        <Image
          source={icons.ExploreIcon}
          alt="search icon"
          width={20}
          height={20}
          resizeMode="cover"
          className=""
        />
        <TextInput className="focus:border-0 focus:outline-none ring-0  w-full h-full placeholder:text-gray-600 placeholder:text-sm text-md" />
      </View>

      <Image
        source={icons.FilterIcon}
        alt="search options"
        width={20}
        height={20}
        resizeMode="cover"
      />
    </View>
  );
};

export default SearchBar;
