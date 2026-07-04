import { PokemonDetail, PokemonListItem } from "../types/Pokemon";


const BASE_URL = 'https://pokeapi.co/api/v2'

export async function getPokemon(limit = 151): Promise<PokemonListItem[]>{
        const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`)

        if (!response.ok) {
            throw new Error('Não foi possível carregar a lista de pokémons')
        }
    const data = await response.json()
    return data.results
}

export async function getPokemonDetail(name: string):
Promise<PokemonDetail>{
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`)

    if (!response.ok) {
        throw new Error('Pokémon não encontrado')
    }
    const data = await response.json()
    console.log(data)
    return {
        name: data.name,
        id: data.id,
        height: data.height,
        weight: data.weight,
        image:
        data.sprites.other?.['official-artwork']?.front_default ??
        data.sprites.front_default,
        types: data.types.map((item: any) => item.type.name),
        status: data.stats.map((status: any) => ({
            status_name: status.stat.name,
            status_value: status.base_stat
        }))
    }
}

export async function getPokemonsWithDetails(limit = 30):Promise<PokemonDetail[]>{
    const pokemons = await getPokemon(limit)
    const details = await Promise.all(pokemons.map((pokemon) => getPokemonDetail(pokemon.name)))
    return details
}