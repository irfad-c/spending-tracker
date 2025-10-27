import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function ProtectedLayout() {
  return (
    <>
      <Navbar />
      <Outlet />{" "}
      {/* 
      <Outlet /> is a placeholder where the protected child pages will display.
      for example for "/settings" <Outlet/> become <Settings/> */}
    </>
  );
}
