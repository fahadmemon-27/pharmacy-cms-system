import { useEffect, useState } from "react";

import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "./ui/table";
import { supabase } from "@/App";

export interface OrderDetail {
    created_at: string;
    customer_id: string | null;
    id: string;
    total_amount: string | null;
    customers: {
        address: string | null;
        created_at: string;
        email: string | null;
        id: string;
        name: string | null;
        phone: string | null;
        user_id: string | null;
    } | null;
}

const OrderPage = () => {
    const [orders, setOrders] = useState<OrderDetail[] | null>(null);
    useEffect(() => {
        supabase
            .from("sales")
            .select("*, customers(*)")
            .then((res) => setOrders(res.data));
    }, []);

    return (
        <Card className="mt-6">
            <CardHeader className="pb-4">
                <CardTitle>All Orders</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="max-w-[150px]">
                                Customer Name
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Phone
                            </TableHead>
                            <TableHead className="hidden md:table-cell">
                                Address
                            </TableHead>
                            <TableHead>Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders?.map((order, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">
                                        {order.customers?.name}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {order.customers?.phone}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {order.customers?.address}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {order.total_amount}
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default OrderPage;
