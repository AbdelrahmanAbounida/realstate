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
import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import { recommendationsItems } from "@/constants/items";

const Recommendations = ({ className }: { className?: string }) => {
  const router = useRouter();
  return (
    <View className={cn("flex flex-col gap-5 mt-2", className)}>
      <RecommendationsFilters />

      <View className="w-full flex-row flex-wrap gap-2   items-center justify-between mb-32 ">
        {recommendationsItems.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/(main)/appartments/[appartmentId]",
                params: { appartmentId: item.id },
              })
            }
            key={index}
            className="bg-white border border-black-100/20 p-3 rounded-lg gap-3 mb-3"
            style={{ width: "48%" }}
          >
            {/** Image  */}
            <View className="relative">
              <Image
                source={item.image}
                alt="item img"
                className="w-full" // Use full width of the container
                width={120}
                height={150}
                resizeMode="cover"
              />

              {/** Rate */}
              <View className="absolute top-2 right-2 px-2 flex items-center gap-1 flex-row bg-accent-100 rounded-2xl p-1">
                <Image source={icons.StarIcon} alt="star" />
                <Text className="text-primary-300 font-rubik-medium text-sm">
                  {item.rate}
                </Text>
              </View>
            </View>

            {/** Details */}
            <View className="flex flex-col p-0 items-start justify-start">
              <Text className="text-[16px] font-rubik-medium ">
                {item.title}
              </Text>
              <Text className="text-black-100 font-rubik text-[12px]">
                {item.place}
              </Text>
              <View className="w-full flex flex-row items-center justify-between mt-4">
                <Text className="text-primary-300/90 font-rubik-medium text-[12px]">
                  ${item.value}
                </Text>

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
