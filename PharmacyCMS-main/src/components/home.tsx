import {
    CarouselItem,
    CarouselContent,
    CarouselPrevious,
    CarouselNext,
    Carousel,
} from "@/components/ui/carousel";

import CategorySection from "@/components/cat-section";
import { useEffect, useState } from "react";
import { supabase } from "@/App";
import { Category } from "@/components/add-product";
import { Session } from "@supabase/supabase-js";

export default function HomePage({
    session,
    totalCartItems,
    setTotalCartItems,
}: {
    session: Session | null;
    totalCartItems: number;
    setTotalCartItems: any;
}) {
    const [allCategories, setAllCategories] = useState<Category[] | null>(null);
    useEffect(() => {
        supabase
            .from("categories")
            .select("*")
            .then((res) => setAllCategories(res.data));
    }, []);
    return (
        <div key="1" className="flex flex-col min-h-screen container">
            <main className="flex-1">
                <Carousel className="w-full rounded drop-shadow-xl">
                    <CarouselContent>
                        <CarouselItem className="basis-1/3">
                            <img
                                alt="Featured Product 1"
                                className="object-cover w-full h-full"
                                height={400}
                                src="
                                https://www.shutterstock.com/image-vector/ad-banner-natural-beauty-products-600nw-1780339220.jpg"
                                style={{
                                    aspectRatio: "1200/400",
                                    objectFit: "cover",
                                }}
                                width={1200}
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <img
                                alt="Featured Product 2"
                                className="object-cover w-full h-full"
                                height={400}
                                src="https://m.media-amazon.com/images/S/aplus-media/sota/c26b8777-5588-449f-9b35-9bab7a044ffd.png"
                                style={{
                                    aspectRatio: "1200/400",
                                    objectFit: "cover",
                                }}
                                width={1200}
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <img
                                alt="Featured Product 3"
                                className="object-cover w-full h-full"
                                height={400}
                                src="https://ik.imagekit.io/wlfr/wellness/images/banner/Health+%26+Fitness+Fest-2024_Web+Banner.jpg"
                                style={{
                                    aspectRatio: "1200/400",
                                    objectFit: "cover",
                                }}
                                width={1200}
                            />
                        </CarouselItem>
                        <CarouselItem className="basis-1/3">
                            <img
                                alt="Featured Product 3"
                                className="object-cover w-full h-full"
                                height={400}
                                src="https://ik.imagekit.io/wlfr/wellness/images/banner/TGOW+Digital+Banner_Web+Banners_630px+x+276px.jpg"
                                style={{
                                    aspectRatio: "1200/400",
                                    objectFit: "cover",
                                }}
                                width={1200}
                            />
                        </CarouselItem>

                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>

                {allCategories?.map((category, i) => {
                    return (
                        <CategorySection
                            totalCartItems={totalCartItems}
                            setTotalCartItems={setTotalCartItems}
                            session={session}
                            key={i}
                            name={category.name}
                            id={category.id}
                        />
                    );
                })}
            </main>
        </div>
    );
}

export function MedalIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
            <path d="M11 12 5.12 2.2" />
            <path d="m13 12 5.88-9.8" />
            <path d="M8 7h8" />
            <circle cx="12" cy="17" r="5" />
            <path d="M12 18v-2h-.5" />
        </svg>
    );
}

export function ShoppingCartIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    );
}

export function UserIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}
