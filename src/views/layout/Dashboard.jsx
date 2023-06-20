import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import AppLogo from "../../components/images/AppLogo";
import Footer from "../../components/shared/Footer";
import Header from "../../components/shared/Header";
import { useSelector } from "react-redux";
import DashboardSidebar from "../../components/shared/DashboardSidebar";

export default function Dashboard() {
  const user = useSelector((state) => state?.user);

  return (
    <div className="w-full ">
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <DashboardSidebar />
        <div class="p-4 sm:ml-64">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}
