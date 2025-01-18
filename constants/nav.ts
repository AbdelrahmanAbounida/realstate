import { ScreenTabProps } from "@/types/nav";
import icons from "./icons";

export const MAIN_APP_TABS: ScreenTabProps[] = [
  {
    icon: icons.HomeIcon,
    activeIcon: icons.HomeIconActive,
    title: "Home",
    link: "index",
  },
  {
    icon: icons.ExploreIcon,
    activeIcon: icons.ExploreIconActive,
    title: "Explore",
    link: "explore",
  },
  {
    icon: icons.ProfileIcon,
    activeIcon: icons.ProfileIconActive,
    title: "Profile",
    link: "profile",
  },
];
