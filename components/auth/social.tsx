import icons from "@/constants/icons";
import { toast as toast2 } from "@/lib/toast";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useToast } from "react-native-toast-notifications";
// import { useToast } from "react-native-toast-notifications";

const SocialAuth = ({ className }: { className?: string }) => {
  const toast = useToast();

  const handleSocialAuth = async () => {
    toast.show("This is google ", {
      dangerColor: "red",
      type: "success",
    });
  };

  return (
    <View className={className}>
      <TouchableOpacity
        onPress={handleSocialAuth}
        className="  w-full flex flex-row gap-3  bg-white text-center justify-center rounded-xl mt-4 p-4"
      >
        <Image source={icons.GoogleIcon} />
        <Text className="text-black-300 font-rubik-medium text-[15px] pt-0.5">
          Sign Up with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SocialAuth;
