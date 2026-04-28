import { useEffect, useState } from "react";

import { Session } from "@supabase/supabase-js";
import { supabase } from "@/App";

import AddProductCard, { Category } from "@/components/add-product";
import ManangeProductCard from "@/components/manage-product";
import ManageCategoryCard from "@/components/manage-cat";
import AdminNavbar from "@/components/admin-nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderPage from "./orders";

export default function AdminPage() {
    const [session, setSession] = useState<Session | null>(null);
    const [allCats, setAllCats] = useState<Category[] | null>(null);
    useEffect(() => {
        supabase.auth.getSession().then((res) => setSession(res.data.session));
        supabase
            .from("categories")
            .select("*")
            .then((res) => setAllCats(res.data));
    }, []);

    return (
        <>
            <AdminNavbar session={session} />

            <Tabs defaultValue="dashboard" className="">
                <TabsList className="w-full bg-green-200 bg-opacity-40">
                    <TabsTrigger className="" value="dashboard">
                        Dashboard
                    </TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>
                <TabsContent value="dashboard">
                    <div className="flex flex-col h-screen">
                        <main className="flex-1 overflow-auto p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <AddProductCard categories={allCats} />
                                <ManageCategoryCard categories={allCats} />
                            </div>
                            <ManangeProductCard />
                        </main>
                    </div>
                </TabsContent>
                <TabsContent value="orders">
                    <OrderPage />
                </TabsContent>
            </Tabs>
        </>
    );
}
