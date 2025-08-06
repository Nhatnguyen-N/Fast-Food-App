import { images } from "@/constants";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, Image } from "react-native";

export default function CartButton() {
  const router = useRouter();
  const { getTotalItems } = useCartStore();
  const totalItems = getTotalItems();
  return (
    <TouchableOpacity
      className="cart-btn"
      onPress={() => router.push("/(tabs)/cart")}
    >
      <Image source={images.bag} className="size-5" resizeMode="contain" />
      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="small-bold text-white">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
