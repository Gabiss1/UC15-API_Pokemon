export type PokemonListItem ={
    name: string,
    url: string
}

export type PokemonDetail ={
    name: string,
    id: number,
    height: number,
    weight: number,
    image: string,
    types: string[],
    status: [{
        status_name: string,
        status_value: number
    }],
}