import type { Metadata } from "next";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ContactPageBody } from "./ContactPageBody";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Vraag een gratis mockup aan van jouw nieuwe website. Binnen 48 uur antwoord.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <ContactPageBody />
      </Suspense>
      <Footer />
    </>
  );
}
