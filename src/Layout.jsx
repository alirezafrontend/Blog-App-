import React from "react";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import { Toaster } from "./components/ui/sonner";
import Footer from "./components/Footer";
import NavbarSm from "./components/navbarSm";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#1b344d]">
      <Navbar />
      <NavbarSm />
      <Container className="pt-[80px]">
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            classNames: {
              toast:
                "!rounded-xl !shadow-lg !border !border-[#51B6FF] !backdrop-blur-md",
              success: "!bg-white !text-[#1b344d]",
              error: "!bg-[#244a6b] !text-white",
              cancelButton: "px-3 py-1 rounded-md",
            },
            iconTheme: {
              error: {
                primary: "#FFFFFF",
                secondary: "#FF6B6B",
              },
            },
          }}
        />
        {children}
      </Container>
      <Footer />
    </div>
  );
}
