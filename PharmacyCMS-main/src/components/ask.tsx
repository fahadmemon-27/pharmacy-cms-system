import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProductDetail } from "@/App";
import axios from "axios";
import ProductCard from "@/components/product-card";
import { Session } from "@supabase/supabase-js";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const tags = [
    "headache",
    "backpain",
    "cough",
    "cold",
    "constipation",
    "upset stomach",
    "fever",
    "sore throat",
    "diarrhea",
    "fatigue",
    "nausea",
    "muscle aches",
    "runny nose",
    "shortness of breath",
    "dizziness",
    "loss of appetite",
    "vomiting",
    "chest pain",
    "joint pain",
    "abdominal pain",

    "itchy skin",
    "rash",
    "dry mouth",
    "blurred vision",
    "sweating",
    "difficulty swallowing",
    "weight loss",
    "swollen glands",
    "hair loss",
    "fainting",
    "difficulty sleeping",
    "numbness",
    "tingling sensation",
    "swollen joints",
    "irregular heartbeat",
    "memory loss",
    "confusion",
    "difficulty concentrating",
    "hoarseness",
    "stomach cramps",
    "bloody stool",
    "excessive thirst",
    "frequent urination",
    "irritability",
    "depression",
    "anxiety",
    "panic attacks",
    "mood swings",
];
const AskPage = ({
    products,
    session,
    totalCartItems,
    setTotalCartItems,
}: {
    products: ProductDetail[] | null;
    totalCartItems: number;
    session: Session | null;
    setTotalCartItems: any;
}) => {
    const [question, setQuestion] = useState("");
    const [result, setResult] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const handleQuestion = async () => {
        setLoading(true);

        const res = await axios.get(
            `http://127.0.0.1:8000/api/ask`,

            {
                params: {
                    question: question,
                    tags: tags.join(),
                },
            }
        );

        setResult(JSON.parse(res.data).answer);
        setLoading(false);
    };

    const checker = (product: ProductDetail, result: string[] | null) => {
        const productTags = product.tags?.split(",");
        console.log(productTags);
        console.log(result);

        if (result) {
            for (let i = 0; i < result?.length; i++) {
                if (productTags?.includes(result[i])) {
                    return true;
                }
            }
        }
        return false;
    };
    return (
        <div>
            <div className="bg-gradient-to-b from-green-500 p-[5rem] mb-52">
                <div className="flex w-full justify-center">
                    <h1 className="text-white font-bold text-4xl my-4 mb-7">
                        Get product recommendations using AI.
                    </h1>
                </div>

                <div className="flex w-full justify-center items-center">
                    <div className="flex ">
                        <Input
                            className="w-[65vw]"
                            placeholder="I am getting constant headaches..."
                            onChange={(e) => setQuestion(e.target.value)}
                        />
                        <Button
                            className="mx-4 bg-green-700"
                            onClick={handleQuestion}
                        >
                            Ask
                        </Button>
                    </div>
                </div>
            </div>
            {!loading ? (
                <div className=" grid md:grid-cols-4 grid-cols-2  gap-5 container">
                    {products?.map((product, i) => {
                        if (checker(product, result?.split(",") ?? null)) {
                            return (
                                <ProductCard
                                    key={i}
                                    product={product}
                                    session={session}
                                    totalCartItems={totalCartItems}
                                    setTotalCartItems={setTotalCartItems}
                                />
                            );
                        }
                    })}
                </div>
            ) : (
                <div className="container grid md:grid-cols-4 grid-cols-2  gap-5 containers">
                    <Card>
                        <Skeleton className="aspect-square object-cover w-[300px] h-200 w-200" />
                        <CardContent>
                            <Skeleton className="my-5 w-200 h-5" />
                            <Skeleton className="my-3 w-200 h-3" />
                            <Skeleton className="my-3 w-200 h-3" />
                        </CardContent>
                    </Card>

                    <Card>
                        <Skeleton className="aspect-square object-cover w-[300px] h-200 w-200" />
                        <CardContent>
                            <Skeleton className="my-5 w-200 h-5" />
                            <Skeleton className="my-3 w-200 h-3" />
                            <Skeleton className="my-3 w-200 h-3" />
                        </CardContent>
                    </Card>
                    <Card>
                        <Skeleton className="aspect-square object-cover w-[300px] h-200 w-200" />
                        <CardContent>
                            <Skeleton className="my-5 w-200 h-5" />
                            <Skeleton className="my-3 w-200 h-3" />
                            <Skeleton className="my-3 w-200 h-3" />
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default AskPage;
