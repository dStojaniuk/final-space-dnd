import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import { List } from '../pages/List/List';
import { ListBuilder } from '../pages/ListBuilder/ListBuilder';
import GetCharacters from '../utils/api/GetCharacters';
import { CharacterT } from '../utils/types/CharacterT';
import Navbar from '../components/Navbar/Navbar';
import './Routes.css';

export default function Routes() {
  const [fetchedCharacters, setFetchedCharacters] = useState<CharacterT[]>([]);
  const [listCharacters, setListCharacters] = useState<CharacterT[]>([]);
  const [listBuilderCharacters, setListBuilderCharacters] = useState<
    CharacterT[]
  >([]);

  useEffect(() => {
    (async () => {
      const fetchedCharacters = await GetCharacters();
      setFetchedCharacters(fetchedCharacters);
      setListCharacters(fetchedCharacters);
    })();
  }, []);

  return (
    <div className="router">
      <Router>
        <Navbar />
        <div className="routes">
          <Switch>
            <Route path="/list">
              <List
                fetchedCharacters={fetchedCharacters}
                selectedCharacters={listCharacters}
                setSelectedCharacters={setListCharacters}
              />
            </Route>
            <Route path="/list-builder">
              <ListBuilder
                toolbarListCharacters={fetchedCharacters}
                selectedCharacters={listBuilderCharacters}
                setSelectedCharacters={setListBuilderCharacters}
              />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}
