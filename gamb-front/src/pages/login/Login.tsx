import React from "react";
import { LoginCard } from "../../componentes/GambLogin/LoginCard";
import { Header } from "../../componentes/GambHeader/Header";
import { Footer } from "../../componentes/GambFooter/Footer";
import { IndexContainer } from "../index/indexstyles";

export function Login() {
  return (
    <div>
        <Header />
        <IndexContainer>
            <LoginCard />
        </IndexContainer>
        <Footer />
    </div>
  );
}