// Importa o Hook useContext.
// Ele permite acessar informações compartilhadas pelo Context,
// como o nome do usuário.
import { useContext } from 'react'

// Importa componentes visuais do React Native.
import { Pressable, Text, View } from 'react-native'

// Hook responsável pela navegação entre as telas.
import { useRouter } from 'expo-router'

// Importa o Context onde está armazenado o nome do usuário.
import { UserContext } from '@/src/contexts/UserContext'

// Componente da tela Perfil.
export default function Perfil() {

  // Cria o objeto responsável pela navegação.
  const router = useRouter()

  // Obtém o nome armazenado no Context.
  //
  // Como essa tela utiliza o mesmo UserContext da tela inicial,
  // ela consegue acessar o nome digitado anteriormente.
  const { name } = useContext(UserContext)

  return (

    // Container principal da tela.
    <View
      style={{
        flex: 1,                    // Ocupa toda a tela
        backgroundColor: '#F5F5F5', // Fundo cinza claro
        padding: 24,                // Espaçamento interno
        gap: 16                     // Espaço entre os componentes
      }}
    >

      {/* Título da tela */}
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold'
        }}
      >
        Perfil
      </Text>

      {/* Exibe o nome armazenado no Context */}
      <Text
        style={{
          fontSize: 18
        }}
      >
        Nome do usuário: {name}
      </Text>

      {/* Botão para retornar à tela anterior */}
      <Pressable

        // Quando o botão for pressionado...
        onPress={() =>

          // ...o Expo Router volta para a tela anterior.
          router.back()
        }

        style={{
          backgroundColor: '#222',
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
          Voltar
        </Text>

      </Pressable>

    </View>
  )
}