import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function middleEllipsis(s: string, n = 10): string {
  if (s.length < n) return s;
  const start = s.slice(0, n / 2);
  const end = s.slice(-(n / 2));
  return start + "..." + end;
}

export const base64ToBlob = (base64: string, contentType?: string) => {
  const buffer = Buffer.from(base64, "base64");
  const blob = new Blob([buffer], { type: contentType });
  return blob;
};
export const base64ToFile = (
  base64: string,
  filename: string,
  contentType?: string
) => {
  const blob = base64ToBlob(base64, contentType);
  return new File([blob], filename, { type: contentType });
};
