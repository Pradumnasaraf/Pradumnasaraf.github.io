"use client";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "mailto:pradumnasaraf@gmail.com";
    });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
    </div>
  );
}