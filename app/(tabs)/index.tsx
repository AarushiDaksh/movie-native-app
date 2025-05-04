import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import useFetch from '@/services/usefetch';
import { fetchMovies } from '@/services/api';
import { getTrendingMovies } from '@/services/appwrite';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';
import SearchBar from '@/components/SearchBar';
import MovieCard from '@/components/MovieCard';
import TrendingCard from '@/components/TrendingCard';

const { width } = Dimensions.get('window');

const Index = () => {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: '' }));

  return (
    <View style={styles.container}>
      <Image source={images.bg2} style={styles.backgroundImage} resizeMode="cover" />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.logoContainer}>
          <Image source={icons.logo} resizeMode="contain" style={styles.logo} />
        </View>

        {(moviesLoading || trendingLoading) ? (
          <ActivityIndicator color="#0000ff" style={styles.loader} />
        ) : (moviesError || trendingError) ? (
          <Text>Error: {moviesError?.message || trendingError?.message}</Text>
        ) : (
          <View>
            <SearchBar
              onPress={() => router.push('/search')}
              placeholder="Search for a movie"
            />

            {Array.isArray(trendingMovies) && trendingMovies.length > 0 && (
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Trending Movies</Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={
                    [...new Map(trendingMovies.map((item) => [item.movie_id, item])).values()].slice(1, 6)
                  }
                  contentContainerStyle={{ gap: 26 }}
                  renderItem={({ item, index }) => <TrendingCard movie={item} index={index} />}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
                />
              </View>
            )}

            <Text style={styles.sectionTitle}>Latest Movies</Text>
            <FlatList
              data={movies || []}
              renderItem={({ item }) => <MovieCard {...item} />}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}
              columnWrapperStyle={styles.movieRow}
              style={{ paddingBottom: 32 }}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f0f' },
  backgroundImage: { position: 'absolute', width: '100%', height: '100%', zIndex: 0 },
  scrollContainer: { flex: 1 },
  scrollContent: { minHeight: '100%', paddingHorizontal: 20, paddingBottom: 10 },
  logoContainer: { width: '100%', alignItems: 'center', marginTop: 40, marginBottom: 20 },
  logo: { width: width * 0.6, height: 120 },
  loader: { marginTop: 40, alignSelf: 'center' },
  sectionContainer: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 12 },
  movieRow: { justifyContent: 'flex-start', gap: 20, marginBottom: 10 },
});

export default Index;
