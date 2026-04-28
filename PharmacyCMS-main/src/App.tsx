import { Session, createClient } from "@supabase/supabase-js";
import HomePage from "@/components/home";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

import { Database } from "@/types/supabase";
import { OnBoarding } from "@/components/onboarding";
import Footer from "@/components/footer";
import SearchPage from "@/components/search-page";
import AskPage from "@/components/ask";

export const supabase = createClient<Database>(
    import.meta.env.VITE_SUPABASE_URL ?? "",
    import.meta.env.VITE_SUPABASE_ANON ?? ""
);

export interface ProductDetail {
    category: string | null;
    description: string | null;
    id: string;
    name: string | null;
    price: string | null;
    quantity: string | null;
    tags: string | null;
}

function App() {
    const [session, setSession] = useState<Session | null>(null);
    const [existing, setExisting] = useState(true);
    const [totalCartItems, setTotalCartItems] = useState(0);
    const [searchText, setSearchText] = useState<string | null>(null);
    const [products, setProducts] = useState<ProductDetail[] | null>(null);
    const [asking, setAsking] = useState(false);

    useEffect(() => {
        const checkExisting = async (id: string) => {
            const { data } = await supabase
                .from("customers")
                .select("*")
                .eq("user_id", id)
                .maybeSingle();

            if (!data) {
                setExisting(false);
            }
        };
        supabase.auth.getSession().then((res) => {
            setSession(res.data.session);
            if (res.data.session) checkExisting(res.data.session?.user.id);
        });

        supabase
            .from("products")
            .select("*")
            .then((res) => setProducts(res.data));
    }, []);
    return (
        <>
            <Navbar
                totalCartItems={totalCartItems}
                setTotalCartItems={setTotalCartItems}
                session={session}
                searchText={searchText}
                setSearchText={setSearchText}
                setAsking={setAsking}
            />
            {existing ? (
                !asking ? (
                    searchText && searchText.length > 0 ? (
                        <SearchPage
                            searchText={searchText}
                            totalCartItems={totalCartItems}
                            setTotalCartItems={setTotalCartItems}
                            session={session}
                            products={products}
                        />
                    ) : (
                        <HomePage
                            totalCartItems={totalCartItems}
                            setTotalCartItems={setTotalCartItems}
                            session={session}
                        />
                    )
                ) : (
                    <AskPage
                        products={products}
                        session={session}
                        setTotalCartItems={setTotalCartItems}
                        totalCartItems={totalCartItems}
                    />
                )
            ) : (
                <OnBoarding session={session} />
            )}

            <Footer
                session={session}
                totalCartItems={totalCartItems}
                setTotalCartItems={setTotalCartItems}
            />
        </>
    );
}

export default App;
