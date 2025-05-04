import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSavedMovies } from '@/store/savedMovie';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';

const Save = () => {
  const { savedMovies, removeMovie } = useSavedMovies();

  const handleRemove = (id: string) => {
    removeMovie(id);
  };

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg2}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <View className="flex-1 px-5 pt-5">
        {/* Logo at top center */}
        <View className="w-full flex-row justify-center items-center mt-10 mb-5">
          <Image
            source={icons.logo}
            resizeMode="contain"
            className="w-[250px] h-[150px]"
          />
        </View>

        {/* Heading */}
        <Text className="text-white text-2xl text-center mb-4">Saved Movies</Text>

        {savedMovies?.length > 0 ? (
          <FlatList
            data={savedMovies}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={{ paddingBottom: 100 }}
            renderItem={({ item }) => (
              <View className="w-[48%] mb-5 relative">
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                  }}
                  className="w-full h-[250px] rounded-xl"
                  resizeMode="cover"
                />

                {/* Remove Button */}
                <TouchableOpacity
                  onPress={() => handleRemove(item.id)}
                  className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                >
                  <Text className="text-white text-xs">✖️</Text>
                </TouchableOpacity>

                {/* Movie Title */}
                <Text className="text-center text-white font-semibold mt-2" numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            )}
          />
        ) : (
          <View className="flex-1 justify-center items-center mt-10">
            <Text className="text-gray-500 text-base">No movies saved yet</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Save;
