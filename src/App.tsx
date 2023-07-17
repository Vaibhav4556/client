
import AsteroidRandom from "./pages/AsteroidRandom";
import AsteroidbyId from "./pages/AsteroidbyId";
import InputData from "./pages/InputData";

import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<InputData />} />
          <Route path="/asteroidInfo" element={<AsteroidbyId/>} />
          <Route path="/asteroidRandom" element={<AsteroidRandom />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
