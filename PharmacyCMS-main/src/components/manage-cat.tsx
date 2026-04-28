import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    SelectValue,
    SelectTrigger,
    SelectItem,
    SelectContent,
    Select,
} from "@/components/ui/select";
import { supabase } from "@/App";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Category } from "@/components/add-product";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2Icon } from "lucide-react";

const ManageCategoryCard = ({
    categories,
}: {
    categories: Category[] | null;
}) => {
    const [name, setName] = useState("");
    const [choice, setChoice] = useState("");
    const [newName, setNewName] = useState("");

    useEffect(() => {
        setNewName(categories ? categories[Number(choice)].name : "Name");
    }, [categories, choice]);

    const handleAdd = async () => {
        if (name && name.length > 0) {
            const { error } = await supabase.from("categories").insert({
                name: name,
            });

            if (error) {
                return toast({
                    description: "Error while creating this category!",
                });
            }

            window.location.reload();
        } else {
            return toast({
                description: "Enter a valid category name!",
            });
        }
    };

    const handleEdit = async () => {
        if (categories && categories.length > 0) {
            const cat = categories[Number(choice)];
            const { error } = await supabase
                .from("categories")
                .update({
                    name: newName,
                })
                .eq("id", cat.id);

            if (error) {
                return toast({
                    variant: "destructive",
                    description: "Error occured while updating this category!",
                });
            }
            window.location.reload();
        } else {
            return toast({
                description: "Invalid category chosen!",
            });
        }
    };

    return (
        <Card className="flex items-center">
            <div className="w-full">
            <CardHeader className="pb-4">
                <CardTitle>Manage Categories</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 my-2">
                    <div className="grid gap-2">
                        <Label htmlFor="category-name">
                            Create new category
                        </Label>
                        <Input
                            onChange={(e) => setName(e.target.value)}
                            id="category-name"
                            placeholder="Category name"
                        />
                    </div>
                    <Button className="w-full" onClick={handleAdd}>
                        Add
                    </Button>
                    <div className="flex items-center space-x-2">
                        <div className="grid gap-2 w-[75%]">
                            <Label htmlFor="category-list">
                                Update
                            </Label>
                            <Select onValueChange={(value) => setChoice(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories?.map((category, i) => {
                                        return (
                                            <SelectItem
                                                key={i}
                                                value={i.toString()}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectContent>
                            </Select>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    disabled={!(choice.length > 0)}
                                    className="mt-5  text-green-700"
                                >
                                    <Edit2Icon className="w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Rename</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {categories && (
                                    <Input
                                        value={newName}
                                        onChange={(e) =>
                                            setNewName(e.target.value)
                                        }
                                    />
                                )}
                                <Button
                                    onClick={handleEdit}
                                    variant={"secondary"}
                                    className="mt-4 w-full bg-green-300"
                                >
                                    Confirm
                                </Button>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </CardContent>
            </div>
        </Card>
    );
};

export default ManageCategoryCard;
