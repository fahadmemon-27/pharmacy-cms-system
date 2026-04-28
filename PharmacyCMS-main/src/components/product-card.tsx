import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CategoryProduct } from "@/components/cat-section";
import { getImageUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { supabase } from "@/App";
import { Session } from "@supabase/supabase-js";
import { v4 as uuid } from "uuid";
import { toast } from "@/components/ui/use-toast";

const ProductCard = ({
    product,
    session,
    totalCartItems,
    setTotalCartItems,
}: {
    product: CategoryProduct;
    session: Session | null;
    totalCartItems: number;
    setTotalCartItems: any;
}) => {
    const [inCart, setInCart] = useState(false);
    const [cartId, setCartId] = useState("");
    const [count, setCount] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        supabase
            .from("cart")
            .select("*")
            .eq("product_id", product.id)
            .eq("from", session?.user.id ?? "")
            .maybeSingle()
            .then((res) => {
                const record = res.data;

                if (record) {
                    setInCart(true);
                    setCount(Number(record.quanity));
                    setCartId(record.id);
                } else {
                    setCount(0);
                    setInCart(false);
                }
            });
    }, [inCart, totalCartItems]);

    const addToCart = async () => {
        setLoading(true);
        const id = inCart ? cartId : uuid();
        const { error } = await supabase.from("cart").upsert({
            id: id,
            from: session?.user.id ?? "",
            product_id: product.id,
            quanity: count ? (count + 1).toString() : "1",
        });

        if (error) {
            return toast({
                variant: "destructive",
                description: "Error occured while adding that to the cart!",
            });
        }

        setCount(count ? count + 1 : 1);
        setInCart(true);
        setTotalCartItems(totalCartItems + 1);
        setLoading(false);
    };

    const removeFromCart = async () => {
        setLoading(true);
        if (count && count > 1) {
            const { error } = await supabase.from("cart").upsert({
                id: cartId,
                from: session?.user.id ?? "",
                product_id: product.id,
                quanity: (count - 1).toString(),
            });

            if (error) {
                return toast({
                    variant: "destructive",
                    description:
                        "Error occured while removing that from the cart!",
                });
            }
            setCount(count - 1);
        } else {
            const { error } = await supabase
                .from("cart")
                .delete()
                .eq("id", cartId);

            if (error) {
                return toast({
                    variant: "destructive",
                    description:
                        "Error occured while removing that from the cart!",
                });
            }
            setCount(null);
            setInCart(false);
        }
        setTotalCartItems(totalCartItems - 1);
        setLoading(false);
    };
    return (
        <Card className=" drop-shadow-lg">
            <img
                alt="Product Image"
                className="aspect-square object-cover w-[300px]"
                height={200}
                
                src={getImageUrl(product.id)}
                width={200}
            />
            <CardContent className="p-4">
                <h3 className="text-lg font-semibold text-green-700">
                    {product.name}
                </h3>
                <p className="text-sm text-green-500">{product.description}</p>
                <h4 className="mt-2 font-semibold text-lg text-green-700">
                    Rs. {product.price}
                </h4>
                {!inCart ? (
                    <Button
                        disabled={!session}
                        className="mt-4"
                        onClick={addToCart}
                    >
                        Add to Cart
                    </Button>
                ) : (
                    <div className="flex items-center">
                        <Button
                            disabled={loading}
                            variant={"outline"}
                            className="mt-4 w-5"
                            onClick={removeFromCart}
                        >
                            -
                        </Button>
                        <h1 className="text-lg mx-4">{count}</h1>
                        <Button
                            disabled={loading}
                            variant={"outline"}
                            className="mt-4 w-5"
                            onClick={addToCart}
                        >
                            +
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ProductCard;
