"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePokemonQuery } from './query/pokemon'; // Adjust path if necessary

const PokemonSearch: React.FC = () => {
  const router = useRouter();
  const [pokemonName, setPokemonName] = useState('');
  const [getPokemon, { loading, error, data }] = usePokemonQuery();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pokemonName) {
      // Update URL query parameter
      router.push(`/?name=${pokemonName}`);
      // Perform the query
      await getPokemon({ variables: { name: pokemonName } });
    }
  };

  const handleEvolutionClick = (evolutionName: string) => {
    setPokemonName(evolutionName);
    router.push(`/?name=${evolutionName}`);
    // Perform the query after setting the evolution name
    getPokemon({ variables: { name: evolutionName } });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Pokémon Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokémon name"
          style={{ padding: '10px', fontSize: '16px', width: '200px', color: 'black' }}
        />
        <button
          type="submit"
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Submit
        </button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.pokemon && (
        <div>
          <h2>{data.pokemon.name}</h2>
          <img src={data.pokemon.image} alt={data.pokemon.name} />
          <p>ID: {data.pokemon.id}</p>
          <p>Number: {data.pokemon.number}</p>
          <p>Weight: {data.pokemon.weight.minimum} - {data.pokemon.weight.maximum}</p>
          <p>Height: {data.pokemon.height.minimum} - {data.pokemon.height.maximum}</p>
          <p>Classification: {data.pokemon.classification}</p>
          <p>Types: {data.pokemon.types.join(', ')}</p>
          <p>Resistant: {data.pokemon.resistant.join(', ')}</p>
          <p>Weaknesses: {data.pokemon.weaknesses.join(', ')}</p>
          <p>Flee Rate: {data.pokemon.fleeRate}</p>
          <p>Max CP: {data.pokemon.maxCP}</p>
          <p>Max HP: {data.pokemon.maxHP}</p>
          
          <h3>Attacks</h3>
          <div>
            <h4>Fast Attacks</h4>
            {data.pokemon.attacks.fast.map((attack: any, index: number) => (
              <p key={index}>
                {attack.name} - Type: {attack.type} - Damage: {attack.damage}
              </p>
            ))}
          </div>
          <div>
            <h4>Special Attacks</h4>
            {data.pokemon.attacks.special.map((attack: any, index: number) => (
              <p key={index}>
                {attack.name} - Type: {attack.type} - Damage: {attack.damage}
              </p>
            ))}
          </div>
          
          {data.pokemon.evolutions && (
            <div>
              <h3>Evolutions</h3>
              {data.pokemon.evolutions.map((evolution: any, index: number) => (
                <div key={index}>
                  <h4
                    onClick={() => handleEvolutionClick(evolution.name)}
                    style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                  >
                    {evolution.name}
                  </h4>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PokemonSearch;
