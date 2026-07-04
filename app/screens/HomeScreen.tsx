import { useEffect, useMemo, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import ErrorMessage from '../../components/ui/ErrorMessage'
import Header from '../../components/ui/Header'
import Loading from '../../components/ui/Loading'
import PokemonCard from '../../components/ui/PokemonCard'
import SearchBar from '../../components/ui/SearchBar'

import { COLORS } from '@/src/constants/colors'
import { getPokemonsWithDetails } from '@/src/services/pokemonApi'
import { PokemonDetail } from '@/src/types/Pokemon'

export default function HomeScreen() {
    const [pokemons, setPokemons] = useState<PokemonDetail[]>([])
    const [search, setSearch] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const[error, setError] = useState('')

    async function loadPokemons() {
        try{
            setError('')
            const data = await getPokemonsWithDetails(1000)
            setPokemons(data)
        } catch(err){
            setError(`Verifique sua internet e tente novamente --> ${err}`)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadPokemons()
    }, [])

    const filteredPokemons = useMemo(()=>{
        return pokemons.filter((pokemon)=> 
        pokemon.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [pokemons, search])
    return (
        <SafeAreaView style={styles.SafeArea} edges={['left', 'right']}>
            <Header/>
            <SearchBar value={search} onChangeText={setSearch}/>
            {isLoading && <Loading/>}
            {!isLoading && error.length > 0 && (
                <ErrorMessage message={error} onTryAgain={loadPokemons}/>
            )}
            {!isLoading && error.length === 0 && (
                <FlatList
                data={filteredPokemons}
                keyExtractor={(item) => String(item.id)}
                /**
            renderItem define como cada item da lista será exibido. O FlatList percorre 
            o array filteredPokemons e, para cada Pokémon, renderiza um componente PokemonCard, passando os
            dados através da prop 'Pokémon'.
                */
                renderItem={({item})=> <PokemonCard pokemon={item}/>}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View style={styles.resultBox}>
                        <Text style={styles.resultText}>
                            {filteredPokemons.length} Pokémon(s) Encontrado(s)
                        </Text>
                    </View>
                }
                ListEmptyComponent={
                    <Text style={styles.emptyText}>
                        Nenhum Pokémon encontrado com esse nome
                    </Text>
                }
                />
            )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    SafeArea:{
        flex: 1,
        backgroundColor: COLORS.background
    },
    list:{
        paddingTop: 18,
        paddingBottom: 28
    },
    resultText:{
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700'
    },
    resultBox:{
    marginHorizontal: 20,
    marginBottom: 14
    },
    emptyText:{
    color: COLORS.white,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 15,
    fontWeight: '700'
    }
})