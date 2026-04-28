import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuid } from "uuid";
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

import { supabase } from "@/App";
import { Loader } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { tags } from "./ask";

export interface Category {
    id: string;
    name: string;
}
const AddProductCard = ({ categories }: { categories: Category[] | null }) => {
    const [name, setName] = useState<string | null>(null);
    const [des, setDes] = useState<string | null>(null);
    const [price, setPrice] = useState<string | null>(null);
    const [cat, setCat] = useState<string | null>(null);
    const [img, setImg] = useState<File | null>(null);
    const [qty, setQty] = useState<string>("50");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string[] | null>(null);
    
    const handleFile = (filelist: FileList | null) => {
        if (filelist) {
            const file = filelist[0];
            if (
                file.name.endsWith(".png") ||
                file.name.endsWith(".jpg") ||
                file.name.endsWith(".jpeg")
            ) {
                return setImg(file);
            }

            return toast({ title: "Invalid file format!" });
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        const product_id = uuid();
        if (
            name &&
            name.length > 0 &&
            des &&
            des.length > 0 &&
            price &&
            price.length > 0 &&
            cat &&
            img 
        ) {
            const { error: dataerr } = await supabase.from("products").insert({
                id: product_id,
                category: cat,
                name: name,
                description: des,
                price: price,
                quantity: qty,
                tags: data?.join(),
            });

            const { error: imgerr } = await supabase.storage
                .from("products")
                .upload(product_id, img);

            if (dataerr || imgerr) {
                setLoading(false);
                return toast({
                    description: "Error occured while processing your request!",
                });
            }
            window.location.reload();
        } else {
            setLoading(false);

            toast({ title: "Check your inputs!" });
        }
    };

    return (
        <Card>
            <CardHeader className="pb-4">
                <CardTitle>Add Product</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="product-name">Product Name</Label>
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            id="product-name"
                            placeholder="Enter product name"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="product-description">Description</Label>
                        <Textarea
                            onChange={(e) => setDes(e.target.value)}
                            className="min-h-[100px]"
                            id="product-description"
                            placeholder="Enter product description"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="product-tags">Tags</Label>
                        {data?.map((tag, i) => {
                            return (
                                <p
                                    onClick={() => {
                                        let temp = [...data];
                                        temp.splice(i, 1);
                                        setData(temp);
                                    }}
                                    className="underline text-green-500 hover:text-red-500 hover:cursor-pointer"
                                >
                                    {tag}
                                </p>
                            );
                        })}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className="rounded-full"
                                    size={"icon"}
                                    variant={"ghost"}
                                >
                                    +
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="overflow-auto h-[250px]">
                                <DropdownMenuLabel>
                                    Choose a tag to add
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {tags?.map((tag) => {
                                    return (
                                        <DropdownMenuItem>
                                            <Button
                                                onClick={() => {
                                                    let temp = data
                                                        ? [...data]
                                                        : [];
                                                    temp.push(tag);
                                                    console.log(temp);

                                                    setData(temp);
                                                }}
                                                variant={"secondary"}
                                            >
                                                {tag}
                                            </Button>
                                        </DropdownMenuItem>
                                    );
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="product-price">Price</Label>
                        <Input
                            onChange={(e) => setPrice(e.target.value)}
                            id="product-price"
                            placeholder="Enter product price"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="product-price">Stock Qty</Label>
                        <Input
                            onChange={(e) => setQty(e.target.value)}
                            id="product-price"
                            placeholder="Enter product quantity"
                            type="number"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="product-category">Category</Label>
                        <Select onValueChange={(value) => setCat(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories?.map((category, i) => {
                                    return (
                                        <SelectItem key={i} value={category.id}>
                                            {category.name}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="product-image">Image</Label>
                        <Input
                            onChange={(e) => handleFile(e.target.files)}
                            id="product-image"
                            type="file"
                        />
                    </div>
                    <Button
                        onClick={handleSubmit}
                        className="w-full"
                        type="submit"
                        disabled={loading}
                    >
                        {!loading ? (
                            "Add Product"
                        ) : (
                            <Loader className="animate-spin" />
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default AddProductCard;
