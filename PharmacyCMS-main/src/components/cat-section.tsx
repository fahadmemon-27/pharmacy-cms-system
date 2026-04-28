import { useEffect, useState } from "react";
import { supabase } from "@/App";
import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import AllProductsSidebar from "@/components/all-products-sheet";
import { Session } from "@supabase/supabase-js";

export interface CategoryProduct {
    id: string;
    name: string | null;
    price: string | null;
    category: string | null;
    description: string | null;
}

const CategorySection = ({
    name,
    id,
    session,
    totalCartItems,
    setTotalCartItems
}: {
    name: string;
    id: string;
    totalCartItems: number;
    session: Session | null;
    setTotalCartItems:any
}) => {
    const [products, setProducts] = useState<CategoryProduct[] | null>(null);

    useEffect(() => {
        supabase
            .from("products")
            .select("*")
            .eq("category", id)
            .then((res) => setProducts(res.data));
    }, []);
    return (
        <section className="px-4 py-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-green-700">{name}</h2>
                <AllProductsSidebar
                    session={session}
                    products={products}
                    categoryName={name}
                    totalCartItems={totalCartItems}
                    setTotalCartItems={setTotalCartItems}
                >
                    <Button
                        variant={"link"}
                        className="text-sm font-medium text-green-500"
                    >
                        View All
                    </Button>
                </AllProductsSidebar>
            </div>

            <div className="flex gap-4 overflow-x-auto mt-4">
                {products?.map((product, i) => {
                    if (i < 4) {
                        return (
                            <ProductCard
                                totalCartItems={totalCartItems}
                                setTotalCartItems={setTotalCartItems}
                                session={session}
                                product={product}
                                key={i}
                            />
                        );
                    }
                })}
            </div>
        </section>
    );
};

export default CategorySection;
