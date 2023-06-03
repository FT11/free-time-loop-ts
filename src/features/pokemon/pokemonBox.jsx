import React from 'react';
import styles from '../counter/Counter.module.css';
import { useGetBerryByNameQuery, useGetPokemonByNameQuery } from '../../services/pokemon';

function PokemonBox(props) {
    const { count } = props;

    const pokemonList = ['pichu', 'pikachu', 'raichu', 'charmander', 'charmeleon', 'charizard', 'bulbasaur'];
    const berryList = ['spicy', 'sweet', 'spicy', 'sweet', 'spicy', 'sweet'];

    const { data: pokemonData, error: pokemonError, isLoading: pokemonIsLoading, refetch: refetchPokemonData } = useGetPokemonByNameQuery(pokemonList[count] || 'pikachu');
    const { data: berryData, error: berryError, isLoading: berryIsLoading, refetch: refetchBerryData } = useGetBerryByNameQuery(berryList[count] || 'spicy');

    console.log(`${pokemonList[count]}`, pokemonData);
    console.log(`${berryList[count]}`, berryData);

    return (
        <>
            {pokemonError ? (
                <>Oh no, there was an error</>
            ) : pokemonIsLoading ? (
                <>Loading...</>
            ) : pokemonData ? (
                <>
                    <button
                        className={styles.button}
                        aria-label="pokemon-refresh"
                        onClick={() => refetchPokemonData()}
                    >
                        Refresh Pokemon Data
                    </button>
                    <h2>{pokemonData.species.name}</h2>
                    <img src={pokemonData.sprites.front_shiny} alt={pokemonData.species.name} />
                </>
            ) : <></>}

            {berryError ? (
                <>Oh no, there was an error</>
            ) : berryIsLoading ? (
                <>Loading...</>
            ) : berryData ? (
                <>
                    <br />
                    <button
                        className={styles.button}
                        aria-label="berry-refresh"
                        onClick={() => refetchBerryData()}
                    >
                        Refresh Berry Data
                    </button>
                    <h3>{berryData?.name} berries</h3>
                    <ul>{berryData?.berries.map(item => (<li>{item?.berry?.name}</li>))}</ul>
                </>
            ) : <></>}
        </>
    );
}

export default PokemonBox;
