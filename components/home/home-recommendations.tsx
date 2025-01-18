import React from "react";
import { Text, View } from "react-native";
import RecommendationsFilters from "../shared/recommendations-filters";
import { cn } from "@/lib/utils";

const Recommendations = ({ className }: { className?: string }) => {
  return (
    <View className={cn(className)}>
      <RecommendationsFilters />
      <Text>Recommendations</Text>
    </View>
  );
};

export default Recommendations;
