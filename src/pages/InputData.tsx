import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/InputData.css";

const InputData: React.FC<any> = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const [astId, setAstId] = useState<string | null>(null);
  const [randomData, setRandomdata] = useState<any[]>([]);

  useEffect(() => {
    const fetchRandomData = async () => {
      try {
        const response = await axios.get(
          "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=NCqqqHjs2B6uPEgsuzkxtaDccnIXQXTEYLAed4Dg"
        );
        setRandomdata(response.data?.near_earth_objects || []);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRandomData();
  }, []);

  useEffect(() => {
    if (randomData.length > 0) {
      const randomIndex = Math.floor(Math.random() * randomData.length);
      setAstId(randomData[randomIndex].id);
    }
  }, [randomData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/asteroidInfo", { state: { input, valus: randomData.map((item) => item.id) } });
  };

  const randomClick = () => {
    if (astId) {
      navigate("/asteroidRandom", { state: { astId } });
    }
  };

  return (
    <div className="inputdata">
      <div className="formcontainer">
        <form className="formdata" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Asteroid ID"
          />
          <button type="submit" disabled={input === ""}>
            Submit
          </button>
        </form>
        <button type="button" onClick={randomClick}>
          Random Asteroid
        </button>
      </div>
    </div>
  );
};

export default InputData;
