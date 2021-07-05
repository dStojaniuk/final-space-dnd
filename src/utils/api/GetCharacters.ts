import { CharacterT } from '../../Types/Character/CharacterT';

export default async function GetCharacters(
  numberOfCharacters?: number
): Promise<CharacterT[]> {
  const characters = await fetch(
    `https://finalspaceapi.com/api/v0/character?limit=${
      numberOfCharacters || 5
    }`
  )
    .then((res) => res.json())
    .then((data) => data as CharacterT[]);

  return characters;
}
