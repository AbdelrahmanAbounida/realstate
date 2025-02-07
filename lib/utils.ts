import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const absolutePath = (path: string) => {
  return `${process.env.NEXT_PUBLIC_APP_URL}/${path}`;
};

export const normalizePath = (path: string): string => {
  // Remove /(main)/(auth) or similar prefixes
  return path.replace(/\/\(.*?\)/g, "");
};
