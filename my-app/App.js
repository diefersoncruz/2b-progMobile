import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  var pergunta = "Qual o nome do pokemon?";
  const [respostaUsuario, setRespostaUsuario] = useState('');
  const [pokemonImage, setPokemonImage] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [qtdErros, setErros] = useState(0);
  const [qtdAcertos, setAcertos] = useState(0);
  var respostaCorreta;
  var respostaErrada;

  function geraDadosPokemon(pokemonId) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
      .then((response) => { return response.json() })
      .then(json => {
        setPokemonImage(json.sprites.other["official-artwork"].front_default)
        setPokemonName(json.name)
      })
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  function geraPokemonAleatorio() {
    let numeroAleatorio = getRandomInt(1, 150)
    geraDadosPokemon(numeroAleatorio)
  }

  function validaResposta() {
    if (respostaUsuario == pokemonName) {
      setAcertos(qtdAcertos + 1)
    } else {
      setErros(qtdErros + 1)
    }
    geraPokemonAleatorio()
  }

  // Adicionando useEffect para executar geraPokemonAleatorio ao carregar a aplicação
  useEffect(() => {
    geraPokemonAleatorio();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Pokemon</Text>

      <Image
        source={{ uri: pokemonImage, }}
        style={styles.image}
      />

      <Text style={styles.input}>{pergunta}</Text>

      <TextInput
        value={respostaUsuario}
        onChangeText={setRespostaUsuario}
        style={styles.input}
      />

      <TouchableOpacity onPress={validaResposta}>
        <Text style={styles.button}>Responder</Text>
      </TouchableOpacity>

      <View style={styles.viewInLine}>

        <View style={styles.viewCentralizada}>
          <Text style={styles.tituloAcertoEErros}>Erros</Text>
          <View style={styles.viewCentralizada}>
            <Text style={styles.erros}>{qtdErros}</Text>
          </View>
        </View>

        <View style={styles.viewCentralizada}>
          <Text style={styles.tituloAcertoEErros}>Acertos</Text>
          <Text style={styles.acertos}>{qtdAcertos}</Text>
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
    textAlign: 'center',
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',

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