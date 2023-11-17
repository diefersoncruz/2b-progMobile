import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {
  var pergunta = "Qual o nome do pokemon?";
  const [respostaUsuario, setRespostaUsuario] = useState('');
  const [pokemonImage, setPokemonImage] = useState('');
  const [pokemonName, setPokemonName] = useState('');
  const [qtdErros, setErros] = useState(0);
  const [qtdAcertos, setAcertos] = useState(0);

  // Função que busca os dados do pokemon a partir do ID enviado por parâmetro
  function geraDadosPokemon(pokemonId) {
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonId)
      .then((response) => { return response.json() })
      .then(json => {
        setPokemonImage(json.sprites.other["official-artwork"].front_default) // armazena o endereço da imagem na variável pokemonImage
        setPokemonName(json.name) // armazena o nome do pokemon na variável pokemonName
      })
  }

  // Gera um número inteiro aleatório dentro de um limite especificado
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Função que gera um pokemon aleatório
  function geraPokemonAleatorio() {
    let numeroAleatorio = getRandomInt(1, 150) // chama a função getRandomInt para gerar um numero aleatório entre 1 e 150
    geraDadosPokemon(numeroAleatorio) // chama a função gerarDadosPokemon passando o número aleatório gerado na função anterior
  }

  // Função para validar a resposta que o usuário digitou
  function validaResposta() {
    if (respostaUsuario == pokemonName) { // compara se o nome do pokemon retornado pela API é igual ao nome digitado pelo usuário
      setAcertos(qtdAcertos + 1) // incrementa a variável qtdAcertos caso a resposta esteja correta
    } else {
      setErros(qtdErros + 1) // incrementa a varáivel qtdErros caso a resposta esteja errada
    }
    geraPokemonAleatorio() // chama a função geraPokemonAleatorio para gerar um novo pokemon
  }

  // Adicionando useEffect para executar geraPokemonAleatorio ao carregar a aplicação
  useEffect(() => {
    geraPokemonAleatorio();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz</Text>

      <Image
        source={{ uri: pokemonImage, }} // passa o conteúdo da variável pokemonImage na propriedade URI
        style={styles.image}
      />

      <Text style={styles.input}>{pergunta}</Text>

      <TextInput
        value={respostaUsuario} // apresenta na tela o conteúdo da variável respostaUsuario que contem o texto digitado pelo usuário
        onChangeText={setRespostaUsuario} // armazena o texto digitado pelo usuário na variável respostaUsuario
        style={styles.input}
      />

      <TouchableOpacity onPress={validaResposta}>
        <Text style={styles.button}>Responder</Text>
      </TouchableOpacity>

      <View style={styles.viewInLine}>

        <View style={styles.viewCentralizada}>
          <Text style={styles.tituloAcertoEErros}>Erros</Text>
          <Text style={styles.erros}>{qtdErros}</Text>
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