import { Redirect, Slot } from "expo-router";

export default function TabLayout() {
  const isAuthenticated = false;

  if (!isAuthenticated) return <Redirect href={"/(auth)/sign-in"} />;

  return <Slot />;
}
