import images from "@/constants/images";
import { ImageSourcePropType } from "react-native";

export interface RecommendationItemProps {
  id: number;
  title: string;
  value: number;
  place: string;
  rate: number;
  image: ImageSourcePropType;
}
export const recommendationsItems: RecommendationItemProps[] = [
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
