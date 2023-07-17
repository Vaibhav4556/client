import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/InputData.css";

const InputData: React.FC<any> = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
 const [astId, setAstId] = useState(null);
  const [randomData, setRandomdata] = useState<any>([]);

  useEffect(() => {
    {
      axios
        .get(
          "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=NCqqqHjs2B6uPEgsuzkxtaDccnIXQXTEYLAed4Dg"
        )
        .then((res) => setRandomdata(res.data.near_earth_objects))
        .catch((err) => console.log(err));
    }
  }, []);

  let valus: any = randomData.map((item: any) => item.id);
  useEffect(() => {
    let valus: any = randomData.map((item: any) => item.id);
    const random = Math.floor(Math.random() * valus.length);
    setAstId(valus[random]);
  }, [randomData]);


  const handleSubmit = (e: any) => {
    e.preventDefault();

    navigate("/asteroidInfo", { state: { input, valus } });
  };

  const randomClick = () => {
    if(astId && astId)
    navigate("/asteroidRandom", {state:{astId}});
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
      <button type="submit" onClick={randomClick}>
        Random Asteroid
      </button>
      </div>
    </div>
  );
};

export default InputData;
