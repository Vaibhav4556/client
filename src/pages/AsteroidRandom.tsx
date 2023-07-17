import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../component/Loading";

interface AsteroidData {
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
}

function AsteroidRandom() {
  const location = useLocation();
  console.log(location);
  let astId: any = location.state?.astId;
  const [astdata, setAstdata] = useState<AsteroidData | null>(null);

  useEffect(() => {
    const fetchAsteroidData = async () => {
      try {
        if (astId) {
          const response = await axios.get<any>(
            `https://api.nasa.gov/neo/rest/v1/neo/${astId}?api_key=NCqqqHjs2B6uPEgsuzkxtaDccnIXQXTEYLAed4Dg`
          );
          setAstdata(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAsteroidData();
  }, [astId]);

  return (
    <div>
      <h1>Random Asteroid Information</h1>
      <div>
        {astdata ? (
          <div className="card">
            <div className="carddata">
              <p>
                <span>Asteroid Name:</span> {astdata.name}
              </p>
              <p>
                <span>Asteroid URL:</span> {astdata.nasa_jpl_url}
              </p>
              <p>
                <span>Is Asteroid Hazardous:</span> {astdata.is_potentially_hazardous_asteroid.toString()}
              </p>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default AsteroidRandom;
