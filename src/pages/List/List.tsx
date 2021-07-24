import { CharacterList } from '../../components/CharacterList/CharacterList';
import { CharacterT } from '../../utils/types/CharacterT';
import './List.css';

export const List = (props: ListProps) => {
  const { selectedCharacters, setSelectedCharacters } = props;
  return (
    <CharacterList
      selectedCharacters={selectedCharacters}
      setSelectedCharacters={setSelectedCharacters}
    />
  );
};

type ListProps = {
  selectedCharacters: CharacterT[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<CharacterT[]>>;
};
