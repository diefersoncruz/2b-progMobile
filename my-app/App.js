import { StatusBar } from 'expo-status-bar';
import { StyleSheet, TextInput, View, Image, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [pokemon, setPokemon] = useState('');
  const [textoUsuario, setTextoUsuario] = useState('');

  function pegarImagemPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon/" + textoUsuario)
      .then((response) => { return response.json() })
      .then(json => { setPokemon(json.sprites.front_default) })
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemon }} style={styles.imagem} />
      <Button title='Pesquisar' onPress={pegarImagemPokemon} />
      <TextInput value={textoUsuario} onChangeText={setTextoUsuario} style={styles.input} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 5,
    backgroundColor: 'gray',
    fontSize: 16,
    color: 'white',
    fontSize: 26,
    fontWeight: 10
  },
  imagem: {
    width: 100,
    height: 100
  }
});