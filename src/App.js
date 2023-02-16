import './App.css';
import ChatBot from './ChatBot';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={process.env.PUBLIC_URL + '/mslogo.png'}  className="App-logo" alt="logo" />
      </header>
      <ChatBot />
    </div>
  );
}

export default App;
