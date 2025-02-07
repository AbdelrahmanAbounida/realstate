import React from "react";
import { ScrollView, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";
import { Mail } from "lucide-react-native";
import { useRouter } from "expo-router";

const AuthHome = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="">
      <ScrollView>
        <View className="h-full flex flex-col items-center p-5 justify-start relative px-4 mx-auto text-center w-full">
          <Image
            className=""
            source={images.AuthHomeImage}
            // className="object-cover"
            style={{
              resizeMode: "contain",
              width: 390,
              height: 552,
            }}
          />
          <View className="z-10 text-center justify-center flex flex-col items-center mx-auto w-full gap-4">
            {/* <Text className="uppercase font-rubik-light text-[16px] text-black-200 leading-5 tracking-wider absolute -top-12  ">
              WELCOME TO REAL SCOUT
            </Text> */}

            <Text className="capitalize font-rubik-bold text-[32px] leading-[41px] mx-auto w-full text-center flex flex-row justify-center absolute -top-20 ">
              {"Let’s get you closer\n"} to
              <Text className="text-primary-300 capitalize">
                {" "}
                your ideal home
              </Text>
            </Text>

            <TouchableOpacity
              onPress={() => {
                router.push("/login");
              }}
              className="  w-full flex flex-row gap-3  mt-7 bg-white text-center justify-center items-centers rounded-full p-4"
            >
              <Mail />
              <Text className="text-black-300 font-rubik-medium text-[18px]  ">
                Sign Up with Email
              </Text>
            </TouchableOpacity>

            {/** TODO:: Login with google */}
            <TouchableOpacity className="  w-full flex flex-row gap-3  bg-white text-center justify-center rounded-full p-4">
              <Image source={icons.GoogleIcon} />
              <Text className="text-black-300 font-rubik-medium text-[18px]">
                Sign Up with Google
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AuthHome;
