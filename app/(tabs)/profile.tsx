import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { icons } from '@/constants/icons';
import { images } from '@/constants/images';

const { width } = Dimensions.get('window');

const Profile = () => {
  const router = useRouter();
  const { user } = useUser();

  if (!user) return <Text style={styles.loadingText}>Loading...</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Image
        source={images.spider}
        style={{ flex: 1, width: '100%', height: '100%', position: 'absolute', zIndex: 0 }}
        resizeMode="cover"
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image source={icons.logo} resizeMode="contain" style={styles.logo} />
        </View>

        <View style={styles.profileContainer}>
          <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
          <Text style={styles.name}>{user.fullName || user.username}</Text>
          <Text style={styles.subtext}>{user.primaryEmailAddress?.emailAddress || 'No email'}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.subtext}>Movies</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>350</Text>
              <Text style={styles.subtext}>Followers</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>210</Text>
              <Text style={styles.subtext}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Movies</Text>
          {[
            ['Want to watch', 10],
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
      </ScrollView>

      <View style={styles.fixedButtonsWrapper}>
        <TouchableOpacity onPress={() => router.push('/')} style={styles.primaryButton}>
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
  scrollContent: { padding: 20, paddingBottom: 200 },

  logoContainer: { width: '100%', alignItems: 'center', marginBottom: 20 },
  logo: { width: width * 0.5, height: 100 },

  profileContainer: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtext: {
    color: '#ccc',
    fontSize: 14,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingVertical: 10,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  section: {
    marginTop: 30,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  rowText: {
    fontSize: 16,
    color: '#fff',
  },

  primaryButton: {
    backgroundColor: '#1e90ff',
    padding: 14,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#ff3b30',
    padding: 14,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },

  fixedButtonsWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
    marginBottom: 80,
  },

  loadingText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#aaa',
    fontSize: 16,
  },
});

export default Profile;
