import { View, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { images } from "@/constants";
export default function SearchBar() {
  const params = useLocalSearchParams<{ query?: string }>();
  const router = useRouter();
  const [query, setQuery] = useState(params.query);
  // const debouncedSearch = useDebouncedCallback(
  //   (text: string) => router.push(`/search?query=${text}`),
  //   500
  // );
  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text) router.setParams({ query: undefined });
  };
  const handleSubmit = () => {
    if (query!.trim()) router.setParams({ query });
  };
  return (
    <View className="searchbar">
      <TextInput
        className="flex-1 p-5"
        placeholder="Search for pizzas, burgers..."
        value={query}
        onChangeText={handleSearch}
        onSubmitEditing={handleSubmit}
        placeholderTextColor={"#A0A0A0"}
        returnKeyType="search"
      />
      <TouchableOpacity
        className="pr-5 "
        onPress={() => router.setParams({ query })}
      >
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
