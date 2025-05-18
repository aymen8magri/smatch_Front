import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import MatchService from '@/services/MatchService';
import { Match } from '@/models/Match';

const ProductDetails = () => {
  const { id } = useLocalSearchParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Line Up');
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle joining a public match
  const handleJoinQuickMatch = async (teamId: string) => {
    console.log(teamId)

    try {
      const response = await MatchService.joinQuickMatch(id as string, teamId as string);
      const updatedMatch = response.data;
      setMatch(updatedMatch); // Update match state
      Alert.alert('Succès', `Vous avez rejoint le match}!`);
    } catch (error: any) {
      console.error('Erreur lors de la tentative de rejoindre le match :', error);
      Alert.alert('Erreur', error.response?.data?.message || 'Échec de la tentative de rejoindre le match.');
    }
  };

  // Function to handle requesting to join a private match
  const handleRequestJoinPrivateMatch = async (teamId: string) => {
    console.log(teamId)
    try {
      await MatchService.requestToJoinQuickMatch(id as string, teamId as string);
      Alert.alert('Demande envoyée', 'Votre demande pour rejoindre le match à la place ${place} a été envoyée.');
    } catch (error: any) {
      console.error('Erreur lors de la demande de rejoindre le match :', error);
      Alert.alert('Erreur', error.response?.data?.message || 'Échec de l\'envoi de la demande.');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await ProductService.getProductById(id as string);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product. Please try again.');
        Alert.alert('Error', 'Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  const handleRetry = () => {
    setLoading(true);
    setError(null);
    fetchProduct();
  };

  // Render loading state
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-darkBg p-4">
        <Text className="text-white text-lg font-semibold text-center">Aucun match trouvé</Text>
        <Text className="text-grayText text-sm text-center mt-2">
          Il semble qu'il n'y ait aucun match disponible pour le moment.
        </Text>
        <TouchableOpacity
          className="mt-4 bg-orange-500 py-2 px-4 rounded-full"
          onPress={() => router.back()}
        >
          <Text className="text-white font-semibold">Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const matchDate = new Date(match.date);
  const now = new Date('2025-05-18T21:36:00+01:00'); // May 18, 2025, 09:36 PM CET
  let status = 'Upcoming';
  if (matchDate < now) {
    status = 'Finished';
  } else if (Math.abs(matchDate.getTime() - now.getTime()) < 2 * 60 * 60 * 1000) {
    status = 'Live';
  }

  const currentFormation = selectedTeam === match.team1.teamName ? match.team1.players : match.team2.players;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderFormation = () => {
    // Create an array of 6 places, filled with players in order or 'Inconnu'
    const orderedFormation = Array(6).fill(null).map((_, index) => {
      const player = currentFormation[index] || {
        name: 'Inconnu',
        position: `Place ${index + 1}`,
      };
      return { ...player, place: index + 1 }; // Assign place number (1-6)
    });

    // Determine teamId based on selectedTeam
    const teamId = selectedTeam === match.team1.teamName ? match.team1._id : match.team2._id;

    return (
      <SafeAreaView style={styles.container}>
        <Animated.View entering={FadeInDown.duration(300)} style={styles.centered}>
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${selectedTeam === match.team1.teamName ? 'bg-orange-500' : 'bg-gray-600'}`}
            onPress={() => setSelectedTeam(match.team1.teamName)}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.errorText}>{error || 'Product not found'}</Text>
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${selectedTeam === match.team2.teamName ? 'bg-orange-500' : 'bg-gray-600'}`}
            onPress={() => setSelectedTeam(match.team2.teamName)}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5 bg-orange-500 rounded-lg p-4">
          {/* Front Row: Places 2, 3, 4 */}
          <View className="flex-row justify-around">
            {orderedFormation.slice(1, 4).map((player) => (
              <View
                key={player.place}
                className="items-center"
                style={{ position: 'relative' }}
              >
                {player.name === 'Inconnu' && (
                  <TouchableOpacity
                    onPress={() =>
                      match.isPublic
                        ? handleJoinQuickMatch(teamId)
                        : handleRequestJoinPrivateMatch(teamId)
                    }
                    style={{
                      position: 'absolute',
                      top: -7,
                      left: '75%',
                      transform: [{ translateX: -10 }],
                      width: 25,
                      height: 25,
                      backgroundColor: '#10B981',
                      borderRadius: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      zIndex: 1,
                    }}
                  >
                    <Text className="text-white text-xl font-bold">+</Text>
                  </TouchableOpacity>
                )}
                <View className="bg-blue-900 w-20 h-20 rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-lg">{player.place}</Text>
                </View>
                <Text className="text-white text-sm mt-1 text-center" numberOfLines={2}>
                  {player.name}
                </Text>
              </View>
            ))}
          </View>
          <View className="border-t border-dashed border-white my-2" />
          {/* Back Row: Places 1, 6, 5 */}
          <View className="flex-row justify-around mt-3">
            {orderedFormation
              .filter((p) => [1, 6, 5].includes(p.place))
              .map((player) => (
                <View
                  key={player.place}
                  className="items-center"
                  style={{ position: 'relative' }}
                >
                  {player.name === 'Inconnu' && (
                    <TouchableOpacity
                      onPress={() =>
                        match.isPublic
                          ? handleJoinQuickMatch(teamId)
                          : handleRequestJoinPrivateMatch(teamId)
                      }
                      style={{
                        position: 'absolute',
                        top: -7,
                        left: '75%',
                        transform: [{ translateX: -10 }],
                        width: 25,
                        height: 25,
                        backgroundColor: '#10B981',
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1,
                      }}
                    >
                      <Text className="text-white text-xl font-bold">+</Text>
                    </TouchableOpacity>
                  )}
                  <View className="bg-blue-900 w-20 h-20 rounded-full items-center justify-center">
                    <Text className="text-white font-bold text-lg">{player.place}</Text>
                  </View>
                  <Text className="text-white text-sm mt-1 text-center" numberOfLines={2}>
                    {player.name}
                  </Text>
                </View>
              ))}
          </View>
        </View>
      </View>
    );
  };

  const renderMatchDetails = () => (
    <View className="mt-4">
      <Text className="text-white text-lg font-bold">Détails du match</Text>
      <View className="mt-2 space-y-2">
        <Text className="text-white text-sm">
          Type de terrain : {match.terrainType || 'N/A'}
        </Text>
        <Text className="text-white text-sm">
          Nombre maximum de sets : {match.maxSets || 'N/A'}
        </Text>
        <Text className="text-white text-sm" numberOfLines={2}>
          Lieu : {match.location || 'N/A'}
        </Text>
        <Text className="text-white text-sm">
          Visibilité : {match.isPublic ? 'Public' : 'Privé'}
        </Text>
        <Text className="text-white text-sm">
          Créateur : {match.creator?.name || 'N/A'}
        </Text>
      </View>
    </View>
  );

  const renderH2H = () => (
    <View className="mt-4">
      <Text className="text-white text-lg font-bold">Face-à-face</Text>
      <View className="mt-2 space-y-2">
        <Text className="text-white text-sm">Date : {formatDate(match.date)}</Text>
        <Text className="text-white text-sm">
          Type de terrain : {match.terrainType || 'N/A'}
        </Text>
        <Text className="text-white text-sm">
          Gagnant : {match.winner?.teamName || 'Non déterminé'}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/shop')}
          accessible
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Animated.View entering={FadeIn.duration(500)} style={styles.card}>
          <View style={styles.imageContainer}>
            {product.imageUrl?.startsWith('http') ? (
              <Image
                source={{ uri: product.imageUrl }}
                style={styles.image}
                resizeMode="cover"
                onLoadStart={() => <ActivityIndicator color="#fff" />}
                accessible
                accessibilityLabel={product.name}
              />
            ) : (
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.image}
                resizeMode="cover"
                accessible
                accessibilityLabel="Placeholder image"
              />
            )}
          </View>

          <View style={styles.content}>
            <Text
              style={styles.category}
              accessible
              accessibilityLabel={`Category: ${product.category.name}`}
            >
              {product.category.name}
            </Text>
            <Text style={styles.title} accessible accessibilityLabel={`Product: ${product.name}`}>
              {product.name}
            </Text>

            <View style={styles.priceRow}>
              <Text
                style={styles.price}
                accessible
                accessibilityLabel={`Price: ${isInStock ? `$${product.price.toFixed(2)}` : 'Sold Out'}`}
              >
                {isInStock ? `$${product.price.toFixed(2)}` : 'Sold Out'}
              </Text>
              <View
                style={[
                  styles.stockContainer,
                  { backgroundColor: isInStock ? '#10B981' : '#EF4444' },
                ]}
              >
                <Text
                  style={styles.stockText}
                  accessible
                  accessibilityLabel={`Stock: ${product.stock || 'In Stock'}`}
                >
                  {product.stock || 'In Stock'}
                </Text>
              </View>
            </View>

      <View className="flex-row justify-around mb-4">
        <TouchableOpacity
          className={`py-2 px-4 rounded-full ${activeTab === 'Match Detail' ? 'bg-orange-500' : 'bg-gray-600'}`}
          onPress={() => setActiveTab('Match Detail')}
        >
          <Text className="text-white text-sm font-semibold">Détails</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`py-2 px-4 rounded-full ${activeTab === 'Line Up' ? 'bg-orange-500' : 'bg-gray-600'}`}
          onPress={() => setActiveTab('Line Up')}
        >
          <Text className="text-white text-sm font-semibold">Composition</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`py-2 px-4 rounded-full ${activeTab === 'H2H' ? 'bg-orange-500' : 'bg-gray-600'}`}
          onPress={() => setActiveTab('H2H')}
        >
          <Text className="text-white text-sm font-semibold">Face-à-face</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'Line Up' && renderFormation()}
      {activeTab === 'Match Detail' && renderMatchDetails()}
      {activeTab === 'H2H' && renderH2H()}
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e32',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 80,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: '#2a2a40',
    padding: 12,
    borderRadius: 12,
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  card: {
    backgroundColor: '#2a2a40',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3a3a50',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 12,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#3a3a50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 24,
  },
  category: {
    color: '#ff6f61',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    color: '#ff6200',
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 12,
  },
  stockContainer: {
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  stockText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  descriptionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    color: '#a0a0b0',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});