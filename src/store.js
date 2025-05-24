export const initialStore=()=>{
  return{
    CHARACTER_URL: "https://www.swapi.tech/api/people",
    PLANETS_URL: "https://www.swapi.tech/api/planets",
    VEHICLE_URL: "https://www.swapi.tech/api/vehicles",
    CHARACTER_IMAGE_URL: "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/people",
    PLANETS_IMAGE_URL: "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/planets",
    VEHICLE_IMAGE_URL: "https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/vehicles",
    vehicles: [],
    characters: [],
    planets: [],
    loading: true, 
    favorites: [],
  }
}

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "SET_LOADING":
      return { ...store, loading: action.payload };
    case "SET_CHARACTERS":
      return { ...store, characters: action.payload };
    case "SET_PLANETS":
      return { ...store, planets: action.payload };
    case "SET_VEHICLES":
      return { ...store, vehicles: action.payload };
    case "ADD_FAVORITE":
      if (store.favorites.includes(action.payload)) return store;
      return { ...store, favorites: [...store.favorites, action.payload] };

    case "REMOVE_FAVORITE":
      return {
        ...store,
        favorites: store.favorites.filter((name) => name !== action.payload),
      };
      default:
        throw Error('Unknown action.');
      }
  }   
