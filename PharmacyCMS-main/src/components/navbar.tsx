import { MedalIcon, MessageCircle, ShoppingCartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/App";

import { Session } from "@supabase/supabase-js";
import UserAccount from "@/components/user-account";
import CartSheet from "@/components/cart-sheet";
import { Input } from "@/components/ui/input";
const Navbar = ({
    session,
    totalCartItems,
    setTotalCartItems,
    searchText,
    setSearchText,
    setAsking,
}: {
    session: Session | null;
    totalCartItems: number;
    setTotalCartItems: any;
    searchText: string | null;
    setSearchText: any;
    setAsking: any;
}) => {
    const signIn = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };
    return (
        <header className="h-16 flex items-center justify-between px-4 bg-white dark:bg-gray-800">
            <a
                className="flex items-center gap-2 font-semibold text-green-500"
                href="#"
            >
                <MedalIcon className="h-6 w-6" />
                <span className="">PharmaStore</span>
            </a>
            <div className="hidden md:block">
                <Input
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText ?? ""}
                    placeholder="Search"
                />
            </div>
            <div className="flex items-center gap-4">
                <Button
                    onClick={() => setAsking(true)}
                    size="icon"
                    variant="ghost"
                >
                    <MessageCircle />
                </Button>
                <Button disabled={!session} size="icon" variant="ghost">
                    <CartSheet
                        setTotalCartItems={setTotalCartItems}
                        totalCartItems={totalCartItems}
                        session={session}
                    >
                        <ShoppingCartIcon className="h-6 w-6" />
                    </CartSheet>
                </Button>
                {session ? (
                    <UserAccount session={session} />
                ) : (
                    <Button onClick={signIn}>Login</Button>
                )}
            </div>
        </header>
    );
};

export default Navbar;
