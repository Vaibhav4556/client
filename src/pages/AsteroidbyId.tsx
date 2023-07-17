import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/AsteroidbyId.css";
import Loading from "../component/Loading";
interface AsteroidData {
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
}

function AsteroidbyId() {
  let location = useLocation();
  let asteroidId = location.state.input;
  let idarray = location.state.valus;
  //   console.log(idarray);

  const [data, setData] = useState<AsteroidData | null>(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get<any>(
          `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=NCqqqHjs2B6uPEgsuzkxtaDccnIXQXTEYLAed4Dg`
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountryData();
  }, [asteroidId]);

  return (
    <div className="container">
        <h1>Asteroid Information ID:{asteroidId}</h1>
      {(idarray && idarray.includes(asteroidId)) || asteroidId == 3542519 ? (
        <div>
          {data && data ? (
            <div className="card">
              <div className="carddata">
                <p>
                  {" "}
                  <span>Asteroid Name : </span>
                  {data?.name}
                </p>
                <p>
                  <span> Asteroid URL</span>
                  {data?.nasa_jpl_url}
                </p>
                <p>
                  <span> Is Asteroid Hazardous: </span>
                  {data.is_potentially_hazardous_asteroid.toString()}
                </p>
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      ) : (
        <p className="invalidmsg"> ID is Invalid</p>
      )}
    </div>
  );
}

export default AsteroidbyId;
