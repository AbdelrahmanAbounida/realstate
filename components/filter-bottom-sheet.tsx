import icons from "@/constants/icons";
import { useRouter } from "expo-router";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import images from "@/constants/images";
import { cn } from "@/lib/utils";
import { Divider } from "./ui/divider";
import { CustomSlider } from "./ui/custom-range";

// TODO:: to be loaded from db
const PROPERTIES = [
  "Apartments",
  "Townhomes",
  "Homes",
  "Condos",
  "Duplexes",
  "Studioes",
];

export const FilterBottomSheet = ({ children }: { children?: ReactNode }) => {
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const insets = useSafeAreaInsets();

  // states
  const [currentFilters, setcurrentFilters] = useState<string[]>([
    "Apartments",
  ]);
  const [bedrooms, setbedrooms] = useState(2);
  const [bathrooms, setbathrooms] = useState(1);

  const updateCurrentFilters = (filter: string) => {
    // check if filter exist in current filters
    if (currentFilters.includes(filter)) {
      setcurrentFilters([...currentFilters.filter((item) => item !== filter)]);
    } else {
      setcurrentFilters((curr) => [...curr, filter]);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={() => actionSheetRef.current?.show()}>
        {children ?? <Text>Open</Text>}
      </TouchableOpacity>

      <ActionSheet
        drawUnderStatusBar={false}
        useBottomSafeAreaPadding
        safeAreaInsets={insets}
        ref={actionSheetRef}
        closable={true}
        containerStyle={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          padding: 3,
        }}
      >
        <View className="w-full pt-[10px] px-[14px] flex gap-7   ">
          {/** left arrow, filter, reset  */}
          <FilterHeader actionSheetRef={actionSheetRef} />

          {/** Price Range  */}
          <View className="flex gap-3">
            <Text className="font-rubik-medium text-[16px]">Price Range</Text>
            <View className="w-full flex items-center px-1">
              <Image source={images.BarChart} className="w-full" />
              <CustomSlider
                defaultMin={102}
                defaultMax={327}
                postfix={"$"}
                min={0}
                max={500}
              />
            </View>
          </View>

          {/** property Type */}
          <View>
            <Text className="font-rubik-medium text-[16px] mt-7">
              Property Type
            </Text>
            <View className="flex items-center flex-row flex-wrap w-full mt-4 gap-4">
              {PROPERTIES.map((prop, index) => (
                <FilterItem
                  filter={prop}
                  key={index}
                  currentFilters={currentFilters}
                  updateCurrentFilter={updateCurrentFilters}
                />
              ))}
            </View>
          </View>

          {/** Home Details */}
          <View>
            <Text className="font-rubik-medium text-[16px] mt-7">
              Home Details
            </Text>

            {/**Bedrooms */}
            <RoomsFilters
              className="mt-4"
              title="Bedrooms"
              items={bedrooms}
              setItems={setbedrooms}
            />

            <Divider className="my-3" />
            {/** Bathrooms */}
            <RoomsFilters
              title="Bathrooms"
              items={bathrooms}
              setItems={setbathrooms}
            />
          </View>

          {/** Building Size */}
          <View className="px-1 flex items-center w-full">
            <CustomSlider
              defaultMin={1370}
              defaultMax={2720}
              min={100}
              max={3500}
            />
          </View>

          {/** Set Filters button */}
          <TouchableOpacity className="bg-primary-300 p-5 mt-5 rounded-full flex items-center">
            <Text className="text-white text-[16px] font-medium">
              Set Filter{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </ActionSheet>
    </View>
  );
};

const FilterHeader = ({ actionSheetRef }: { actionSheetRef: any }) => {
  return (
    <View className="flex flex-row items-center justify-between pt-2 ">
      <TouchableOpacity
        onPress={() => actionSheetRef.current?.hide()}
        className="p-2 rounded-full  flex items-center justify-center bg-[#0061FF1A]"
      >
        <Image source={icons.LeftArrow} />
      </TouchableOpacity>

      <Text className="text-[16px] font-rubik-medium">Filter</Text>

      <TouchableOpacity>
        <Text className="text-primary-300 font-rubik text-[14px]">Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const FilterItem = ({
  filter,
  currentFilters,
  updateCurrentFilter,
}: {
  filter: string;
  currentFilters: string[];
  updateCurrentFilter: (item: string) => void;
}) => (
  <TouchableOpacity
    onPress={() => updateCurrentFilter(filter)}
    className={cn(
      "bg-primary-100 rounded-3xl  p-2 border border-primary-200",
      currentFilters.includes(filter) && "bg-primary-300",
      "px-5"
    )}
  >
    <Text
      className={cn(
        "text-black-300 text-sm ",
        currentFilters.includes(filter)
          ? "text-white font-rubik-medium"
          : "font-rubik"
      )}
    >
      {filter}
    </Text>
  </TouchableOpacity>
);

const RoomsFilters = ({
  title,
  items,
  setItems,
  className,
}: {
  title: string;
  items: number;
  setItems: (x: number) => void;
  className?: string;
}) => {
  return (
    <View
      className={cn(
        "w-full flex items-center justify-between  flex-row",
        className
      )}
    >
      <Text className="text-black-200 font-[14px] font-rubik-medium">
        {title}
      </Text>
      <View className="flex items-center justify-between flex-row gap-5">
        <TouchableOpacity
          onPress={() => setItems(Math.max(0, items - 1))}
          className="bg-primary-100 p-3 rounded-full"
        >
          <Image className="" source={icons.Minus} />
        </TouchableOpacity>

        <Text className="text-[12px] font-rubik-bold text-black-300">
          {items}
        </Text>
        <TouchableOpacity
          onPress={() => setItems(items + 1)}
          className="bg-primary-100 p-2 rounded-full"
        >
          <Image className="" source={icons.Plus} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
