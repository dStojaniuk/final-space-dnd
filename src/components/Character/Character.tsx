import { CharacterT } from '../../Types/Character/Character';
import './Character.css';

type CharacterProps = {
  character: CharacterT;
};

export const Character = (props: CharacterProps) => {
  const { name, img_url } = props.character;
  return (
    <div className="character">
      <img src={img_url} alt={name} />
      <div>{name}</div>
    </div>
  );
};
