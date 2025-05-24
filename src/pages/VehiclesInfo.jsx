import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useParams } from "react-router-dom";

export const VehicleInfo = () => {
  const { store } = useGlobalReducer();
  const { uid } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${store.VEHICLE_URL}/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setVehicle(data.result.properties);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching vehicle:", err);
        setLoading(false);
      });
  }, [uid, store.VEHICLE_URL]);

  if (loading) return <p>Loading vehicle...</p>;
  if (!vehicle) return <p>vehicle not found</p>;

  return (
    <div>
      <div className="d-flex justify-content-around m-4 p-2 border-bottom border-danger">
        <img 
            src={`${store.VEHICLE_IMAGE_URL}/${uid}.jpg`} 
            onError={(e) => (e.target.src = "https://placehold.co/400x200?text=No+Image")}
            className="card-img-top" 
            alt={vehicle.name}
            style={{
                width: "20rem",
                height: "20rem",
            }}
          />
        <div className="mx-auto">
          <h1 className="text-center">{vehicle.name}</h1>
          <p className="text-center">details</p>
        </div>
      </div>
      <div
        className="d-flex justify-content-between m-4 p-2"
        style={{ height: "25%" }}
      >
        <div>
          <h3 className="text-danger text-center">Max Atmosphering Speed</h3>
          <p className="text-danger text-center">{vehicle.max_atmosphering_speed}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Cargo Capacity</h3>
          <p className="text-danger text-center">{vehicle.cargo_capacity}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Crew</h3>
          <p className="text-danger text-center">{vehicle.crew}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Length</h3>
          <p className="text-danger text-center">{vehicle.length}</p>
        </div>
        <div>
          <h3 className="text-danger text-center">Vehicle Vlass</h3>
          <p className="text-danger text-center">{vehicle.vehicle_class}</p>
        </div>
        
      </div>
    </div>
  );
};
