import { ProductDetail } from "@/App";
import { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { Session } from "@supabase/supabase-js";

const SearchPage = ({
    searchText,
    products,
    session,
    totalCartItems,
    setTotalCartItems,
}: {
    searchText: string | null;
    products: ProductDetail[] | null;
    session: Session | null;
    totalCartItems: number;
    setTotalCartItems: any;
}) => {
    const [matchedProducts, setMatchedProducts] = useState<
        ProductDetail[] | null
    >(null);

    useEffect(() => {
        let temp = new Array<ProductDetail>();
        products?.forEach((product) => {
            if (
                product.name
                    ?.toLowerCase()
                    .includes(searchText?.toLowerCase() ?? "")
            )
                temp.push(product);
        });
        setMatchedProducts(temp);
    }, [searchText]);
    return (
        <div>
            <h1 className="m-10 font-bold text-2xl text-green-800">
                Search Results - {matchedProducts?.length}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-44 m-10">
                {matchedProducts?.map((product, i) => {
                    if (
                        product.name
                            ?.toLowerCase()
                            .includes(searchText?.toLocaleLowerCase() ?? "")
                    ) {
                        return (
                            <ProductCard
                                totalCartItems={totalCartItems}
                                setTotalCartItems={setTotalCartItems}
                                product={product}
                                session={session}
                                key={i}
                            />
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default SearchPage;
