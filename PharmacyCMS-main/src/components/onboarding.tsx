import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { supabase } from "@/App";
import { Session } from "@supabase/supabase-js";
import { toast } from "@/components/ui/use-toast";

export const OnBoarding = ({ session }: { session: Session | null }) => {
    const [name, setName] = useState<string | null>(null);

    const [phone, setPhone] = useState<string | null>(null);
    const [add, setAdd] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (
            name &&
            name.length > 0 &&
            phone &&
            phone.length > 0 &&
            add &&
            add.length > 0
        ) {
            const { error } = await supabase.from("customers").insert({
                name: name,
                phone: phone,
                email: session?.user.email ?? "",
                address: add,
                user_id: session?.user.id ?? "",
            });

            if (error) {
                return toast({
                    title: "Error occured!",
                });
            }
            window.location.reload();
        }
        return toast({
            title: "Check your input fields!",
        });
    };
    return (
        <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-800">
            <header className="py-10 px-6 bg-white dark:bg-gray-900">
                <h1 className="text-4xl font-bold text-center text-gray-800 dark:text-gray-100">
                    Welcome!
                </h1>
            </header>
            <main className="flex-1 bg-[#f8fafc] dark:bg-[#1f2937] bg-opacity-30 dark:bg-opacity-30">
                <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 space-y-4">
                    <div>
                        <Label className="sr-only" htmlFor="full-name">
                            Full Name
                        </Label>
                        <Input
                            className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            id="full-name"
                            placeholder="Full Name"
                            required
                            type="text"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="sr-only" htmlFor="phone-number">
                            Phone Number
                        </Label>
                        <Input
                            className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            id="phone-number"
                            placeholder="Phone Number"
                            required
                            type="number"
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label className="sr-only" htmlFor="address">
                            Address
                        </Label>
                        <Input
                            className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                            id="address"
                            placeholder="Address"
                            required
                            type="text"
                            onChange={(e) => setAdd(e.target.value)}
                        />
                    </div>
                    <div>
                        <Button
                            onClick={handleSubmit}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-700 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
};
