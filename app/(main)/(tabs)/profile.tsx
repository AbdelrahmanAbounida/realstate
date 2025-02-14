import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { cn } from "@/lib/utils";
import icons from "@/constants/icons";
import images from "@/constants/images";
// Component interfaces
interface ProfileOptionProps {
  isLogout?: boolean;
  title: string;
  icon: ImageSourcePropType;
}

const ProfileOptions1: ProfileOptionProps[] = [
  { title: "My Booking", icon: icons.Calender },
  { title: "Payments", icon: icons.Wallet },
];

const ProfileOptions2: ProfileOptionProps[] = [
  { title: "Profile", icon: icons.User },
  { title: "Notification", icon: icons.Bell2 },
  { title: "Security", icon: icons.Shield },
  { title: "Language", icon: icons.MoreCircle },
  { title: "Help Center", icon: icons.InfoSquare },
  { title: "Invite Friends", icon: icons.Users },
  { title: "Logout", icon: icons.Logout, isLogout: true },
];

const ProfileOption = ({ details }: { details: ProfileOptionProps }) => (
  <TouchableOpacity className="flex flex-row items-center justify-between w-full">
    <View className="flex flex-row items-center gap-3">
      <Image source={details.icon} />
      <Text
        className={cn(
          "font-rubik text-base",
          details.isLogout && "text-red-500"
        )}
      >
        {details.title}
      </Text>
    </View>
    <Image source={icons.RightArrow} />
  </TouchableOpacity>
);

export default function ProfilePage() {
  return (
    <SafeAreaView className="flex flex-col items-center w-full h-full bg-[#FDFDFD]">
      <ScrollView
        className="w-full p-4"
        contentContainerStyle={{ gap: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex flex-row items-center justify-between w-full sticky">
          <Text className="text-xl font-rubik-medium">Profile</Text>
          <View>
            <Image source={icons.NotificationIcon} className="w-7 h-7" />
          </View>
        </View>

        {/* Profile Section */}
        <View className="flex items-center justify-center w-full gap-3">
          <View className="relative flex items-center justify-center gap-3 mx-auto mt-10">
            <Image
              source={images.ProfileImageBig}
              className="w-[140px] h-[140px] rounded-full"
            />
            <Image
              source={icons.PenIcon}
              className="absolute bottom-0 right-0"
            />
          </View>
          <Text className="text-2xl font-rubik-medium">Adrian Haijdin</Text>
        </View>

        <View className="h-px bg-gray-200" />

        {/* First Options Group */}
        <View className="flex gap-7">
          {ProfileOptions1.map((option, index) => (
            <ProfileOption key={index} details={option} />
          ))}
        </View>

        <View className="h-px bg-gray-200" />

        {/* Second Options Group */}
        <View className="flex gap-7 pb-[110px]">
          {ProfileOptions2.map((option, index) => (
            <ProfileOption key={index} details={option} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
