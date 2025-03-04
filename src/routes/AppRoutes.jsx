import React from "react";
import { Outlet, Route, Routes } from "react-router";
import Layout from "../layouts/Layout";
import Register from "../components/pages/auth/Register";
import About from "../components/pages/About";
import Login from "../components/pages/auth/Login";
import Home from "../components/pages/Home";
import Dashboard from "../components/pages/admin/Dashboard";
import Manage from "../components/pages/admin/Manage";
import HomeUser from "../components/pages/user/HomeUser";
import NotFound from "../components/pages/NotFound";
import ProtectRoutes from "./ProtectRoutes";
import AdminLayout from "../layouts/AdminLayout";
import Courses from "../components/pages/admin/Courses";
import AddNewCourse from "../components/pages/admin/AddNewCourse";
import UpdateCourse from "../components/pages/admin/UpdateCourse";
import UserLayout from "../layouts/UserLayout";
import CourseDetail from "../components/pages/user/CourseDetail";
import CartPage from "../components/pages/cart/CartPage";
import Payment from "../components/pages/auth/payment/Payment";

function AppRoutes() {
  return (
    <>
      <Routes>
        {/* Public User */}
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
        {/* Login User */}
        <Route path="user" element={<ProtectRoutes el={<UserLayout/> }  allows ={["USER","ADMIN"]}/>}>
        <Route index element={<HomeUser/>} />
        <Route path="course/:id" element={<CourseDetail/>}/>
        <Route path="cart" element={<CartPage/>}/>
        <Route path="payment" element={<Payment/>}/>
        </Route>
        {/* Admin User */}
        <Route path="admin" element={<ProtectRoutes el={<AdminLayout/>} allows ={["ADMIN"]}/>}>
          <Route index element={<Dashboard />} />
          <Route path="manage" element={<Manage />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/newcourse" element={<AddNewCourse/>} />
          <Route path="courses/update/:id" element={<UpdateCourse/>} />
        </Route>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
      {/* React Router-> Matching URL and  */}
    </>
  );
}

export default AppRoutes;
