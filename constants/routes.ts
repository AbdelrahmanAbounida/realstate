import { Href } from "expo-router";

export const PUBLIC_ROUTES: Href[] = ["/home"];

export const Auth_ROUTES: Href[] = ["/login", "/register"];

// default path to which u have to redirect when user not logged in
export const DEFAULT_REDIRECT_TO_LOGIN_ROUTE: Href = "/home";
export const DEFAULT_REDIRECT_TO_HOME_ROUTE: Href = "/";
