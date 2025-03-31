import { Book, ReceiptText, UserPen } from "lucide-react";
import { Link } from "react-router";


export const userSidebarLink =[
{label: "My Info",Link:"/user/info", icon: <UserPen/>},
{label: "My Learning", Link:"/user/learning", icon: <Book/>},
{label: "My Order", Link:"/user/order-history", icon: <ReceiptText/>},

]