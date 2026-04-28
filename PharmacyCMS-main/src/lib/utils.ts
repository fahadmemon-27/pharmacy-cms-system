import { supabase } from "@/App";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getImageUrl = (product_id: string) => {
    const { data } = supabase.storage.from("products").getPublicUrl(product_id);
    return data.publicUrl;
};

export const createOrder = async (amount: number) => {
    const url =
        import.meta.env.VITE_STATUS === "DEV"
            ? "http://127.0.0.1:8000"
            : "https://pharmacy-cms.vercel.app";
    const order = await axios.get(`${url}/api/createOrder?amount=${amount}`);
    return order.data;
};
