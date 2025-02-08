import { Divider } from "@/components/ui/divider";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { recommendationsItems } from "@/constants/items";
import { cn } from "@/lib/utils";
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

  // TODO:: to be loaded from db
  const FACILITIES = [
    {
      title: "Car Parking",
      icon: icons.car,
    },
    {
      title: "Swimming",
      icon: icons.swim,
    },
    {
      title: "Gym & Fitness",
      icon: icons.gym,
    },
    {
      title: "Restaurant",
      icon: icons.restaurant,
    },
    {
      title: "Wi-fi & Network",
      icon: icons.wifi,
    },
    {
      title: "Pet Center",
      icon: icons.dog,
    },
    {
      title: "Sport Center",
      icon: icons.sports,
    },
    {
      title: "Laundry",
      icon: icons.laundry,
    },
  ];

  return (
    <View className="flex-1 flex w-full bg-white h-full flex-col">
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View className="p-4 flex gap-4 ">
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
            <AppartmentDetail title="8 Beds" icon={icons.bed} />
            <AppartmentDetail title="3 Bath" icon={icons.bath} />
            <AppartmentDetail title="2000 sqft" icon={icons.area} />
          </View>

          <Divider className="my-3 " />

          {/** 3- agent View */}
          <View className="flex gap-9 ">
            {/**  Contact */}
            <View className="flex gap-4 mt-1">
              <SubTitle title="Agent" />
              <View className="flex flex-row justify-between">
                <View className="flex items-center flex-row gap-4">
                  <Image
                    source={images.ProfileImage}
                    className="rounded-full"
                  />
                  <View className="flex flex-col gap-1">
                    <Text className="text-[18px] font-rubik-semibold">
                      Natasya Wilodra
                    </Text>
                    <Text className="text-[14px] text-black-100 font-rubik-medium">
                      Owner
                    </Text>
                  </View>
                </View>

                <View className="flex flex-row items-center gap-7 pr-2">
                  <Image source={icons.chat} />
                  <Image source={icons.call} />
                </View>
              </View>
            </View>

            {/** 4- Overview */}

            <View className="flex gap-2">
              <SubTitle title="Overview" />
              <Text className="font-rubik leading-[28px] text-[16px] text-black-200">
                Sleek, modern 2-bedroom apartment with open living space,
                high-end finishes, and city views. Minutes from downtown,
                dining, and transit.
              </Text>
            </View>

            {/** 5- Facilities */}
            <View className="flex gap-3">
              <SubTitle title="Facilities" />
              <View className="flex flex-row flex-wrap gap-4 pb-[200px] w-full ">
                {FACILITIES.map((facility, index) => (
                  <Facility key={index} {...facility} />
                ))}
              </View>
            </View>

            {/** 6- Galleries */}

            {/** 7- Location */}

            {/** 8- Reviews start */}

            {/** 9- Reviews Comments */}

            {/** 10- Price and Book Now */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const AppartmentDetail = ({
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

const SubTitle = ({ title }: { title: string }) => (
  <Text className="text-[20px] font-rubik-semibold capitalize">{title}</Text>
);

const Facility = ({
  title,
  icon,
}: {
  title: string;
  icon: ImageSourcePropType;
}) => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View
      className={cn(
        "flex gap-2 items-center justify-center w-[100px] mb-3",
        screenWidth >= 400 && "w-[80px]"
      )}
    >
      {/* Icon Container */}
      <View className="w-[60px] h-[60px] bg-primary-100 rounded-full flex-row items-center justify-center p-3">
        <Image source={icon} resizeMode="contain" />
      </View>

      <Text
        className="font-rubik text-[14px] leading-[20px] text-center truncate"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>
    </View>
  );
};
