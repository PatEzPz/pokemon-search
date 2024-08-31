"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { usePokemonQuery } from "./query/pokemon"; // Adjust path if necessary

const PokemonSearch: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pokemonName, setPokemonName] = useState("");
  const [getPokemon, { loading, error, data }] = usePokemonQuery();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pokemonName) {
      // Update URL query parameter
      router.push(`/?name=${pokemonName}`);
    }
  };

  const handleEvolutionClick = (evolutionName: string) => {
    setPokemonName(evolutionName);
    router.push(`/?name=${evolutionName}`);
  };

  useEffect(() => {
    // Get the current query parameter from the URL
    const name = searchParams.get("name");

    if (name) {
      setPokemonName(name);
      getPokemon({ variables: { name } });
    }
  }, [searchParams]); // Re-run this effect when the query parameters change

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <h1>Pokémon Search</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={pokemonName}
            onChange={(e) => setPokemonName(e.target.value)}
            placeholder="Enter Pokémon name"
            style={{
              padding: "10px",
              fontSize: "16px",
              width: "200px",
              color: "black",
              borderRadius: "15px",
            }}
          />
          <button
            type="submit"
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              borderRadius: "15px",
              borderBlockColor: "white",
              border: "2px solid",
            }}
          >
            Submit
          </button>
        </form>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.pokemon && (
        <div>
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
            {data.pokemon.name}
          </h2>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={data.pokemon.image}
              alt={data.pokemon.name}
              style={{ borderRadius: "15px" }}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
              marginTop: "10px",
            }}
          >
            <div style={{ marginRight: "10px" }}>
              <h3 style={{ fontWeight: "bold", color: "gray" }}>Information</h3>
              <p>ID: {data.pokemon.id}</p>
              <p>Number: {data.pokemon.number}</p>
              <p>
                Weight: {data.pokemon.weight.minimum} -{" "}
                {data.pokemon.weight.maximum}
              </p>
              <p>
                Height: {data.pokemon.height.minimum} -{" "}
                {data.pokemon.height.maximum}
              </p>
              <p>Classification: {data.pokemon.classification}</p>
              <p>Types: {data.pokemon.types.join(", ")}</p>
              <p>Resistant: {data.pokemon.resistant.join(", ")}</p>
              <p>Weaknesses: {data.pokemon.weaknesses.join(", ")}</p>
              <p>Flee Rate: {data.pokemon.fleeRate}</p>
              <p>Max CP: {data.pokemon.maxCP}</p>
              <p>Max HP: {data.pokemon.maxHP}</p>
            </div>
            <div>
              <h3 style={{ fontWeight: "bold", color: "red" }}>Attacks</h3>
              <div>
                <h4 style={{ fontWeight: "bold", color: "orange" }}>
                  Fast Attacks
                </h4>
                {data.pokemon.attacks.fast.map((attack: any, index: number) => (
                  <p key={index}>
                    {attack.name} - Type: {attack.type} - Damage:{" "}
                    {attack.damage}
                  </p>
                ))}
              </div>
              <div>
                <h4 style={{ fontWeight: "bold", color: "yellow" }}>
                  Special Attacks
                </h4>
                {data.pokemon.attacks.special.map(
                  (attack: any, index: number) => (
                    <p key={index}>
                      {attack.name} - Type: {attack.type} - Damage:{" "}
                      {attack.damage}
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
          {data.pokemon.evolutions && (
            <div style={{ marginTop: "10px" }}>
              <h3 style={{ fontWeight: "bold", color: "pink" }}>Evolutions</h3>
              {data.pokemon.evolutions.map((evolution: any, index: number) => (
                <div key={index}>
                  <h4
                    onClick={() => handleEvolutionClick(evolution.name)}
                    style={{
                      cursor: "pointer",
                      color: "blue",
                      textDecoration: "underline",
                      display: "inline-block",
                    }}
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
