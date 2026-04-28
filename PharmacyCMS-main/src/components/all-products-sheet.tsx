import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { CategoryProduct } from "@/components/cat-section";
import { Badge } from "@/components/ui/badge";
import ProductCard from "@/components/product-card";
import { Session } from "@supabase/supabase-js";

const AllProductsSidebar = ({
    children,
    products,
    categoryName,
    session,
    totalCartItems,
    setTotalCartItems,
}: {
    children: any;
    products: CategoryProduct[] | null;
    categoryName: string | null;
    session: Session | null;
    totalCartItems: number;
    setTotalCartItems: any;
}) => {
    return (
        <Sheet>
            <SheetTrigger asChild>{children}</SheetTrigger>
            <SheetContent className="overflow-auto">
                <SheetHeader className="my-4 ">
                    <SheetTitle className="text-2xl font-bold text-green-700 flex items-center">
                        All Products{" "}
                        <Badge
                            className="text-lg ml-2 bg-green-700 text-white"
                            variant="outline"
                        >
                            {categoryName}
                        </Badge>
                    </SheetTitle>
                </SheetHeader>
                <div>
                    <div>
                        {products?.map((product, i) => {
                            return (
                                <ProductCard
                                    totalCartItems={totalCartItems}
                                    setTotalCartItems={setTotalCartItems}
                                    session={session}
                                    key={i}
                                    product={product}
                                />
                            );
                        })}
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default AllProductsSidebar;
