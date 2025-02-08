import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const RecommendationsFilters = () => {
  // TODO:: Load filters from database
  const filters = ["All", "House", "Villa", "Apartments", "Others"];

  const [currentFilter, setcurrentFilter] =
    useState<(typeof filters)[number]>("All");
  return (
    <View className="flex items-center gap-4 mt-5 w-full ">
      <View className="flex flex-row items-center justify-between w-full">
        <Text className="font-rubik-semibold text-lg">Our Recommendation</Text>
        <TouchableOpacity>
          <Text className="text-primary-300 font-rubik-semibold">See All</Text>
        </TouchableOpacity>
      </View>

      {/** Filters */}
      <ScrollView
        contentContainerClassName=" gap-3.5 flex flex-row items-center justify-between "
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {filters.map((filter, index) => (
          <TouchableOpacity
            onPress={() => setcurrentFilter(filter)}
            className={cn(
              "bg-primary-100 rounded-3xl  p-2 border border-primary-200",
              filter == currentFilter && "bg-primary-300",
              "px-5"
            )}
            key={index}
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
        ))}
      </ScrollView>

      {/* <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mt-3 mb-2"
      >
        {filters.map((filter, index) => (
          <TouchableOpacity
            onPress={() => setcurrentFilter(filter)}
            key={index}
            className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
              filter == currentFilter
                ? "bg-primary-300"
                : "bg-primary-100 border border-primary-200"
            }`}
          >
            <Text
              className={`text-sm ${
                filter == currentFilter
                  ? "text-white font-rubik-bold mt-0.5"
                  : "text-black-300 font-rubik"
              }`}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}
    </View>
  );
};

export default RecommendationsFilters;
