"use client";

import React, { Suspense, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePokemonQuery } from './query/pokemon';
import PokemonForm from './component/pokemonform';
import PokemonInfo from './component/pokemoninfo';

const PokemonSearch: React.FC = () => {
  const router = useRouter();
  const [pokemonName, setPokemonName] = useState<string>('');
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [getPokemon, { loading, error }] = usePokemonQuery();

  const fetchPokemonData = async (name: string) => {
    try {
      const response = await getPokemon({ variables: { name } });
      setPokemonData(response.data.pokemon);
    } catch (err) {
      console.error('Error fetching Pokémon data:', err);
      setPokemonData(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pokemonName) {
      router.push(`/?name=${pokemonName}`);
      await fetchPokemonData(pokemonName);
    }
  };

  const handleEvolutionClick = async (evolutionName: string) => {
    setPokemonName(evolutionName);
    router.push(`/?name=${evolutionName}`);
    await fetchPokemonData(evolutionName);
  };

  const fetchPokemonFromURL = () => {
    const query = new URLSearchParams(window.location.search);
    const name = query.get('name');

    if (name) {
      setPokemonName(name);
      fetchPokemonData(name);
    } else {
      setPokemonName('');
      setPokemonData(null);
    }
  };

  useEffect(() => {
    fetchPokemonFromURL();

    const handlePopState = () => {
      fetchPokemonFromURL();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [getPokemon]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '50px',
          marginBottom: '50px',
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <h1>Pokémon Search</h1>
          <PokemonForm
            pokemonName={pokemonName}
            setPokemonName={setPokemonName}
            handleSubmit={handleSubmit}
          />
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {pokemonData && (
          <PokemonInfo
            pokemonData={pokemonData}
            handleEvolutionClick={handleEvolutionClick}
          />
        )}
      </div>
    </Suspense>
  );
};

export default PokemonSearch;
