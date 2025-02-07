import { Divider } from "@/app/ui/divider";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { recommendationsItems } from "@/constants/items";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";

export default function AppartmentScreen() {
  const { appartmentId } = useLocalSearchParams();

  const appartment = recommendationsItems.find(
    (i) => i.id == parseInt(appartmentId as string)
  );

  const windowHeight = Dimensions.get("window").height;
  const router = useRouter();

  return (
    <View className="flex-1 flex w-full h-full flex-col">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="bg-white flex-1 "
      >
        {/** Image */}
        <View className="relative w-full" style={{ height: windowHeight / 2 }}>
          <Image
            source={appartment?.image}
            className=" size-full"
            resizeMode="cover"
          />
          <Image
            source={images.whiteGradient}
            className="absolute top-0 w-full z-40"
          />

          <View
            className="z-50 absolute inset-x-7"
            style={{
              top: Platform.OS === "ios" ? 70 : 20,
            }}
          >
            <View className="flex flex-row items-center w-full justify-between">
              <TouchableOpacity
                onPress={() => router.back()}
                className="flex flex-row rounded-full size-13 items-center justify-center"
              >
                <Image source={icons.backArrow} className="size-7" />
              </TouchableOpacity>

              <View className="flex flex-row items-center gap-7">
                <Image
                  source={icons.heart}
                  className="size-7"
                  tintColor={"#191D31"}
                />
                <Image source={icons.send} className="size-7" />
              </View>
            </View>
          </View>
        </View>

        {/** Page Content */}
        <View className="p-4">
          <Text className=" font-rubik-semibold text-[24px]">
            {appartment?.title}
          </Text>

          {/** Rage */}

          {/** Other Details
           *
           */}

          <Divider className=" " />
        </View>
      </ScrollView>
    </View>
  );
}
