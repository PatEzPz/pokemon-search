"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePokemonQuery } from "./query/pokemon";

const PokemonSearch: React.FC = () => {
  const router = useRouter();
  const [pokemonName, setPokemonName] = useState<string>("");
  const [pokemonData, setPokemonData] = useState<any>(null);
  const [getPokemon, { loading, error, data }] = usePokemonQuery();

  const fetchPokemonData = async (name: string) => {
    try {
      const response = await getPokemon({ variables: { name } });
      setPokemonData(response.data.pokemon);
    } catch (err) {
      console.error("Error fetching Pokémon data:", err);
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
    const name = query.get("name");

    if (name) {
      setPokemonName(name);
      fetchPokemonData(name);
    } else {
      setPokemonName("");
      setPokemonData(null);
    }
  };

  useEffect(() => {
    fetchPokemonFromURL();

    const handlePopState = () => {
      fetchPokemonFromURL();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [getPokemon]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
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
        {pokemonData && (
          <div>
            <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
              {pokemonData.name}
            </h2>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={pokemonData.image}
                alt={pokemonData.name}
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
                <h3 style={{ fontWeight: "bold", color: "gray" }}>
                  Information
                </h3>
                <p>ID: {pokemonData.id}</p>
                <p>Number: {pokemonData.number}</p>
                <p>
                  Weight: {pokemonData.weight.minimum} -{" "}
                  {pokemonData.weight.maximum}
                </p>
                <p>
                  Height: {pokemonData.height.minimum} -{" "}
                  {pokemonData.height.maximum}
                </p>
                <p>Classification: {pokemonData.classification}</p>
                <p>Types: {pokemonData.types.join(", ")}</p>
                <p>Resistant: {pokemonData.resistant.join(", ")}</p>
                <p>Weaknesses: {pokemonData.weaknesses.join(", ")}</p>
                <p>Flee Rate: {pokemonData.fleeRate}</p>
                <p>Max CP: {pokemonData.maxCP}</p>
                <p>Max HP: {pokemonData.maxHP}</p>
              </div>
              <div>
                <h3 style={{ fontWeight: "bold", color: "red" }}>Attacks</h3>
                <div>
                  <h4 style={{ fontWeight: "bold", color: "orange" }}>
                    Fast Attacks
                  </h4>
                  {pokemonData.attacks.fast.map((attack: any, index: number) => (
                    <p key={index}>
                      {attack.name} - Type: {attack.type} - Damage: {attack.damage}
                    </p>
                  ))}
                </div>
                <div>
                  <h4 style={{ fontWeight: "bold", color: "yellow" }}>
                    Special Attacks
                  </h4>
                  {pokemonData.attacks.special.map((attack: any, index: number) => (
                    <p key={index}>
                      {attack.name} - Type: {attack.type} - Damage: {attack.damage}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            {pokemonData.evolutions && (
              <div style={{ marginTop: "10px" }}>
                <h3 style={{ fontWeight: "bold", color: "pink" }}>Evolutions</h3>
                {pokemonData.evolutions.map((evolution: any, index: number) => (
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
    </Suspense>
  );
};

export default PokemonSearch;
