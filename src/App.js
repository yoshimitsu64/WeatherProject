import { Route, Routes } from 'react-router-dom';
import Background from './Components/Background';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Background />} />
      </Routes>
    </div>
  );
}

export default App;
