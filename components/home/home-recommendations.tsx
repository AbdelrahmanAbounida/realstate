import React from "react";
import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RecommendationsFilters from "../shared/recommendations-filters";
import { cn } from "@/lib/utils";
import images from "@/constants/images";
import { Heart, Star } from "lucide-react-native";
import { FlatList } from "react-native-gesture-handler";
import icons from "@/constants/icons";
import { useRouter } from "expo-router";

interface RecommendationItemProps {
  id: number;
  title: string;
  value: number;
  place: string;
  rate: number;
  image: ImageSourcePropType;
}
const recommendationsItems: RecommendationItemProps[] = [
  {
    id: 1,
    title: "La Grand Masion",
    place: "Tokyo, Japan",
    value: 122219,
    image: images.TokyoRecomm1,
    rate: 4.7,
  },
  {
    id: 2,
    title: "La Grand Masion",
    place: "Us, NewYork",
    value: 789132,
    image: images.TokyoRecomm4,
    rate: 4.8,
  },
  {
    id: 3,
    title: "La Grand Masion",
    place: "Egypt Cairo",
    value: 353412,
    image: images.TokyoRecomm3,
    rate: 4.9,
  },
  {
    id: 4,
    title: "La Grand Masion",
    place: "Tokyo, Japan",
    value: 1242134,
    image: images.TokyoRecomm4,
    rate: 4.5,
  },
];

const Recommendations = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <View className={cn("flex flex-col gap-5 mt-2", className)}>
      <RecommendationsFilters />

      <View className="w-full flex-row flex-wrap gap-4  mb-32">
        {recommendationsItems.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(main)/appartments/[appartmentId]",
                params: { appartmentId: item.id },
              })
            }
            key={index}
            className="bg-white border border-black-100/20 p-3 rounded-lg gap-3  w-[170px]"
          >
            {/** Image  */}
            <View className="relative">
              <Image
                source={item.image}
                alt="item img"
                className="w-[150px]"
                width={120}
                height={150}
                resizeMode="cover"
              />

              {/** Rate */}
              <View className="absolute top-2 right-5  px-2 flex items-center gap-1 flex-row bg-accent-100 rounded-2xl p-1">
                <Image source={icons.StarIcon} alt="star" />
                <Text className="text-primary-300 font-rubik-medium text-sm">
                  {item.rate}
                </Text>
              </View>
            </View>

            {/** Details */}
            <View className="flex flex-col  p-0 items-start justify-start">
              <Text className="text-[16px] font-rubik-medium ">
                {item.title}
              </Text>
              <Text className="text-black-100  font-rubik text-[12px]">
                {item.place}
              </Text>
              <View className="w-full flex flex-row items-center justify-between mt-4">
                <Text className="text-primary-300/90 font-rubik-medium text-[12px]">
                  ${item.value}
                </Text>

                {/* <Heart className="" size={15} /> */}
                <Image source={icons.HeartIcon} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Recommendations;
