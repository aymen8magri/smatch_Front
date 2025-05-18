import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import Animated, { FadeInDown } from 'react-native-reanimated';

const initialCartItems = [
  {
    id: '1',
    name: 'Volleyball Pro',
    price: 29.99,
    image: 'https://teamwear-concept.com/wp-content/uploads/2023/02/72-198-1-570x570-1.png',
    quantity: 1,
  },
  {
    id: '4',
    name: 'Volleyball Shoes',
    price: 89.99,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHqlQqCNPHvbZbQlR47Uyyv0Fwr-lX4t3B8g&s',
    quantity: 2,
  },
];

const Panier = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState(initialCartItems);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id: string, name: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
    Toast.show({
      type: 'success',
      text1: 'Produit supprimé',
      text2: `${name} a été retiré du panier`,
    });
  };

  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    Toast.show({
      type: 'info',
      text1: 'Commander',
      text2: 'Proceeding to checkout...',
    });
    // Optionally navigate to checkout screen
    // router.push('/checkout');
  };

  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <Animated.View
      entering={FadeInDown.duration(300).delay(index * 100)}
      style={styles.itemContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
          onLoadStart={() => <ActivityIndicator color="#fff" />}
          accessible
          accessibilityLabel={item.name}
        />
      </View>
      <View style={styles.info}>
        <Text
          style={styles.name}
          accessible
          accessibilityLabel={`Product: ${item.name}`}
        >
          {item.name}
        </Text>
        <Text
          style={styles.price}
          accessible
          accessibilityLabel={`Price: $${(item.price * item.quantity).toFixed(2)}`}
        >
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, -1)}
            accessible
            accessibilityLabel="Decrease quantity"
          >
            <Ionicons name="remove" size={20} color="#fff" />
          </TouchableOpacity>
          <Text
            style={styles.quantity}
            accessible
            accessibilityLabel={`Quantity: ${item.quantity}`}
          >
            {item.quantity}
          </Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, 1)}
            accessible
            accessibilityLabel="Increase quantity"
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.id, item.name)}
        accessible
        accessibilityLabel={`Remove ${item.name} from cart`}
      >
        <Ionicons name="trash-outline" size={24} color="#EF4444" />
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push('/boutique')}
          accessible
          accessibilityLabel="Go back to shop"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Mon Panier</Text>
      </View>

      {cartItems.length === 0 ? (
        <Animated.View
          entering={FadeInDown.duration(300)}
          style={styles.emptyContainer}
        >
          <Text style={styles.emptyText}>Votre panier est vide 🛒</Text>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => router.push('/boutique')}
            accessible
            accessibilityLabel="Shop now"
          >
            <Text style={styles.shopButtonText}>Acheter maintenant</Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
          />
          <Animated.View
            entering={FadeInDown.duration(300).delay(200)}
            style={styles.totalContainer}
          >
            <Text style={styles.totalText}>Total: ${total}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={handleCheckout}
              accessible
              accessibilityLabel="Proceed to checkout"
            >
              <Text style={styles.checkoutText}>Commander</Text>
            </TouchableOpacity>
          </Animated.View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Panier;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e32',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    backgroundColor: '#2a2a40',
    padding: 12,
    borderRadius: 12,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  emptyText: {
    color: '#a0a0b0',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#2a2a40',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  imageContainer: {
    width: 80,
    height: 80,
    backgroundColor: '#3a3a50',
    borderRadius: 12,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  price: {
    color: '#ff6200',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    width: 40,
    textAlign: 'center',
  },
  quantityButton: {
    backgroundColor: '#3a3a50',
    borderRadius: 8,
    padding: 8,
    marginHorizontal: 8,
  },
  removeButton: {
    padding: 8,
  },
  totalContainer: {
    borderTopWidth: 1,
    borderTopColor: '#3a3a50',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  totalText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'right',
  },
  checkoutButton: {
    backgroundColor: '#1e90ff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});