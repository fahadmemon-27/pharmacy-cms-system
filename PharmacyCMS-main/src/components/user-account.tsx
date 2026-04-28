import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/App";


const UserAccount = ({ session }: { session: Session }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                    <img
                        className="w-6 h-6 rounded-lg"
                        src={session?.user.user_metadata.avatar_url}
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2">
                <a href="/admin">
                    <Button
                        className="w-full my-2 bg-green-300"
                        variant={"secondary"}
                    >
                        Admin Dashboard
                    </Button>
                </a>
                <Button
                    onClick={async () => {
                        await supabase.auth.signOut();
                        window.location.reload();
                    }}
                    className="w-full text-red-400"
                    variant={"outline"}
                >
                    Logout
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UserAccount;
