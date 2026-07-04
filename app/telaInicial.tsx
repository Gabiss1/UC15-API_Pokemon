// Importa o Hook useContext.
// Ele permite acessar informações compartilhadas por vários componentes.
import { useContext } from 'react'



// Importa componentes visuais do React Native.
import { Pressable, Text, TextInput, View } from 'react-native'

// Hook responsável pela navegação entre as telas.
import { useRouter } from 'expo-router'

// Importa o Context criado anteriormente.
// É nele que estão armazenados o nome e a função que altera o nome.
// evite
import { UserContext } from '@/src/contexts/UserContext'

// Componente principal da tela inicial.
export default function TelaInicial() {

  // Cria o objeto responsável por navegar entre as telas.
  const router = useRouter()

  // Acessa os dados compartilhados pelo Context.
  //
  // name -> guarda o nome digitado.
  // setName -> altera o valor do nome.
  //
  // Esses dados podem ser utilizados em qualquer tela que use
  // o mesmo UserContext.
  const { name, setName } = useContext(UserContext)

  return (

    // View principal da tela.
    // Ela funciona como uma "caixa" que organiza os componentes.
    <View
      style={{
        flex: 1,                  // Ocupa toda a altura da tela
        backgroundColor: '#F5F5F5', // Fundo cinza bem claro
        padding: 24,              // Espaço interno
        gap: 16                   // Espaço entre os componentes
      }}
    >

      {/* Texto explicando o que o usuário deve fazer */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333'
        }}
      >
        Digite seu nome
      </Text>

      {/* Campo onde o usuário digita seu nome */}
      <TextInput

        // Mostra o valor que está salvo no Context.
        value={name}

        // Sempre que o usuário digita alguma letra,
        // o Context é atualizado automaticamente.
        //
        // Exemplo:
        // Digita "A"
        // name = "A"
        //
        // Digita "Ana"
        // name = "Ana"
        onChangeText={setName}

        // Texto exibido enquanto nada foi digitado.
        placeholder="Ex: Ana"

        style={{
          backgroundColor: '#FFFFFF', // Fundo branco
          borderWidth: 1,             // Espessura da borda
          borderColor: '#CCC',        // Cor da borda
          borderRadius: 8,            // Cantos arredondados
          padding: 12                 // Espaço interno
        }}
      />

      {/* Botão */}
      <Pressable

        // Quando o usuário tocar no botão...
        onPress={() =>

          // ...o Expo Router abrirá a tela Perfil.
          router.push('/perfil')
        }

        style={{
          backgroundColor: '#904141',
          padding: 14,
          borderRadius: 8
        }}
      >

        {/* Texto exibido dentro do botão */}
        <Text
          style={{
            color: '#FFF',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          Ir para perfil
        </Text>

      </Pressable>

    </View>
  )
}