import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { useEffect, useState } from "react";
import { Dimensions, View, Text } from "react-native";

export const CustomSlider = ({
  min,
  max,
  postfix = "",
  defaultMin,
  defaultMax,
}: {
  defaultMin: number;
  defaultMax: number;
  min: number;
  max: number;
  postfix?: string;
}) => {
  const [values, setValues] = useState([min, max]);
  const [sliderWidth, setSliderWidth] = useState(
    Dimensions.get("window").width - 50
  );

  useEffect(() => {
    const updateWidth = () => {
      setSliderWidth(Dimensions.get("window").width - 40);
    };

    Dimensions.addEventListener("change", updateWidth);
    return () => {
      // Dimensions.removeEventListener("change", updateWidth);
    };
  }, []);

  return (
    <View style={{ paddingHorizontal: 20 }}>
      <MultiSlider
        values={values}
        onValuesChange={(newValues) => setValues(newValues)}
        min={defaultMin}
        max={defaultMax}
        step={1}
        sliderLength={sliderWidth}
        containerStyle={{ padding: 0, height: 3 }}
        markerStyle={{
          borderWidth: 3,
          borderColor: "#0061FF",
          width: 24,
          height: 24,
        }}
        pressedMarkerStyle={{ borderColor: "#0064FF", borderWidth: 2.5 }}
        trackStyle={{ borderWidth: 2, borderColor: "#0061FF" }}
        selectedStyle={{}}
        customMarker={(e) => (
          <View style={{ alignItems: "center" }}>
            <Text className="absolute top-8 text-[12px] font-semibold text-primary-300">
              {postfix}
              {e.currentValue}
            </Text>
            <View
              style={{
                borderWidth: 3,
                borderColor: "#0061FF",
                width: 24,
                height: 24,
                borderRadius: 12,
                backgroundColor: "white",
              }}
            />
          </View>
        )}
      />
    </View>
  );
};
