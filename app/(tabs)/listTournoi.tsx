import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import TournamentService from '@/services/tournamentService';
import { Tournament } from '@/models/Tournament';

const tournaments = [
  {
  id: 1,
    name: 'UEFA Champions League 2021',
    startDate: 'Feb 2021 - May 2021',
    location: 'Europe',
    status: 'Finished',
    image: 'https://m.media-amazon.com/images/S/pv-target-images/f96fddd4eb3700e10249fbe45ba93f3340d6867a49a99500671d734a44be3f46.jpg',
  },
  {
  id: 1,
    name: 'La Liga Tournament 2021',
    startDate: 'Aug 2021 - May 2022',
    location: 'Spain',
    status: 'Ongoing',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZRsjUp94Yj9OHrl1WmwGpbRA_qnb8kjpKA&s',
  },
  {
  id: 1,
    name: 'UEFA Champions League 2021',
    startDate: 'Feb 2021 - May 2021',
    location: 'Europe',
    status: 'Finished',
    image: 'https://m.media-amazon.com/images/S/pv-target-images/f96fddd4eb3700e10249fbe45ba93f3340d6867a49a99500671d734a44be3f46.jpg',
  },
  {
  id: 1,
    name: 'La Liga Tournament 2021',
    startDate: 'Aug 2021 - May 2022',
    location: 'Spain',
    status: 'Ongoing',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZRsjUp94Yj9OHrl1WmwGpbRA_qnb8kjpKA&s',
  },
  {
  id: 1,
    name: 'UEFA Champions League 2021',
    startDate: 'Feb 2021 - May 2021',
    location: 'Europe',
    status: 'Finished',
    image: 'https://m.media-amazon.com/images/S/pv-target-images/f96fddd4eb3700e10249fbe45ba93f3340d6867a49a99500671d734a44be3f46.jpg',
  },
  {
  id: 1,
    name: 'La Liga Tournament 2021',
    startDate: 'Aug 2021 - May 2022',
    location: 'Spain',
    status: 'Ongoing',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoZRsjUp94Yj9OHrl1WmwGpbRA_qnb8kjpKA&s',
  },
];

export default function ListTournoi() {
  //const [tournaments, setTournaments] = useState<Tournament[]>([]);

  // useEffect(() => {
  //   // Fetch tournaments data
  //   TournamentService.getAllTournaments()
  //     .then(response => {
  //       setTournaments(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Erreur de récupération des tournois:', error);
  //     });
  // }, []);

  return (
    <View className="flex-1 bg-darkBg">
      {/* Search Bar */}
      <View className="flex-row items-center p-4">
        <View className="flex-1 bg-darkCard rounded-lg p-2">
          <TextInput
            placeholder="Recherchez un ..."
            placeholderTextColor="#888"
            className="text-white text-base"
          />
        </View>
      </View>

      {/* Tournaments List or Empty State */}
      {tournaments.length > 0 ? (
        <ScrollView className="flex-1 px-4">
          {tournaments.map((tournament, index) => (
            <View
              key={index}
              className="bg-darkCard rounded-xl mb-4 shadow-md"
            >
              {/* Tournament Image */}
              <View className="items-center mb-3">
                <Image
                  source={{ uri: tournament.image }}
                  className="w-full h-40 rounded-lg shadow-md"
                  resizeMode="cover"
                />
              </View>

              {/* Tournament Name and Status */}
              <View className="flex-row justify-between items-center mb-2 p-2">
                <View className="flex-row items-center">
                  <Text className="text-white text-x font-bold mr-2">{tournament.name}</Text>
                  <View className="flex-row items-center">
                    <View
                      className={`w-2 h-2 rounded-full mr-1 ${tournament.status === 'Ongoing'
                        ? 'bg-green-500'
                        : tournament.status === 'Finished'
                          ? 'bg-red-500'
                          : 'bg-accentOrange'
                        }`}
                    />
                    <Text className="text-grayText text-xs">{tournament.status}</Text>
                  </View>
                </View>
              </View>

              {/* Date Range and Location */}
              <View className="flex-row justify-between mb-3 p-2">
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={16} color="#888" className="mr-2" />
                  <Text className="text-white text-xs">{tournament.startDate}</Text>
                </View>
                <View className="flex-row items-center">
                  <Ionicons name="location-outline" size={16} color="#888" className="mr-1" />
                  <Text className="text-grayText text-xs">{tournament.location}</Text>
                </View>
              </View>

              {/* Additional Info */}
              <View className="flex-row justify-end items-center p-2">
                <Link href={`../tournois/${tournament.id}`} asChild>
                  <Text className="text-accentBlue text-xs font-bold">View Details</Text>
                </Link>
                <Ionicons name="chevron-forward-outline" size={16} color="#3B82F6" className="ml-1" />
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View className="flex-1 justify-center items-center p-4">
          <Text className="text-white text-lg font-semibold text-center">Aucun tournoi trouvé</Text>
          <Text className="text-grayText text-sm text-center mt-2">Il semble qu'il n'y ait aucun tournoi disponible pour le moment. Revenez plus tard ou créez-en un !</Text>
        </View>
      )}
    </View>
  );
}