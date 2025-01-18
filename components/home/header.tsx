import React from "react";
import { Image, Text, View } from "react-native";
import ProfileImage from "@/assets/images/image.png";
import icons from "@/constants/icons";
import { cn } from "@/lib/utils";

const HomeHeader = ({ className }: { className?: string }) => {
  return (
    <View
      className={cn(
        "w-full flex flex-row  items-center justify-between",
        className
      )}
    >
      {/** User Nav */}
      <View className="flex flex-row items-center gap-3">
        <Image
          source={ProfileImage}
          alt="profile-image"
          width={44}
          height={44}
          resizeMode="cover"
          className="rounded-full"
        />
        <View className="flex flex-col gap-1 text-sm">
          <Text className="text-sm text-black-200">Good Morning</Text>
          <Text className="text-black font-rubik-medium text-md">
            Abdel Yousef
          </Text>
        </View>
      </View>
      {/** Notification */}
      <View className="size-6 relative">
        <Image
          className="size-7"
          source={icons.NotificationIcon}
          alt="notiofication"
          width={17}
          height={16}
        />{" "}
        {/** TODO:: add blue fill in case of notifications */}
        <View className="absolute top-[1px] -right-[1px] bg-primary-300 h-[8px] w-[8px] rounded-full" />
      </View>
    </View>
  );
};

export default HomeHeader;
