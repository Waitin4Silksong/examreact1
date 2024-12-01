import React, { useState, useEffect } from 'react';
import { View, Text, Image, Button, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  const addToFavorites = async () => {
    const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    if (!favorites.some((item) => item.id === id)) {
      favorites.push(product);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Image source={{ uri: product.image }} style={styles.image} />
          <Text style={styles.title}>{product.title}</Text>
          <Text>{product.description}</Text>
          <Text>{product.price} грн</Text>
          <Button title="Додати до улюблених" onPress={addToFavorites} />
          <Button title="Назад" onPress={() => navigation.goBack()} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f8e9',
      padding: 20,
    },
    searchInput: {
      backgroundColor: '#f5f5f5',
      borderColor: '#8d6e63',
      borderWidth: 1,
      borderRadius: 20,
      padding: 10,
      marginBottom: 15,
    },
    productItem: {
      backgroundColor: '#dcedc8',
      borderRadius: 20,
      padding: 10,
      marginBottom: 15,
      flexDirection: 'row',
      alignItems: 'center',
    },
    productImage: {
      width: 60,
      height: 60,
      borderRadius: 10,
    },
    productName: {
      fontSize: 16,
      color: '#33691e',
    },
    productPrice: {
      fontSize: 14,
      color: '#558b2f',
    },
    viewButton: {
      backgroundColor: '#8d6e63',
      padding: 10,
      borderRadius: 20,
      marginTop: 5,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
    },
  });
  

export default DetailsScreen;
