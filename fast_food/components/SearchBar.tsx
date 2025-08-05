import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { images } from "@/constants";
import { useDebouncedCallback } from "use-debounce";
export default function SearchBar() {
  const params = useLocalSearchParams<{ query?: string }>();
  const router = useRouter();
  const [query, setQuery] = useState(params.query);
  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.push(`/search?query=${text}`),
    500
  );
  const handleSearch = (text: string) => {
    setQuery(text);
    debouncedSearch(text);
  };
  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers..."
        value={query}
        onChangeText={handleSearch}
        placeholderTextColor={"#A0A0A0"}
      />
      <TouchableOpacity className="pr-5 " onPress={() => {}}>
        <Image
          source={images.search}
          className="size-6"
          resizeMode="contain"
          tintColor={"#5D5E6D"}
        />
      </TouchableOpacity>
    </View>
  );
}
