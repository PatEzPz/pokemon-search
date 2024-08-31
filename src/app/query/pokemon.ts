import { gql } from '@apollo/client';
import client from '../api/apollo-client';
import { useLazyQuery } from '@apollo/client';

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        name
      }
    }
  }
`;

export const usePokemonQuery = () => {
  return useLazyQuery(GET_POKEMON, { 
    client,
    fetchPolicy: 'cache-and-network'
   });
};
