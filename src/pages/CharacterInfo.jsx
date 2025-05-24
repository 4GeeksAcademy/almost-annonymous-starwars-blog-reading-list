import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";

export const CharacterInfo = () => {
  const { store } = useGlobalReducer();
  const { uid } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${store.CHARACTER_URL}/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setCharacter(data.result.properties);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching character:", err);
        setLoading(false);
      });
  }, [uid, store.CHARACTER_URL]);

  if (loading) return <p>Loading character...</p>;
  if (!character) return <p>Character not found</p>;

  return (
    <div>
      <div className="d-flex justify-content-around m-4 p-2 border-bottom border-danger">
        <img 
            src={`${store.CHARACTER_IMAGE_URL}/${uid}.jpg`} 
            onError={(e) => (e.target.src = "https://placehold.co/400x200?text=No+Image")}
            className="card-img-top" 
            alt={character.name}
            style={{
                width: "20rem",
                height: "20rem",
            }}
          />
        <div className="mx-auto">
          <h1 className="text-center">{character.name}</h1>
          <p className="text-center">Star Wars character details</p>
        </div>
      </div>
      <div
        className="d-flex justify-content-between m-4 p-2"
        style={{ height: "25%" }}
      >
        <div>
          <h3 className="text-danger text-center">Name</h3>
          <p className="text-danger text-center">{character.name}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Birth Year</h3>
          <p className="text-danger text-center">{character.birth_year}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Gender</h3>
          <p className="text-danger text-center">{character.gender}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Height</h3>
          <p className="text-danger text-center">{character.height}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Skin Color</h3>
          <p className="text-danger text-center">{character.skin_color}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Eye Color</h3>
          <p className="text-danger text-center">{character.eye_color}</p>
        </div>
      </div>
    </div>
  );
};
