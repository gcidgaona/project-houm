import { useEffect, useState } from 'react';
import { IntroScreen } from './components/IntroScreen';
import { Pokedex } from './Pokedex/Pokedex';

function App() {

  const [shouldShowPokedex, setShouldShowPokedex] = useState(false)

  useEffect(() => {
    document.title = "PokeHoum"
    setTimeout(() => {
      setShouldShowPokedex(true)
    }, 3000);
  }, [])
  
  if(!shouldShowPokedex) return <IntroScreen />
  return (  
      <Pokedex />
  );
}

export default App;
