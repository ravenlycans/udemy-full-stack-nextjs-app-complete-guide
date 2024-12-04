"use client";

import { NextUIProvider } from "@nextui-org/react";
import {ReactNode, useCallback, useEffect, useRef, useState} from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {usePresenceChannel} from "@/hooks/usePresenceChannel";
import {useNotificationChannel} from "@/hooks/useNotificationChannel";
import {useShallow} from "zustand/react/shallow";
import useMessageStore from "@/hooks/useMessageStore";
import {getUnreadMessageCount} from "@/app/actions/messageActions";

export default function Providers({ children, userId }: { children: ReactNode, userId: string | null }) {
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
  const isUnreadCountSet = useRef(false);

  const {updateUnreadCount} = useMessageStore(useShallow(state => ({
    updateUnreadCount: state.updateUnreadCount,
  })));

  const setUnreadCount = useCallback((amount: number) => {
    updateUnreadCount(amount);
  }, [updateUnreadCount]);

  useEffect(() => {
    if (!isUnreadCountSet.current && userId) {
      getUnreadMessageCount().then(count => {
        setUnreadCount(count);
      })
      isUnreadCountSet.current = true;
    }
  }, [setUnreadCount, userId]);

  usePresenceChannel();
  useNotificationChannel(userId);

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
