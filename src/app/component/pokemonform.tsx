import React from 'react';

interface PokemonFormProps {
  pokemonName: string;
  setPokemonName: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const PokemonForm: React.FC<PokemonFormProps> = ({ pokemonName, setPokemonName, handleSubmit }) => {
  return (
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
  );
};

export default PokemonForm;
