import { cn } from "@/lib/utils";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

export const FilterItem = ({
  filter,
  currentFilter,
  updateCurrentFilter,
}: any) => {
  return (
    <TouchableOpacity
      onPress={() => updateCurrentFilter(filter)}
      className={cn(
        "bg-primary-100 rounded-3xl  p-2 border border-primary-200",
        filter == currentFilter && "bg-primary-300",
        "px-5"
      )}
    >
      <Text
        className={cn(
          "text-black-300 text-sm ",
          filter == currentFilter
            ? "text-white font-rubik-medium"
            : "font-rubik"
        )}
      >
        {filter}
      </Text>
    </TouchableOpacity>
  );
};
