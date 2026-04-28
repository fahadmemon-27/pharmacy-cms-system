import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import ProductCard from "@/components/product-card";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "@/App";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useRazorpay, { RazorpayOptions } from "react-razorpay";
import { createOrder } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import {  ArrowRight, ShoppingCart } from "lucide-react";
export interface CartProduct {
    products: {
        id: string;
        name: string | null;
        price: string | null;
        category: string | null;
        description: string | null;
    } | null;
    from: string | null;
    quanity: string | null;
}

const CartSheet = ({
    children,
    session,
    totalCartItems,
    setTotalCartItems,
}: {
    children: any;
    session: Session | null;
    totalCartItems: number;
    setTotalCartItems: any;
}) => {
    const [products, setProducts] = useState<CartProduct[] | null>(null);
    const [totalAmount, setTotalAmount] = useState(0);
    const [Razorpay] = useRazorpay();

    const handlePayment = async (amount: number) => {
        const order = await createOrder(amount);

        const { data: customer } = await supabase
            .from("customers")
            .select("*")
            .eq("user_id", session?.user.id ?? "")
            .maybeSingle();

        const options: RazorpayOptions = {
            key: "rzp_test_9ZmmKs5tcL0Yap",
            amount: (amount * 100).toString(),
            currency: "INR",
            name: "Pharma Store",
            description: "Test Transaction",
            image: "https://th.bing.com/th/id/OIP.QKzSGd4X2IehL5j6ev-9zwHaHa?rs=1&pid=ImgDetMain",
            order_id: order.id,
            handler: async (res) => {
                if (res.razorpay_payment_id) {
                    const { error } = await supabase.from("sales").insert({
                        total_amount: totalAmount.toString(),
                        customer_id: customer?.id,
                    });

                    if (error) {
                        return toast({
                            variant: "destructive",
                            title: "Error handling your payment",
                        });
                    }
                }
            },
            prefill: {
                name: customer?.name ?? "",
                email: customer?.email ?? "",
                contact: customer?.phone ?? "",
            },
            notes: {
                address: "Razorpay Corporate Office",
            },
            theme: {
                color: "#0EAF6A",
            },
        };

        const rzpay = new Razorpay(options);

        rzpay.open();
    };

    useEffect(() => {
        supabase
            .from("cart")
            .select(
                "products!inner(id, name, price, category, description), from, quanity"
            )
            .eq("from", session?.user.id ?? "")
            .then((res) => {
                setProducts(res.data);
                let tempCount = 0;
                let tempAmount = 0;
                res.data?.forEach((item) => {
                    tempCount += Number(item.quanity);
                    tempAmount +=
                        Number(item.quanity) * Number(item.products?.price);
                });
                setTotalCartItems(tempCount);
                setTotalAmount(tempAmount);
            });
    }, [session, totalCartItems]);
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="overflow-auto">
                <SheetHeader className="my-4 ">
                    <SheetTitle className="text-2xl font-bold text-green-700 flex items-center">
                        Cart{" "}<ShoppingCart/>
                    </SheetTitle>
                    Total Items: {totalCartItems}
                </SheetHeader>
                <div>
                    <div>
                        {products?.map((product, i) => {
                            if (product.products) {
                                return (
                                    <ProductCard
                                        session={session}
                                        key={i}
                                        product={product.products}
                                        totalCartItems={totalCartItems}
                                        setTotalCartItems={setTotalCartItems}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>

                <div className="space-y-4 my-4 fixed bottom-0 left-0 m-5 bg-white p-5 rounded-lg">
                    <Separator />
                    <h1 className="text-green-600 text-2xl">
                        Total:{" "}
                        <span className="font-bold text-green-700">
                            Rs. {totalAmount}
                        </span>
                    </h1>
                    <Separator />
                    <Button
                        disabled={totalAmount === 0}
                        
                        onClick={() => {
                            handlePayment(totalAmount);
                        }}
                        className="w-full drop-shadow-md bg-green-600 hover:bg-green-300"
                    >
                        Checkout <ArrowRight className="ml-2 w-4 h-4"/>
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;
