"use client";
import { useEffect } from "react";
import OneSignal from "react-onesignal";

export default function OneSignalInit() {
  useEffect(() => {
    OneSignal.init({
      appId: "YOUR_ONESIGNAL_APP_ID",
      allowLocalhostAsSecureOrigin: true,
    }).then(() => {
      OneSignal.Slidedown.promptPush();
    });
  }, []);

  return null;
}
