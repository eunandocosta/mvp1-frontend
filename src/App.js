import './App.css';
import Header from './components/Header';
import Inserir from './components/Inserir';
import Produto from './components/Produto';

function App() {
  return (
    <div className="App">
      <Header/>
      <Inserir/>
      <Produto/>
    </div>
  );
}

export default App;
