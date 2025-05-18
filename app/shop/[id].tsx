import React from 'react';
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
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

const products = [
    // Balls Category
    {
        id: '1',
        category: 'Balls',
        name: 'Volleyball Pro',
        price: '$29.99',
        description:
            'High-quality volleyball for competitive play, designed for professional matches with excellent grip and durability.',
        image:
            'https://teamwear-concept.com/wp-content/uploads/2023/02/72-198-1-570x570-1.png',
        stock: 'In Stock',
    },
    {
        id: '2',
        category: 'Balls',
        name: 'Beach Volleyball Elite',
        price: '$34.99',
        description:
            'Durable volleyball designed for beach conditions, resistant to sand and water with vibrant colors.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdrLnjF0dcI7g96wPhOhipfgQwfpop5THnqw&s',
        stock: 'In Stock',
    },
    {
        id: '3',
        category: 'Balls',
        name: 'Training Ball Set',
        price: '$19.99',
        description:
            'Set of 3 lightweight training volleyballs, perfect for beginners and practice sessions.',
        image:
            'https://e7.pngegg.com/pngimages/10/23/png-clipart-volleyball-volleyball-ball-text-sport-thumbnail.png',
        stock: 'Out of Stock',
    },
    // Shoes Category
    {
        id: '4',
        category: 'Shoes',
        name: 'Volleyball Shoes',
        price: '$89.99',
        description:
            'Lightweight shoes with excellent grip, engineered for quick movements and stability on the court.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHqlQqCNPHvbZbQlR47Uyyv0Fwr-lX4t3B8g&s',
        stock: 'In Stock',
    },
    {
        id: '5',
        category: 'Shoes',
        name: 'Indoor Volleyball Sneakers',
        price: '$79.99',
        description:
            'Comfortable sneakers optimized for indoor courts, with cushioned soles and breathable mesh.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyZWK5eG3HtXf7eTm1m9-EA5ZugnbBa_v0Dw&s',
        stock: 'In Stock',
    },
    {
        id: '6',
        category: 'Shoes',
        name: 'Pro Spike Shoes',
        price: '$99.99',
        description:
            'High-performance shoes for advanced players, offering superior traction and ankle support.',
        image: 'https://media.tenor.com/iNzmgPFOywUAAAAe/haikyuu-noya.png',
        stock: 'Out of Stock',
    },
    // Apparel Category
    {
        id: '7',
        category: 'Apparel',
        name: 'Team Jersey',
        price: '$49.99',
        description:
            'Breathable fabric, available in all sizes, designed for comfort during intense matches.',
        image:
            'https://e7.pngegg.com/pngimages/159/854/png-clipart-sports-volleyball-jersey-t-shirt-design-netball-bibs-all-7-thumbnail.png',
        stock: 'In Stock',
    },
    {
        id: '8',
        category: 'Apparel',
        name: 'Volleyball Shorts',
        price: '$29.99',
        description:
            'Flexible shorts with moisture-wicking technology, ideal for freedom of movement.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDFYKTGQg9Anyi2IOmPpAxclGEQmXAC646jA&s',
        stock: 'In Stock',
    },
    {
        id: '9',
        category: 'Apparel',
        name: 'Warm-Up Jacket',
        price: '$59.99',
        description:
            'Stylish jacket for pre-game warm-ups, with a lightweight design and team branding.',
        image: 'https://via.placeholder.com/150',
        stock: 'Out of Stock',
    },
    // Accessories Category
    {
        id: '10',
        category: 'Accessories',
        name: 'Knee Pads',
        price: '$19.99',
        description:
            'Protective knee pads for safe diving, with cushioned padding and adjustable straps.',
        image: 'https://via.placeholder.com/150',
        stock: 'In Stock',
    },
    {
        id: '11',
        category: 'Accessories',
        name: 'Ankle Supports',
        price: '$24.99',
        description:
            'Adjustable supports for ankle stability, designed to prevent injuries during play.',
        image: 'https://www.midwestvolleyball.com/store/sc_images/products/ASOBRACE.P2.jpg',
        stock: 'In Stock',
    },
    {
        id: '12',
        category: 'Accessories',
        name: 'Wrist Guards',
        price: '$14.99',
        description:
            'Lightweight guards for wrist protection, offering flexibility and comfort.',
        image: 'https://m.media-amazon.com/images/I/71Suaf0d9oL._AC_SL1500_.jpg',
        stock: 'Out of Stock',
    },
];

const ProductDetails = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const product = products.find((p) => p.id === id);

    const handleAddToCart = () => {
        Toast.show({
            type: 'success',
            text1: 'Produit ajouté',
            text2: `${product!.name} a été ajouté au panier 🛒`,
        });

        console.log(`Added ${product!.name} to cart`);
        // Add your cart logic here (e.g., update cart state, API call)
    };

    const handleRetry = () => {
        // Optionally refetch product or navigate back
        router.back();
    };

    if (!product) {
        return (
            <SafeAreaView style={styles.container}>
                <Animated.View entering={FadeInDown.duration(300)} style={styles.centered}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                        accessible
                        accessibilityLabel="Go back"
                    >
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.errorText}>Product not found</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={handleRetry}
                        accessible
                        accessibilityLabel="Retry"
                    >
                        <Text style={styles.retryButtonText}>Retry</Text>
                    </TouchableOpacity>
                </Animated.View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                    accessible
                    accessibilityLabel="Go back"
                >
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>

                <Animated.View entering={FadeIn.duration(500)} style={styles.card}>
                    <View style={styles.imageContainer}>
                        {product.image.startsWith('http') ? (
                            <Image
                                source={{ uri: product.image }}
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
                        <Text style={styles.category} accessible accessibilityLabel={`Category: ${product.category}`}>
                            {product.category}
                        </Text>
                        <Text style={styles.title} accessible accessibilityLabel={`Product: ${product.name}`}>
                            {product.name}
                        </Text>

                        <View style={styles.priceRow}>
                            <Text
                                style={styles.price}
                                accessible
                                accessibilityLabel={`Price: ${product.stock === 'In Stock' ? product.price : 'Sold Out'}`}
                            >
                                {product.stock === 'In Stock' ? product.price : 'Sold Out'}
                            </Text>
                            <View
                                style={[
                                    styles.stockContainer,
                                    { backgroundColor: product.stock === 'In Stock' ? '#10B981' : '#EF4444' },
                                ]}
                            >
                                <Text
                                    style={styles.stockText}
                                    accessible
                                    accessibilityLabel={`Stock: ${product.stock}`}
                                >
                                    {product.stock}
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.descriptionTitle}>Description</Text>
                        <Text
                            style={styles.description}
                            accessible
                            accessibilityLabel={`Description: ${product.description}`}
                        >
                            {product.description}
                        </Text>

                        <Animated.View
                            entering={FadeIn.duration(500).delay(200)}
                            sharedTransitionTag="add-to-cart"
                        >
                            <TouchableOpacity
                                style={[
                                    styles.addToCartButton,
                                    {
                                        backgroundColor: product.stock === 'In Stock' ? '#1e90ff' : '#6b7280',
                                        opacity: product.stock === 'In Stock' ? 1 : 0.6,
                                    },
                                ]}
                                onPress={() => product.stock === 'In Stock' && handleAddToCart()}
                                disabled={product.stock !== 'In Stock'}
                                activeOpacity={0.7}
                                accessible
                                accessibilityLabel="Add to cart"
                            >
                                <Ionicons
                                    name="cart-outline"
                                    size={24}
                                    color="#fff"
                                    style={{ marginRight: 8 }}
                                />
                                <Text style={styles.addToCartText}>Add to Cart</Text>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Animated.View>
            </ScrollView>
        </SafeAreaView>
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