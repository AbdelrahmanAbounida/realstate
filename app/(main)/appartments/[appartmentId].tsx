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

  const GALLERIES = [
    images.Gallery1,
    images.Gallery2,
    images.Gallery3,
    images.Gallery3,
    images.Gallery3,
  ];

  const REVIEWS = [
    {
      personName: "Charolette Hanlin",
      personImage: images.Person1,
      comment:
        "The apartment is very clean and modern. I really like the interior design. Looks like I'll feel at home 😍",
      loveCount: 938,
      date: "6 days ago",
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
              <View className="flex flex-row flex-wrap gap-4  w-full ">
                {FACILITIES.map((facility, index) => (
                  <Facility key={index} {...facility} />
                ))}
              </View>
            </View>

            {/** 6- Galleries */}
            {
              <View className="flex gap-3">
                <SubTitle title="Gallery" />
                <ImageGalleryWithOverflow images={GALLERIES} maxVisible={3} />
              </View>
            }

            {/** 7- Location */}
            <View className="flex gap-4">
              <SubTitle title="Location" />
              <View className="flex-row items-center gap-3">
                <Image source={icons.gps} />
                <Text className="text-[14px] font-rubik-medium text-black-100">
                  {appartment?.place}
                </Text>
              </View>
              <Image
                source={images.Map}
                resizeMode="cover"
                className="w-full rounded-xl"
              />
            </View>

            {/** 8- Reviews start */}
            <View className="flex flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <Image
                  source={icons.StarIcon}
                  className="size-4"
                  width={24}
                  height={24}
                />
                <Text className="text-black-300 text-[20px] font-rubik-semibold">
                  {appartment?.rate} {"(1,275 reviews)"}
                </Text>
              </View>

              <TouchableOpacity>
                <Text className="text-primary-300 font-semibold text-[16px]">
                  See All
                </Text>
              </TouchableOpacity>
            </View>

            {/** 9- Reviews Comments */}
            {REVIEWS.map((review, index) => (
              <ReviewComment key={index} {...review} />
            ))}
          </View>
        </View>
        {/** 10- Price and Book Now */}
        <View className="w-full bg-white shadow-sm border border-primary-200 p-[24px] pb-[30px] rounded-t-[36px]">
          <View className="flex flex-row items-center justify-between w-full">
            <View className="flex gap-1 flex-1 justify-center">
              <Text className="text-black-200 uppercase text-[12px] font-rubik-medium leading-[14px] tracking-widest">
                Price
              </Text>
              <Text className="text-primary-300 font-rubik-semibold text-[24px]">
                $ {appartment?.value}
              </Text>
            </View>

            <TouchableOpacity className="bg-primary-300 flex-row items-center justify-center py-[14px] px-[16px] rounded-[100px] flex-1">
              <Text className="capitalize text-white">Booking Now</Text>
            </TouchableOpacity>
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

const ImageGalleryWithOverflow = ({
  images,
  maxVisible = 4,
}: {
  images: ImageSourcePropType[];
  maxVisible?: number;
}) => {
  if (!images || images.length === 0) return null;

  const overflowCount = images.length - maxVisible;
  const visibleImages = images.slice(0, maxVisible);
  const showOverflow = overflowCount > 0;
  const imagesToShow = showOverflow
    ? visibleImages.slice(0, maxVisible - 1)
    : visibleImages;

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      contentContainerClassName="flex-row gap-3 flex-2  items-center "
      className="mb-3"
    >
      {imagesToShow.map((image, index) => (
        <Image
          key={index}
          source={image}
          className=" rounded-lg"
          resizeMode="cover"
        />
      ))}

      {showOverflow && (
        <View className="relative ">
          <Image
            source={images[maxVisible - 1]}
            className="rounded-lg"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-black-300/60 rounded-lg items-center justify-center">
            <Text className="text-white text-xl font-bold">
              +{overflowCount}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const ReviewComment = ({
  personImage,
  personName,
  comment,
  date,
  loveCount,
}: {
  personImage: ImageSourcePropType;
  personName: string;
  comment: string;
  date: string;
  loveCount: number;
}) => {
  return (
    <View className="flex gap-4 mb-[20px]">
      <View className="flex-row gap-2 items-center">
        <Image
          source={personImage}
          className="rounded-full"
          resizeMode="cover"
        />
        <Text className="font-rubik-semibold text-[16px] text-black-300">
          {personName}
        </Text>
      </View>

      <Text className="font-rubik text-[16px] leading-[28px] text-black-200">
        {comment}
      </Text>

      <View className="flex flex-row items-center justify-between">
        <View className="flex-row gap-2">
          <Image source={icons.HeartIcon} className="text-primary-300" />
          <Text className="font-rubik-medium text-[14px]">{loveCount}</Text>
        </View>
        <Text className="text-black-100 text-[14px] font-rubik">{date}</Text>
      </View>
    </View>
  );
};
