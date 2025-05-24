import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";

export const PlanetInfo = () => {
  const { store } = useGlobalReducer();
  const { uid } = useParams();
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${store.PLANETS_URL}/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setPlanet(data.result.properties);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching planet:", err);
        setLoading(false);
      });
  }, [uid, store.PLANETS_URL]);

  if (loading) return <p>Loading planet...</p>;
  if (!planet) return <p>planet not found</p>;

  return (
    <div>
      <div className="d-flex justify-content-around m-4 p-2 border-bottom border-danger">
        <img 
            src={`${store.PLANETS_IMAGE_URL}/${uid}.jpg`} 
            onError={(e) => (e.target.src = "https://placehold.co/400x200?text=No+Image")}
            className="card-img-top" 
            alt={planet.name}
            style={{
                width: "20rem",
                height: "20rem",
            }}
          />
        <div className="mx-auto">
          <h1 className="text-center">{planet.name}</h1>
          <p className="text-center">details</p>
        </div>
      </div>
      <div
        className="d-flex justify-content-between m-4 p-2"
        style={{ height: "25%" }}
      >
        <div>
          <h3 className="text-danger text-center">Name</h3>
          <p className="text-danger text-center">{planet.name}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Climate</h3>
          <p className="text-danger text-center">{planet.climate}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Population</h3>
          <p className="text-danger text-center">{planet.population}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Orbital Period</h3>
          <p className="text-danger text-center">{planet.orbital_period}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Rotation Period</h3>
          <p className="text-danger text-center">{planet.rotation_period}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Diameter</h3>
          <p className="text-danger text-center">{planet.diameter}</p>
        </div>
        </div>
      </div>
  );
};
