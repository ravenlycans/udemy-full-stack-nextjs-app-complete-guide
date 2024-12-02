"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ReactNode, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {usePresenceChannel} from "@/hooks/usePresenceChannel";

export default function Providers({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /*
   * Dark-Mode client detection code, this runs only on the client,
   * due to it being in an useEffect hook.
   * Also supports SSR.
   */
  useEffect(() => {
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", (mql) => {
      setIsDarkMode(mql.matches);
    });
  }, []);

  usePresenceChannel();

  return (
    <NextUIProvider className={isDarkMode ? "dark" : ""}>
      <ToastContainer
        position="bottom-right"
        hideProgressBar
        className="z-50"
      />
      {children}
    </NextUIProvider>
  );
}
