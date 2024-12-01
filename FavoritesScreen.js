import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FavoritesScreen = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => {
    const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  };

  useEffect(() => {
    const focusListener = navigation.addListener('focus', loadFavorites);
    return focusListener;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>{item.price} грн</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Немає улюблених товарів</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8e9',
    padding: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcedc8',
    padding: 15,
    borderRadius: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#33691e',
  },
  price: {
    fontSize: 16,
    color: '#558b2f',
    marginTop: 5,
  },
  separator: {
    height: 15,
  },
  emptyMessage: {
    fontSize: 18,
    color: '#9e9e9e',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FavoritesScreen;
