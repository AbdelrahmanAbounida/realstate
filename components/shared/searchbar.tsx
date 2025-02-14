import icons from "@/constants/icons";
import { cn } from "@/lib/utils";
import React from "react";
import { Image, Platform, TextInput, View } from "react-native";
import { FilterBottomSheet } from "../filter-bottom-sheet";

const SearchBar = () => {
  {
    /** TODO:: add search query here */
  }
  return (
    <View
      className={cn(
        "  w-full flex items-center gap-2 flex-row justify-between bg-accent-200 border border-primary-200  rounded-lg py-1 px-2",
        Platform.OS === "ios" && "p-3"
      )}
    >
      <View className="flex flex-1  flex-row gap-2 items-center h-full w-full">
        <Image
          source={icons.ExploreIcon}
          alt="search icon"
          width={18}
          height={18}
          resizeMode="cover"
          className="size-5"
        />
        <TextInput className="focus:border-0 focus:outline-none ring-0  w-full h-full placeholder:text-gray-600 placeholder:text-sm text-md" />
      </View>

      <FilterBottomSheet>
        <Image
          source={icons.FilterIcon}
          width={20}
          height={20}
          resizeMode="cover"
          className="size-5"
        />
      </FilterBottomSheet>
    </View>
  );
};

export default SearchBar;
