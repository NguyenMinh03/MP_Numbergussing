import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";

export default function App() {
  const [secretNumber, setSecretNumber] = useState(
    Math.floor(Math.random() * 100) + 1
  );
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");
  const [attempts, setAttempts] = useState(0);

  const handleGuess = () => {
    const numGuess = parseInt(guess);
    if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
      Alert.alert("Invalid Input", "Please enter a number between 1 and 100");
      return;
    }
    setAttempts(attempts + 1);
    if (numGuess === secretNumber) {
      Alert.alert(
        "Congratulations!",
        `You guessed the number is ${secretNumber} in ${attempts + 1} guesses`,
        [{ text: "OK", onPress: resetGame }]
      );
    } else if (numGuess < secretNumber) {
      setMessage(`Your guess ${numGuess} is too low`);
    } else {
      setMessage(`Your guess ${numGuess} is too high`);
    }
    setGuess("");
  };

  const resetGame = () => {
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setMessage("");
    setAttempts(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess a number between 1-100</Text>
      {message !== "" && <Text style={styles.message}>{message}</Text>}
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={guess}
        onChangeText={setGuess}
      />
      <Button title="MAKE GUESS" onPress={handleGuess} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
    color: "red",
  },
});
