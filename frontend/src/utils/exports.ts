import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";


export const countryCodes = [
    { code: "+1", country: "US" },
    { code: "+44", country: "UK" },
    { code: "+91", country: "IN" },
    { code: "+61", country: "AU" },
];

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
