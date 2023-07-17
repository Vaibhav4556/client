import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loading from "../component/Loading";

// interface randomdata {
//   near_earth_objects: any;
// }
interface AsteroidData {
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
}

function AsteroidRandom() {
//   const [randomData, setRandomdata] = useState<randomdata | any>([]);
//   const [astId, setAstId] = useState(null);

const location = useLocation()
console.log(location);
let astId:any =location.state.astId
  const [astdata, setAstdata] = useState<AsteroidData>();

//   useEffect(() => {
//     {
//       axios
//         .get(
//           "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=NCqqqHjs2B6uPEgsuzkxtaDccnIXQXTEYLAed4Dg"
//         )
//         .then((res) => setRandomdata(res.data.near_earth_objects))
//         .catch((err) => console.log(err));
//     }
//   }, []);

//   useEffect(() => {
//     let valus: any = randomData.map((item: any) => item.id);
//     const random = Math.floor(Math.random() * valus.length);
//     setAstId(valus[random]);
//   }, [randomData]);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await axios.get<any>(
          `https://api.nasa.gov/neo/rest/v1/neo/${astId}?api_key=NCqqqHjs2B6uPEgsuzkxtaDccnIXQXTEYLAed4Dg`
        );
        setAstdata(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountryData();
  }, []);

  return (
    <div>
      <h1>Random Asteroid Information </h1>
      <div>
        {astdata && astdata ? (
          <div className="card">
            <div className="carddata">
              <p>
                {" "}
                <span>Asteroid Name : </span>
                {astdata?.name}
              </p>
              <p>
                <span> Asteroid URL</span>
                {astdata?.nasa_jpl_url}
              </p>
              <p>
                <span> Is Asteroid Hazardous: </span>
                {astdata.is_potentially_hazardous_asteroid.toString()}
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
