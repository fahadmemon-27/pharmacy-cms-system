import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";

import {
    TableHead,
    TableRow,
    TableHeader,
    TableCell,
    TableBody,
    Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/App";
import { toast } from "@/components/ui/use-toast";
import { getImageUrl } from "@/lib/utils";

export interface Product {
    id: string;
    name: string | null;
    price: string | null;
    quantity: string | null;
    description: string | null;
    categories: {
        name: string;
    } | null;
}

const ManangeProductCard = () => {
    const [products, setProducts] = useState<Product[] | null>(null);
    const [imgUrls, setImgUrls] = useState<string[] | null>(null);
    useEffect(() => {
        supabase
            .from("products")
            .select("id, name, price, quantity, description, categories(name)")
            .then((res) => {
                setProducts(res.data);
                res.data?.forEach((product) => {
                    let temp = imgUrls ? [...imgUrls] : [];
                    temp.push(getImageUrl(product.id));
                    setImgUrls(temp);
                });
            });
    }, []);

    

    const handleDelete = async (product_id: string) => {
        const { error } = await supabase
            .from("products")
            .delete()
            .eq("id", product_id);

        if (error) {
            return toast({ description: "Error while deleting a product!" });
        }
        window.location.reload();
    };
    return (
        <Card className="mt-6">
            <CardHeader className="pb-4">
                <CardTitle>Manage Products</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead className="max-w-[150px]">
                                Name
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Description
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Stock
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Price
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Category
                            </TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products?.map((product, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>
                                        <img
                                            alt="Product image"
                                            className="aspect-square rounded-md object-cover"
                                            height="64"
                                            src={getImageUrl(product.id)}
                                            width="64"
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {product.name}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {product.description}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {product.quantity}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        Rs.{product.price}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {product.categories?.name}
                                    </TableCell>
                                    <TableCell className="">
                                        <Button
                                            onClick={() =>
                                                handleDelete(product.id)
                                            }
                                            size="icon"
                                            variant="outline"
                                        >
                                            <TrashIcon className="w-4 h-4 text-red-300" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default ManangeProductCard;
