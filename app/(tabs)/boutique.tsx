import React, { useState } from 'react';
import { View, Text, Image, FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';

const categories = ['Balls', 'Shoes', 'Apparel', 'Accessories'];
// Map categories to specific Ionicons
const categoryIcons = {
  Balls: 'basketball-outline',
  Shoes: 'footsteps-outline',
  Apparel: 'shirt-outline',
  Accessories: 'shield-outline',
};
const products = [
  // Balls Category
  {
    id: '1',
    category: 'Balls',
    name: 'Volleyball Pro',
    price: '$29.99',
    description: 'High-quality volleyball for competitive play.',
    image: 'https://teamwear-concept.com/wp-content/uploads/2023/02/72-198-1-570x570-1.png',
    stock: 'In Stock',
  },
  {
    id: '2',
    category: 'Balls',
    name: 'Beach Volleyball Elite',
    price: '$34.99',
    description: 'Durable volleyball designed for beach conditions.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdrLnjF0dcI7g96wPhOhipfgQwfpop5THnqw&s',
    stock: 'In Stock',
  },
  {
    id: '3',
    category: 'Balls',
    name: 'Training Ball Set',
    price: '$19.99',
    description: 'Set of 3 lightweight training volleyballs.',
    image: 'https://e7.pngegg.com/pngimages/10/23/png-clipart-volleyball-volleyball-ball-text-sport-thumbnail.png',
    stock: 'Out of Stock',
  },
  // Shoes Category
  {
    id: '4',
    category: 'Shoes',
    name: 'Volleyball Shoes',
    price: '$89.99',
    description: 'Lightweight shoes with excellent grip.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHqlQqCNPHvbZbQlR47Uyyv0Fwr-lX4t3B8g&s',
    stock: 'In Stock',
  },
  {
    id: '5',
    category: 'Shoes',
    name: 'Indoor Volleyball Sneakers',
    price: '$79.99',
    description: 'Comfortable sneakers optimized for indoor courts.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZWK5eG3HtXf7eTm1m9-EA5ZugnbBa_v0Dw&s',
    stock: 'In Stock',
  },
  {
    id: '6',
    category: 'Shoes',
    name: 'Pro Spike Shoes',
    price: '$99.99',
    description: 'High-performance shoes for advanced players.',
    image: 'https://media.tenor.com/iNzmgPFOywUAAAAe/haikyuu-noya.png',
    stock: 'Out of Stock',
  },
  // Apparel Category
  {
    id: '7',
    category: 'Apparel',
    name: 'Team Jersey',
    price: '$49.99',
    description: 'Breathable fabric, available in all sizes.',
    image: 'https://e7.pngegg.com/pngimages/159/854/png-clipart-sports-volleyball-jersey-t-shirt-design-netball-bibs-all-7-thumbnail.png',
    stock: 'In Stock',
  },
  {
    id: '8',
    category: 'Apparel',
    name: 'Volleyball Shorts',
    price: '$29.99',
    description: 'Flexible shorts with moisture-wicking technology.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDFYKTGQg9Anyi2IOmPpAxclGEQmXAC646jA&s',
    stock: 'In Stock',
  },
  {
    id: '9',
    category: 'Apparel',
    name: 'Warm-Up Jacket',
    price: '$59.99',
    description: 'Stylish jacket for pre-game warm-ups.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn=None',
    stock: 'Out of Stock',
  },
  // Accessories Category
  {
    id: '10',
    category: 'Accessories',
    name: 'Knee Pads',
    price: '$19.99',
    description: 'Protective knee pads for safe diving.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn=None',
    stock: 'In Stock',
  },
  {
    id: '11',
    category: 'Accessories',
    name: 'Ankle Supports',
    price: '$24.99',
    description: 'Adjustable supports for ankle stability.',
    image: 'https://www.midwestvolleyball.com/store/sc_images/products/ASOBRACE.P2.jpg',
    stock: 'In Stock',
  },
  {
    id: '1212',
    category: 'Accessories',
    name: 'Wrist Guards',
    price: '$14.99',
    description: 'Lightweight guards for wrist protection.',
    image: 'https://m.media-amazon.com/images/I/71Suaf0d9oL._AC_SL1500_.jpg',
    stock: 'Out of Stock',
  },
];

export default function Boutique() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Balls'); // Default to Balls
  const cartItemCount = 3;

  // Filter products based on selected category
  const filteredProducts = products.filter(product => product.category === selectedCategory);

  // Handle Add to Cart
  const handleAddToCart = (product: any) => {
    Toast.show({
      type: 'success',
      text1: 'Produit ajouté',
      text2: `${product!.name} a été ajouté au panier 🛒`,
    });
    console.log(`Added ${product.name} to cart`);
    // Add your cart logic here (e.g., update cart state, API call)
  };

  // Handle navigation to product details
  const handleProductPress = (productId: string) => {
    router.push({
      pathname: "/shop/[id]",
      params: { id: productId }
    });
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#1e1e32' }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Featured Product Section */}
        <View style={{ margin: 16, borderRadius: 8, overflow: 'hidden', backgroundColor: '#2a2a40' }}>
          <View style={{ width: '100%', height: 160, justifyContent: 'center', alignItems: 'center', backgroundColor: '#e0e0e0' }}>
            <Text style={{ fontSize: 64 }}>🏐</Text>
          </View>
          <View style={{ padding: 12 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#1e90ff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, alignSelf: 'flex-start' }}>
              <Ionicons name="basketball-outline" size={16} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 12, marginLeft: 4 }}>Featured Product</Text>
            </View>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold', marginVertical: 4 }}>
              Volleyball Pro
            </Text>
            <Text style={{ color: '#888', fontSize: 12 }}>$29.99 - In Stock</Text>
          </View>
        </View>

        {/* Category Selector */}
        <FlatList
          horizontal
          data={categories}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                backgroundColor: selectedCategory === item ? '#ff6f61' : '#2a2a40',
                borderRadius: 12,
                paddingVertical: 8,
                paddingHorizontal: 16,
                marginRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => setSelectedCategory(item)}
            >
              <Ionicons name={categoryIcons[item]} size={24} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', marginLeft: 4 }}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          style={{ marginHorizontal: 16, marginBottom: 16 }}
        />

        {/* Products by Selected Category */}
        {filteredProducts.map((product) => (
          <View key={product.id} style={{ marginHorizontal: 16, marginBottom: 20 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleProductPress(product.id)}
            >
              <View
                style={{
                  backgroundColor: '#2a2a40',
                  borderRadius: 12,
                  padding: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 6,
                  elevation: 8,
                }}
              >
                {/* Product Image */}
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: '#3a3a50',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 12,
                    borderRadius: 8,
                  }}
                >
                  {product.image.startsWith('http') ? (
                    <Image
                      source={{ uri: product.image }}
                      style={{ width: 60, height: 60, borderRadius: 8 }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={{ fontSize: 32 }}>{product.image}</Text>
                  )}
                </View>

                {/* Product Info */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: 'bold',
                      marginBottom: 4,
                    }}
                  >
                    {product.name}
                  </Text>
                  <Text
                    style={{
                      color: '#a0a0b0',
                      fontSize: 12,
                      lineHeight: 16,
                      marginBottom: 8,
                    }}
                    numberOfLines={2}
                  >
                    {product.description}
                  </Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text
                        style={{
                          color: '#ff6200',
                          fontSize: 16,
                          fontWeight: 'bold',
                          marginRight: 8,
                        }}
                      >
                        {product.price}
                      </Text>
                      <View
                        style={{
                          backgroundColor: product.stock === 'In Stock' ? '#10B981' : '#EF4444',
                          borderRadius: 8,
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                        }}
                      >
                        <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
                          {product.stock}
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      style={{
                        backgroundColor: product.stock === 'In Stock' ? '#1e90ff' : '#6b7280',
                        borderRadius: 8,
                        padding: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => product.stock === 'In Stock' && handleAddToCart(product)}
                      disabled={product.stock !== 'In Stock'}
                    >
                      <Ionicons name="cart-outline" size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-4 right-4 bg-accentOrange rounded-full p-4 shadow-lg"
        onPress={() => router.push('/shop/panier')}
      >
        <Ionicons name="cart-outline" size={24} color="#fff" />

        {/* Badge si le panier n’est pas vide */}
        {cartItemCount > 0 && (
          <View
            style={{
              position: 'absolute',
              top: -4,
              right: -4,
              backgroundColor: '#ff6200',
              borderRadius: 10,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              shadowRadius: 5,
              elevation: 5,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: 'bold' }}>
              {cartItemCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}