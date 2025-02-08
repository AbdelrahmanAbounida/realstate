import { Divider } from "@/components/ui/divider";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { recommendationsItems } from "@/constants/items";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
  ImageSourcePropType,
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

        {/** Page Content >> TODO:: To be loaded from db */}
        <View className="p-4 flex gap-4">
          <Text className=" font-rubik-semibold text-[24px]">
            {appartment?.title}
          </Text>

          {/** 1- Rate */}
          <View className="flex flex-row items-center gap-2 ">
            <View className=" bg-primary-100 p-1 px-3 rounded-xl">
              <Text className="uppercase text-primary-300 text-[10px] font-rubik-medium">
                Apartment
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Image source={icons.StarIcon} resizeMode="contain" />
              <Text className="text-black-200 font-rubik-medium">4.8</Text>
              <Text className="text-black-200 font-rubik-medium">
                (1,275 reviews)
              </Text>
            </View>
          </View>

          {/** 2- Other Details */}
          <View className="flex items-center flex-row justify-start gap-4">
            <AppartmentDetails title="8 Beds" icon={icons.bed} />
            <AppartmentDetails title="3 Bath" icon={icons.bath} />
            <AppartmentDetails title="2000 sqft" icon={icons.area} />
          </View>

          <Divider className="my-3 " />

          {/** 3- agent View */}

          {/** 4- Overview */}

          {/** 5- Facilities */}

          {/** 6- Galleries */}

          {/** 7- Location */}

          {/** 8- Reviews start */}

          {/** 9- Reviews Comments */}

          {/** 10- Price and Book Now */}
        </View>
      </ScrollView>
    </View>
  );
}

const AppartmentDetails = ({
  title,
  icon,
}: {
  title: string;
  icon: ImageSourcePropType;
}) => {
  return (
    <View className="flex flex-row items-center gap-2">
      <View className="bg-primary-100 p-3 rounded-full">
        <Image source={icon} className="" />
      </View>

      <Text className="text-black-300 text-[14px] font-rubik-medium">
        {title}
      </Text>
    </View>
  );
};
