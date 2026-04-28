import { MedalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { supabase } from "@/App";

import { Session } from "@supabase/supabase-js";
import UserAccount from "@/components/user-account";

const AdminNavbar = ({ session }: { session: Session | null }) => {
    const signIn = () => {
        supabase.auth.signInWithOAuth({
            provider: "google",
        });
    };
    return (
        <header className="h-16 flex items-center justify-between px-4 bg-white dark:bg-gray-800">
            <a
                className="flex items-center gap-2 font-semibold text-green-500"
                href="/"
            >
                <MedalIcon className="h-6 w-6" />
                <span className="">PharmaStore</span>
            </a>
            
            <div className="flex items-center gap-4">
                {session ? (
                    <UserAccount session={session} />
                ) : (
                    <Button onClick={signIn}>Login</Button>
                )}
            </div>
        </header>
    );
};

export default AdminNavbar;
