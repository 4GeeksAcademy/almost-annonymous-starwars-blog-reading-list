import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const params = useParams();

  const characterData = store.characters;
  const planetData = store.planets;
  const vehicleData = store.vehicles;

  useEffect(() => {
    //Step 1: Get the list of characters (name + uid)
    fetch(`${store.CHARACTER_URL}`)
      .then((res) => res.json())
      .then(async (data) => {
        //Step 2: Fetch full details for each character by uid
        const promises = data.results.map((char) =>
          fetch(`${store.CHARACTER_URL}/${char.uid}`).then((res) => res.json())
        );
        const detailedCharacters = await Promise.all(promises);
        const charactersWithUID = detailedCharacters.map((char, index) => ({
          ...char.result.properties,
          uid: data.results[index].uid,
        }));
        dispatch({ type: "SET_CHARACTERS", payload: charactersWithUID });
      });
  }, []);

  useEffect(() => {
    fetch(`${store.PLANETS_URL}`)
      .then((res) => res.json())
      .then(async (data) => {
        const promises = data.results.map((planet) =>
          fetch(`${store.PLANETS_URL}/${planet.uid}`).then((res) => res.json())
        );
        const detailedPlanets = await Promise.all(promises);

        const planetsWithUID = detailedPlanets.map((planet, index) => ({
          ...planet.result.properties,
          uid: data.results[index].uid,
        }));

        dispatch({ type: "SET_PLANETS", payload: planetsWithUID });
      });
  }, []);

  useEffect(() => {
    fetch(`${store.VEHICLE_URL}`)
      .then((res) => res.json())
      .then(async (data) => {
        const promises = data.results.map((vehicle) =>
          fetch(`${store.VEHICLE_URL}/${vehicle.uid}`).then((res) => res.json())
        );
        const detailedVehicles = await Promise.all(promises);

        const vehiclesWithUID = detailedVehicles.map((vehicle, index) => ({
          ...vehicle.result.properties,
          uid: data.results[index].uid,
        }));

        dispatch({ type: "SET_VEHICLES", payload: vehiclesWithUID });
      });
  }, []);

  return (
    <div className="p-2">
      <h1> Characters </h1>
      <div
        className="d-flex overflow-auto"
        style={{
          scrollSnapType: "x mandatory",
          gap: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {characterData.map((char) => (
          <div
            key={char.name}
            className="card m-2"
            style={{
              width: "18rem",
              flexShrink: "0",
            }}
          >
            <img
              src={`${store.CHARACTER_IMAGE_URL}/${char.uid}.jpg`}
              onError={(e) =>
                (e.target.src = "https://placehold.co/400x200?text=No+Image")
              }
              className="card-img-top"
              alt={char.name}
            />

            <div className="card-body">
              <h5 className="card-title">{char.name}</h5>
              <p className="card-text">Gender: {char.gender}</p>
              <p className="card-text">Hair Color: {char.hair_color}</p>
              <p className="card-text">Eye Color: {char.eye_color}</p>
              <div className="d-flex justify-content-between gap-1">
                <button
                  key={char.uid}
                  className="btn btn-outline-primary"
                  onClick={() => navigate(`/character-info/${char.uid}`)}
                >
                  Read More
                </button>
                <button
                  className={`btn ${
                    store.favorites.find(
                      (charName) => charName === char.name
                    )
                      ? "btn-warning"
                      : "btn-outline-warning"
                  }`}
                  onClick={() => {
                    if (
                      store.favorites.find(
                        (charName) => charName === char.name
                      )
                    )
                      return dispatch({
                        type: "REMOVE_FAVORITE",
                        payload: char.name,
                      });
                    dispatch({ type: "ADD_FAVORITE", payload: char.name });
                  }}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1> Planets </h1>
      <div
        className="d-flex overflow-auto"
        style={{
          scrollSnapType: "x mandatory",
          gap: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {planetData.map((planet) => (
          <div
            key={planet.name}
            className="card m-2"
            style={{
              width: "18rem",
              flexShrink: "0",
            }}
          >
            <img
              src={`${store.PLANETS_IMAGE_URL}/${planet.uid}.jpg`}
              className="card-img-top"
              alt={planet.name}
            />

            <div className="card-body">
              <h5 className="card-title">{planet.name}</h5>
              <p className="card-text">Population: {planet.population}</p>
              <p className="card-text">Terrain: {planet.terrain}</p>
              <div className="d-flex justify-content-between gap-1">
                <button
                  key={planet.uid}
                  className="btn btn-outline-primary"
                  onClick={() => navigate(`/planet-info/${planet.uid}`)}
                >
                  Read More
                </button>
                <button
                  className={`btn ${
                    store.favorites.find(
                      (planetName) => planetName === planet.name
                    )
                      ? "btn-warning"
                      : "btn-outline-warning"
                  }`}
                  onClick={() => {
                    if (
                      store.favorites.find(
                        (planetName) => planetName === planet.name
                      )
                    )
                      return dispatch({
                        type: "REMOVE_FAVORITE",
                        payload: planet.name,
                      });
                    dispatch({ type: "ADD_FAVORITE", payload: planet.name });
                  }}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <h1> Vehicles </h1>
      <div
        className="d-flex overflow-auto"
        style={{
          scrollSnapType: "x mandatory",
          gap: "1rem",
          paddingBottom: "1rem",
        }}
      >
        {vehicleData.map((vehicle) => (
          <div
            key={vehicle.name}
            className="card m-2"
            style={{
              width: "18rem",
              flexShrink: "0",
            }}
          >
            <img
              src={`${store.VEHICLE_IMAGE_URL}/${vehicle.uid}.jpg`}
              className="card-img-top"
              alt={vehicle.name}
            />

            <div className="card-body">
              <h5 className="card-title">{vehicle.name}</h5>
              <p className="card-text">Model: {vehicle.model}</p>
              <p className="card-text">Passengers: {vehicle.passengers}</p>
              <div className="d-flex justify-content-between gap-1">
                <button
                  key={vehicle.uid}
                  className="btn btn-outline-primary"
                  onClick={() => navigate(`/vehicle-info/${vehicle.uid}`)}
                >
                  Read More
                </button>
                <button
                  className={`btn ${
                    store.favorites.find(
                      (vehicleName) => vehicleName === vehicle.name
                    )
                      ? "btn-warning"
                      : "btn-outline-warning"
                  }`}
                  onClick={() => {
                    if (
                      store.favorites.find(
                        (vehicleName) => vehicleName === vehicle.name
                      )
                    )
                      return dispatch({
                        type: "REMOVE_FAVORITE",
                        payload: vehicle.name,
                      });
                    dispatch({ type: "ADD_FAVORITE", payload: vehicle.name });
                  }}
                >
                  <i className="fa-solid fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
