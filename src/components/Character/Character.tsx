import { CharacterT } from '../../utils/types/CharacterT';
import './Character.css';

type CharacterProps = {
  character: CharacterT;
  className?: string;
};

export const Character = (props: CharacterProps) => {
  const {
    character: { name, img_url }, className
  } = props;
  return (
    <div className={`character ${className}` }>
      <img src={img_url} alt={name} />
      <div>{name}</div>
    </div>
  );
};
