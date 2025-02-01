import { ScreenTabProps } from "@/types/nav";
import icons from "./icons";

export const MAIN_APP_TABS: ScreenTabProps[] = [
  {
    icon: icons.HomeIcon,
    activeIcon: icons.HomeIconActive,
    title: "index", // link
    link: "/",
  },
  {
    icon: icons.ExploreIcon,
    activeIcon: icons.ExploreIconActive,
    title: "explore",
    link: "/explore",
  },
  {
    icon: icons.ProfileIcon,
    activeIcon: icons.ProfileIconActive,
    title: "profile",
    link: "/profile",
  },
];
