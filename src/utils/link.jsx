import { Bookmark, CalendarCheck2, LayoutDashboard, TableOfContents, User } from "lucide-react";
import { Link } from "react-router";


export const sidebarLink =[
{label: "Admin Dashboard",Link:"/admin", icon: <LayoutDashboard/>},
{label: "User Management", Link:"/admin/manage", icon: <User/>},
{label: "Content Management", Link: "/admin/courses", icon: <TableOfContents/>},
{label: "Order Management", Link: "/admin/order", icon: <Bookmark/>},


]