// src/lib/utils.ts - Common utility functions for composability and styling.
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn() is the core utility for composing class names.
 * It accepts an arbitrary number of arguments, joins them using clsx,
 * and then merges any conflicting Tailwind classes using twMerge.
 * Essential for applying Knoux's dynamic and conditional styling.
 * Example usage: className={cn("text-gold-400", className)}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
