import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

const ListScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      });
  }, [category]);

  const handleSearch = (text) => {
    setSearch(text);
    setFilteredProducts(
      products.filter((product) => product.title.toLowerCase().includes(text.toLowerCase()))
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Пошук товарів"
        value={search}
        onChangeText={handleSearch}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#8d6e63" />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.title}</Text>
                <Text style={styles.productPrice}>{item.price} грн</Text>
                <TouchableOpacity
                  style={styles.viewButton}
                  onPress={() => navigation.navigate('Details', { id: item.id })}
                >
                  <Text style={styles.buttonText}>Переглянути</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
    width: 200,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ListScreen;
