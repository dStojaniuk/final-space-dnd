import { CharacterList } from '../../components/CharacterList/CharacterList';
import { ResetButton } from '../../components/ResetButton/ResetButton';
import { CharacterT } from '../../utils/types/CharacterT';
import './List.css';

export const List = (props: ListProps) => {
  const { selectedCharacters, setSelectedCharacters, fetchedCharacters } =
    props;

  const handleListReset = () => {
    setSelectedCharacters(fetchedCharacters);
  };

  return (
    <>
      <CharacterList
        selectedCharacters={selectedCharacters}
        setSelectedCharacters={setSelectedCharacters}
      />
      <ResetButton onClickEvent={handleListReset} />
    </>
  );
};

type ListProps = {
  fetchedCharacters: CharacterT[];
  selectedCharacters: CharacterT[];
  setSelectedCharacters: React.Dispatch<React.SetStateAction<CharacterT[]>>;
};
