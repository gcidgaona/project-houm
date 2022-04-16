import { useEffect } from 'react';
import { Pokedex } from './Pokedex/Pokedex';

function App() {
  useEffect(() => {
    document. title = "PokeHoum"
  }, [])
  
  return (<Pokedex />);
}

export default App;
