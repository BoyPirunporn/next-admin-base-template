import { clsx, type ClassValue } from "clsx";
import { Children } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const EachElement = <T,>({
  of,
  render
}: {
  of: readonly T[];
  render: (t: T, i: number) => React.ReactNode;
}) => {
  return Children.toArray(of.map(render));
};


export const delay = async (duration:number) => await new Promise(resolve => setTimeout(resolve,duration));


