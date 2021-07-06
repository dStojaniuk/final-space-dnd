export type CharacterT = {
  id: number; // The id of the character (starting from 1).
  name: string; //	The name of the character.
  status: string; //	The status of the character.
  species: string; //	The species of the character.
  gender: string; //	The gender of the character.
  hair: string; //	The hair color of the character.
  origin: object; //	Name of the character's origin location.
  abilities: string[]; //	Different abilities of character.
  alias: string[]; //	Different names of character.
  img_url: string; //	Link to the character's image. (300x300).
};
