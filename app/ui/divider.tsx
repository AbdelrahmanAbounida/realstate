import * as React from "react";
import { cn } from "@/lib/utils";
import { View } from "react-native";

export const Divider = ({ className }: { className?: string }) => {
  return (
    <View
      className={cn(
        "border-[#0061FF1A] bg-gray-50 border-b-[1px]  flex w-full",
        className
      )}
    />
  );
};
