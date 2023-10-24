import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [pokemon, setPokemon] = useState('');
  const [respostaUsuario, setRespostaUsuario] = useState('...');
  var pergunta = "Qual o nome do pokemon?";

  function pegarImagemPokemon() {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((response) => { return response.json() })
      .then(json => { setPokemon(json.sprites.front_default) })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Pokemon</Text>

      <Image
        source={{ uri: pokemon, }}
        style={styles.image}
      />

      <Text style={styles.input}>{pergunta}</Text>

      <TextInput
        value={respostaUsuario}
        onChangeText={setRespostaUsuario}
        style={styles.input}
      />

      <TouchableOpacity>
        <Text style={styles.button}>Responder</Text>
      </TouchableOpacity>

      <View style={styles.viewInLine}>

        <View style={styles.viewCentralizada}>
          <Text style={styles.tituloAcertoEErros}>Erros</Text>
          <View style={styles.erros}>
            <Text style={viewCentralizada}>1</Text>
          </View>
        </View>

        <View style={styles.viewCentralizada}>
          <Text style={styles.tituloAcertoEErros}>Acertos</Text>
          <Text style={styles.acertos}>1</Text>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CCCCCC',
    alignItems: 'center',
    justifyContent: 'center',
    width: 360,
    height: 640
  },
  viewInLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 360
  },
  viewCentralizada: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold'
  },
  input: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#D9D9D9',
    marginTop: 10,
    width: 310,
    height: 44,
    textAlign: 'justify',
    borderRadius: 10
  },
  button: {
    backgroundColor: '#EC770C',
    width: 160,
    height: 44,
    marginTop: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    borderRadius: 10
  },
  image: {
    width: 254,
    height: 254,
    borderWidth: 5
  },
  tituloAcertoEErros: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  erros: {
    backgroundColor: '#DA0A0A',
    width: 66,
    height: 66,
    justifyContent: 'center',
    alignItems: 'center',

  },
  acertos: {
    backgroundColor: '#25C33F',
    width: 66,
    height: 66,
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textCentralizado: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});