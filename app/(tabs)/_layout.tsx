import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

import { icons } from "@/constants/icons";

function TabIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <LinearGradient
        colors={["#00c6ff", "#0072ff"]}
        style={{
          flexDirection: "row",
          width: "100%",
          minWidth: 112,
          height: 56,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 50,
          overflow: "hidden",
          marginTop: 4,
        }}
      >
        <Image source={icon} tintColor="#151312" className="w-5 h-5" />
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      </LinearGradient>
    );
  }

  return (
    <View className="flex justify-center items-center mt-4 rounded-full">
      <Image source={icon} tintColor="#0072ff" className="w-5 h-5" />
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          position: "absolute",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 36,
          height: 52,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.2)",
          backgroundColor: "transparent", // Important to avoid solid color
        },
        tabBarBackground: () => (
          <BlurView
            tint="dark" // Can use "light", "dark", or "default"
            intensity={10} // Adjust the blur strength
            style={{
              flex: 1,
              borderRadius: 50,
              backgroundColor: "rgba(15, 13, 35, 0.6)", // Optional extra tint
            }}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />
      <Tabs.Screen
        name="save"
        options={{
          title: "Save",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Save" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
}
