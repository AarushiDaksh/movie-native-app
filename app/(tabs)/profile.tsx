import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { fetchGitHubUserData, fetchGitHubRepos } from '@/components/github';
import { GitHubUser, GitHubRepo } from '@/types';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images'; 

const { width } = Dimensions.get('window');

const Profile = () => {
  const router = useRouter();
  const [username, setUsername] = useState('AarushiDaksh');
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    try {
      setError('');
      const user = await fetchGitHubUserData(username);
      const repoList = await fetchGitHubRepos(username);
      setProfile(user);
      setRepos(repoList);
    } catch (e) {
      setProfile(null);
      setRepos([]);
      setError('User not found');
      console.error(e);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  return (
     <View className="flex-1 bg-primary ">
      <Image
        source={images.spider}
        style={{ flex: 1, width: '100%',height:"100%",  position: 'absolute', zIndex: 0 }}
        resizeMode="cover"
      />

   
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.logoContainer}>
            <Image source={icons.logo} resizeMode="contain" style={styles.logo} />
          </View>

          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Enter GitHub username"
            placeholderTextColor="#888"
            style={styles.input}
          />

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : profile ? (
            <>
              <View style={styles.profileContainer}>
                <Image source={{ uri: profile.avatar_url }} style={styles.avatar} />
                <Text style={styles.name}>{profile.name || profile.login}</Text>
                <Text style={styles.subtext}>{profile.email || 'No public email'}</Text>

                <View style={styles.statsRow}>
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>{repos.length}</Text>
                    <Text style={styles.subtext}>Movies</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>{profile.followers}</Text>
                    <Text style={styles.subtext}>Followers</Text>
                  </View>
                  <View style={styles.statBox}>
                    <Text style={styles.statValue}>{profile.following}</Text>
                    <Text style={styles.subtext}>Following</Text>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>My Movies</Text>
                {[
                  ['Want to watch', repos.length],
                  ['Ratings and reviews', 12],
                  ['Expected', 8],
                  ['Favorite films', 5],
                  ['Recommended', 7],
                ].map(([label, count], i) => (
                  <View key={i} style={styles.row}>
                    <Text style={styles.rowText}>{label}</Text>
                    <Text style={styles.subtext}>{count}</Text>
                  </View>
                ))}
              </View>
            </>
          ) : (
            <Text style={styles.loadingText}>Loading...</Text>
          )}
        </ScrollView>

        <View style={styles.fixedButtonsWrapper}>
          <TouchableOpacity onPress={loadProfile} style={styles.primaryButton}>
            <Text style={styles.buttonText}>Update Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/')} style={styles.secondaryButton}>
            <Text style={styles.buttonText}>Return to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/search')} style={styles.secondaryButton}>
            <Text style={styles.buttonText}>Search Movies</Text>
          </TouchableOpacity>
        </View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent' }, // Transparent background so that the image shows
  scrollContent: { padding: 20, paddingBottom: 200 },
  logoContainer: { width: '100%', alignItems: 'center', marginBottom: 20 },
  logo: { width: width * 0.6, height: 120 },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  primaryButton: {
    backgroundColor: '#0072ff',
    padding: 12,
    borderRadius: 8,
    width: '30%',
    marginHorizontal: 5,
  },
  secondaryButton: {
    backgroundColor: 'red',
    padding: 12,
    borderRadius: 8,
    width: '30%',
    marginHorizontal: 5,
  },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  errorText: { color: 'red', textAlign: 'center', marginVertical: 10 },
  profileContainer: { alignItems: 'center', marginTop: 20 },
  avatar: { width: 96, height: 96, borderRadius: 48, marginBottom: 10 },
  name: { fontSize: 20, fontWeight: 'bold', color: 'white' }, // White text color
  subtext: { color: '#ccc' }, // Lighter subtext color for better contrast
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 20 },
  statBox: { alignItems: 'center' },
  statValue: { fontWeight: 'bold', color: 'white' }, // White text for stat values
  section: { marginTop: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: 'white' }, // White section title
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  rowText: { fontSize: 16, color: 'white' }, // White text for row labels
  loadingText: { textAlign: 'center', marginTop: 30, color: '#999' },
  fixedButtonsWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
    marginBottom: 80,
  },
  
});

export default Profile;
