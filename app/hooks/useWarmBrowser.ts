import * as WebBrowser from "expo-web-browser";
import { Platform } from "react-native";
import { useEffect } from "react";

export default function useWarmUpBrowser() {
  useEffect(() => {
    if (Platform.OS !== "web") {
      void WebBrowser.warmUpAsync();
    }

    return () => {
      if (Platform.OS !== "web") {
        void WebBrowser.coolDownAsync();
      }
    };
  }, []);
}
