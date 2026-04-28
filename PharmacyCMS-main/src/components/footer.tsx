import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import CartSheet from "@/components/cart-sheet";

import { Session } from "@supabase/supabase-js";


const Footer = ({session,totalCartItems,setTotalCartItems}:{session:Session | null, totalCartItems:number, setTotalCartItems:any}) => {
    
    return (
        
            <div className="bg-gray-100 dark:bg-gray-800">
      <footer className="container mx-auto py-12 px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick link</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:underline" href="/">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline" href="/admin">
                  Admin
                </a>
              </li>
              <li>
                <CartSheet session={session} totalCartItems={totalCartItems} setTotalCartItems={setTotalCartItems}>
                <a className="hover:underline" href="#">
                  Cart
                </a>
                </CartSheet>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#">
                <FacebookIcon className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#">
                <TwitterIcon className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="http://instagram.com/fahadmemon_27">
                <InstagramIcon className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-sm">
              shop no 5 Pharmacy Lane,
              <br />
              Mira Road, Mumbai-401107
              <br />
              Phone: +91 93249 52934
            </p>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-sm text-gray-500 dark:text-gray-400">
          © 2024 Your Pharmacy. All rights reserved.
        </div>
      </footer>
    </div>
        
    );
};

export default Footer;
