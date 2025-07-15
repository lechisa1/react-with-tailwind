import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import Footer from "./Footer";
const Layout = ( ) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-500">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <main className="flex-1 bg-white p-6 overflow-y-auto"><Outlet/></main>
        
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
