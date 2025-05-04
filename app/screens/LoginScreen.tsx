import React from "react";
import { useOAuth } from "@clerk/clerk-expo";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { icons } from "@/constants/icons";
import { images } from '@/constants/images';
import useWarmUpBrowser from "@/app/hooks/useWarmBrowser";

export default function LoginScreen() {
  useWarmUpBrowser();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleSignInWithGoogle = async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={images.spiderMan}
        style={{ flex: 1, width: '100%',height:"100%",  position: 'absolute', zIndex: 0 }}
        resizeMode="cover"
      />
      <View style={styles.overlay}>      
        <View style={styles.logoContainer}>
          <Image
            source={icons.logo}
            resizeMode="contain"
            style={{ width: 400, height: 200 }}
          />
        </View>

        <Text style={styles.tagline}>
          Watch your favourite movie or series on only one platform. You can
          watch it anytime and anywhere.
        </Text>



        <TouchableOpacity
          style={styles.googleButton}
          onPress={handleSignInWithGoogle}
        >
          <Image source={icons.googleIcon} style={styles.googleIcon} />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  overlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 60,
    paddingHorizontal: 20,
  },
  logoContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  tagline: {
    color: "#ccc",
    textAlign: "center",
    fontSize: 14,
    marginBottom: 30,
  },
  signInButton: {
    backgroundColor: "#0072ff",
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 12,
    marginBottom: 20,
  },
  signInText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    color: "black",
  },
  googleText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    marginRight: 30,
  },
});
