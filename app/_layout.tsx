import React, { useEffect, useState } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SavedMoviesProvider } from "@/store/savedMovie";
import LoginScreen from "@/app/screens/LoginScreen";
import { tokenCache } from "@/utils/cache";
import * as SecureStore from "expo-secure-store";
import "./global.css";

const clerkPublishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

function ProtectedRoutes() {
  const { isSignedIn, isLoaded, signOut } = useAuth();
  const [sessionChecked, setSessionChecked] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await SecureStore.getItemAsync("__session");
        if (!session) {
          await signOut(); 
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
      setSessionChecked(true);
    };

    checkSession();
  }, []);

  if (!isLoaded || !sessionChecked) return null;

  if (!isSignedIn) return <LoginScreen />;

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="movie/[id]" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey} tokenCache={tokenCache}>
      <SavedMoviesProvider>
        <StatusBar hidden />
        <ProtectedRoutes />
      </SavedMoviesProvider>
    </ClerkProvider>
  );
}
