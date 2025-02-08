import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import {
  StyleSheet,
  FlatList,
  StatusBar,
  Text,
  View,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import NewYorkImage from "@/assets/images/new-york.png";
import { FeaturedCard } from "../shared/card";
import { useRouter } from "expo-router";
import { recommendationsItems } from "@/constants/items";

const data = [
  {
    id: 1,
    img: "",
  },
  {
    id: 2,
    img: "",
  },
  {
    id: 3,
    img: "",
  },
];
// const DATA = [
//   {
//     id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//     title: "First Item",
//     img: NewYorkImage,
//   },
//   {
//     id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//     title: "Second Item",
//     img: NewYorkImage,
//   },
//   {
//     id: "58694a0f-3da1-471f-bd96-145571e29d72",
//     title: "Third Item",
//     img: NewYorkImage,
//   },
// ];

type ItemProps = { title: string; img: ImageSourcePropType };

const Item = ({ title, img }: ItemProps) => (
  <View className={` rounded-xl w-60 h-80`}>
    <Image
      resizeMode="contain"
      source={img}
      alt="item image"
      className="size-full rounded-2xl"
    />
  </View>
);

const FeaturesSlider = ({ className }: { className?: string }) => {
  const carouselRef = useRef<any>();

  const router = useRouter();

  return (
    <View className={cn(" w-full  ", className)}>
      <View className="flex flex-row items-center justify-between w-full">
        <Text className="text-xl font-rubik-semibold">Featured</Text>
        <TouchableOpacity>
          <Text className="text-lg font-rubik-semibold text-primary-300">
            See All
          </Text>
        </TouchableOpacity>
      </View>

      {/*** Images slider */}
      <View className="  mt-3 ">
        {/* <Animated.FlatList
          data={DATA}
          // numColumns={2}
          renderItem={({ item }) => <Item img={item.img} title={item.title} />}
          keyExtractor={(item) => item.id}
          horizontal
          ref={carouselRef}
          // columnWrapperClassName={" rounded-md "}
          // onScroll={}
          // initialNumToRender={}
          // showsHorizontalScrollIndicator={false}
          contentContainerClassName={"flex   flex-row items-center gap-3"}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          // ListEmptyComponent={<Text>asd</Text>}
          // ListHeaderComponent={<Text>asd</Text>}
        /> */}

        <Animated.FlatList
          data={recommendationsItems}
          renderItem={({ item }) => (
            <FeaturedCard
              item={item}
              onPress={() => router.push(`/appartments/${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="flex gap-5 mt-5"
        />
      </View>
    </View>
  );
};

export default FeaturesSlider;
