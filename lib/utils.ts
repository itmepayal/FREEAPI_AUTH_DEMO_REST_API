import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as UAParser from "ua-parser-js";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseDevice = (uaString: string) => {
  const parser = new UAParser.UAParser();
  const result = parser.getResult();

  return {
    deviceType: result.device.type || "desktop",
    browser: result.browser.name || "Unknown",
    os: result.os.name || "Unknown",
    raw: uaString,
  };
};
