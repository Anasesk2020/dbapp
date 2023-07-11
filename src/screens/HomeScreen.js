import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function HomeScreen({ navigation }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    axios.get('http://10.0.2.2:3000/messages')
      .then(response => {
        if (response.data.success) {
          setMessages(response.data.messages);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const saveRating = (user, rating) => {
    const updatedMessages = messages.map(item => {
      if (item.user === user) {
        return {
          ...item,
          rating: rating,
        };
      }
      return item;
    });
    AsyncStorage.setItem('messages', JSON.stringify(updatedMessages))
      .then(() => {
        setMessages(updatedMessages);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
      </View>
      <Text style={styles.subText}>Messages:</Text>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Text>{item.message}</Text>
            <Text>{item.user}</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(rating => (
                <TouchableOpacity
                  key={rating}
                  style={styles.ratingButton}
                  onPress={() => saveRating(item.user, rating)}
                >
                  <Text style={styles.ratingButtonText}>{rating}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeContainer: {
    marginBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  messageContainer: {
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  ratingButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 50,
  },
  ratingButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
