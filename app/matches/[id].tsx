import { ScrollView, Text, Image, View, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import MatchService from '@/services/MatchService';
import { Match } from '@/models/Match';

// Volleyball positions in court order
const volleyballPositions = [
  'Setter', // Position 1: Back-right (service zone)
  'Opposite', // Position 2: Front-right
  'Outside Hitter', // Position 3: Front-center
  'Middle Blocker', // Position 4: Front-left
  'Outside Hitter', // Position 5: Back-left
  'Libero', // Position 6: Back-center
];

const MatchesDetails = () => {
  const { id } = useLocalSearchParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('Line Up');
  const [isLoading, setIsLoading] = useState(true);

  const handleJoinQuickMatch = async () => {
    try {
      console.log(`Joining match for ${id}`);

      const response = await MatchService.joinQuickMatch(id as string); // utilise le service
      const updatedMatch = response.data;

      // ✅ Mets à jour l’état ou fais une redirection si besoin
      console.log('Match mis à jour :', updatedMatch);

      // Optionnel : message de succès ou redirection
      Alert.alert('Succès', 'Vous avez rejoint le match avec succès.');

    } catch (error: any) {
      console.error('Erreur lors de la tentative de rejoindre le match :', error);
      Alert.alert('Erreur', error.response?.data?.message || 'Échec de la tentative de rejoindre le match.');
    }
  };


  useEffect(() => {
    if (!id) return;

    const fetchMatch = async () => {
      try {
        setIsLoading(true);
        const response = await MatchService.getQuickMatchById(id as string);
        setMatch(response.data);
        setSelectedTeam(response.data.team1.teamName);
      } catch (error) {
        console.error('Error fetching match:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatch();
  }, [id]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-darkBg p-4">
        <ActivityIndicator size="large" color="#F97316" />
        <Text className="text-white text-lg font-semibold mt-4">Chargement...</Text>
      </View>
    );
  }

  if (!match) {
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
  const now = new Date();
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
    // Map players to volleyball positions (ensure 6 players or fill with placeholders)
    const orderedFormation = volleyballPositions.map((position, index) => {
      const player = currentFormation.find((p) => p.position === position) || {
        name: 'Inconnu',
        position: position,
      };
      return { ...player, positionIndex: index + 1 }; // Add position index (1-6)
    });

    // Position abbreviations for display
    const positionAbbreviations = {
      'Setter': 'S',
      'Opposite': 'O',
      'Outside Hitter': 'OH',
      'Middle Blocker': 'MB',
      'Libero': 'L',
    };

    return (
      <View className="mt-4">
        <Text className="text-white text-lg font-bold">Composition</Text>
        <View className="flex-row justify-around mt-2">
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${selectedTeam === match.team1.teamName ? 'bg-orange-500' : 'bg-gray-600'
              }`}
            onPress={() => setSelectedTeam(match.team1.teamName)}
          >
            <Text className="text-white text-sm font-semibold">{match.team1.teamName}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`py-2 px-4 rounded-full ${selectedTeam === match.team2.teamName ? 'bg-orange-500' : 'bg-gray-600'
              }`}
            onPress={() => setSelectedTeam(match.team2.teamName)}
          >
            <Text className="text-white text-sm font-semibold">{match.team2.teamName}</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-5 bg-orange-500 rounded-lg p-4">
          {/* Front Row: Positions 2, 3, 4 (Opposite, Outside Hitter, Middle Blocker) */}
          <View className="flex-row justify-around">
            {orderedFormation.slice(1, 4).map((player) => (
              <View
                key={player.position + player.positionIndex}
                className="items-center"
                style={{ position: 'relative' }}
              >
                <TouchableOpacity
                  onPress={() => handleJoinQuickMatch()} // fonction à définir
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

                <View className="bg-blue-900 w-20 h-20 rounded-full items-center justify-center">
                  <Text className="text-white font-bold text-lg">
                    {positionAbbreviations[player.position] || player.position.charAt(0)}
                  </Text>
                </View>
                <Text className="text-white text-sm mt-1 text-center" numberOfLines={2}>
                  {player.name}
                </Text>
              </View>
            ))}
          </View>
          <View className="border-t border-dashed border-white my-2" />
          {/* Back Row: Positions 1, 6, 5 (Setter, Libero, Outside Hitter) */}
          <View className="flex-row justify-around mt-3">
            {orderedFormation
              .filter((p) => [0, 5, 4].includes(p.positionIndex - 1))
              .map((player) => (
                <View
                  key={player.position + player.positionIndex}
                  className="items-center"
                  style={{ position: 'relative' }}
                >
                  <TouchableOpacity
                    onPress={() => handleJoinQuickMatch()} // fonction à définir
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

                  <View className="bg-blue-900 w-20 h-20 rounded-full items-center justify-center">
                    <Text className="text-white font-bold text-lg">
                      {positionAbbreviations[player.position] || player.position.charAt(0)}
                    </Text>
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
    <ScrollView className="flex-1 bg-darkBg p-4">
      <View className="flex-row items-center mb-4">
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          className="text-white text-xl font-bold ml-2 flex-1"
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {match.location || 'Match'}
        </Text>
      </View>

      <View className="mb-4">
        <View className="flex-row justify-between items-center">
          <View className="items-center flex-1">
            <Image
              source={
                match.team1.logo
                  ? { uri: match.team1.logo }
                  : require('../../assets/images/smatch-logo.png')
              }
              className="w-12 h-12 mb-2"
              resizeMode="contain"
            />
            <Text
              className="text-white text-sm font-semibold text-center"
              numberOfLines={2}
            >
              {match.team1.teamName}
            </Text>
          </View>
          <View className="items-center">
            {status === 'Upcoming' ? (
              <Text className="text-white text-xl font-bold">À venir</Text>
            ) : (
              <Text className="text-white text-2xl font-bold">
                {match.score1 ?? '0'} - {match.score2 ?? '0'}
              </Text>
            )}
            <Text className="text-grayText text-sm mt-1">
              {formatDate(match.date)}
            </Text>
          </View>
          <View className="items-center flex-1">
            <Image
              source={
                match.team2.logo
                  ? { uri: match.team2.logo }
                  : require('../../assets/images/smatch-logo.png')
              }
              className="w-12 h-12 mb-2"
              resizeMode="contain"
            />
            <Text
              className="text-white text-sm font-semibold text-center"
              numberOfLines={2}
            >
              {match.team2.teamName}
            </Text>
          </View>
        </View>
        <View className="flex-row justify-center items-center mt-2">
          <Ionicons
            name={match.isPublic ? 'earth-outline' : 'lock-closed-outline'}
            size={16}
            color="#888"
            className="mr-1"
          />
          <Text className="text-grayText text-sm">
            {match.isPublic ? 'Public' : 'Privé'}
          </Text>
        </View>
      </View>

      <View className="flex-row justify-around mb-4">
        <TouchableOpacity
          className={`py-2 px-4 rounded-full ${activeTab === 'Match Detail' ? 'bg-orange-500' : 'bg-gray-600'
            }`}
          onPress={() => setActiveTab('Match Detail')}
        >
          <Text className="text-white text-sm font-semibold">Détails</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`py-2 px-4 rounded-full ${activeTab === 'Line Up' ? 'bg-orange-500' : 'bg-gray-600'
            }`}
          onPress={() => setActiveTab('Line Up')}
        >
          <Text className="text-white text-sm font-semibold">Composition</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`py-2 px-4 rounded-full ${activeTab === 'H2H' ? 'bg-orange-500' : 'bg-gray-600'
            }`}
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

export default MatchesDetails;