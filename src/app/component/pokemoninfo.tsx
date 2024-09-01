import React from 'react';

interface PokemonInfoProps {
  pokemonData: any;
  handleEvolutionClick: (evolutionName: string) => void;
}

const PokemonInfo: React.FC<PokemonInfoProps> = ({ pokemonData, handleEvolutionClick }) => {
  return (
    <div>
      <h2 style={{ textAlign: "center", marginBottom: "10px" }}>{pokemonData.name}</h2>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <img
          src={pokemonData.image}
          alt={pokemonData.name}
          style={{ borderRadius: "15px" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "row", marginTop: "10px" }}>
        <div style={{ marginRight: "10px" }}>
          <h3 style={{ fontWeight: "bold", color: "gray" }}>Information</h3>
          <p>ID: {pokemonData.id}</p>
          <p>Number: {pokemonData.number}</p>
          <p>Weight: {pokemonData.weight.minimum} - {pokemonData.weight.maximum}</p>
          <p>Height: {pokemonData.height.minimum} - {pokemonData.height.maximum}</p>
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
            <h4 style={{ fontWeight: "bold", color: "orange" }}>Fast Attacks</h4>
            {pokemonData.attacks.fast.map((attack: any, index: number) => (
              <p key={index}>{attack.name} - Type: {attack.type} - Damage: {attack.damage}</p>
            ))}
          </div>
          <div>
            <h4 style={{ fontWeight: "bold", color: "yellow" }}>Special Attacks</h4>
            {pokemonData.attacks.special.map((attack: any, index: number) => (
              <p key={index}>{attack.name} - Type: {attack.type} - Damage: {attack.damage}</p>
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
  );
};

export default PokemonInfo;
