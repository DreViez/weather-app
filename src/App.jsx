import React, { useEffect, useState } from "react";
import TopButtons from "./components/topButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TemperatureAndDetails from "./components/TemperatureAndDetails";
import Forecast from "./components/Forecast";
import { getFormattedWeatherData } from "./services/weatherService";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [city, setCity] = useState("New York");
  const [unit, setUnit] = useState("c");
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [newFavorite, setNewFavorite] = useState("");

  useEffect(() => {
    const fetchWeather = async () => {
      toast.info("Fetching weather for " + city);
      await getFormattedWeatherData(city).then((data) => {
        toast.success(`Fetched ${data.loc_name}, ${data.loc_country}`);
        console.log(data);
        setWeather(data);
      });
    };

    fetchWeather();
  }, [city, unit]);

  useEffect(() => {
    // Load favorites from local storage when component mounts
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    // Save favorites to local storage whenever favorites state changes
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = () => {
    if (newFavorite && !favorites.includes(newFavorite)) {
      setFavorites([...favorites, newFavorite]);
      setNewFavorite(""); // Reset input field after adding
    }
  };

  const removeFavorite = (location) => {
    const updatedFavorites = favorites.filter((fav) => fav !== location);
    setFavorites(updatedFavorites);
  };

  const isFavorite = (location) => {
    return favorites.includes(location);
  };

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    return weather.is_day ? "from-yellow-300 to-orange-600" : "from-cyan-700 to-blue-700";
  };

  const handleFavoriteClick = (favoriteCity) => {
    setCity(favoriteCity);
  };

  return (
    <div
      className={`max-w-screen-md mx-auto mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400 rounded-lg`}
    >
      <TopButtons setCity={setCity} />
      <Inputs setCity={setCity} unit={unit} setUnit={setUnit} />

      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} unit={unit} />

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Favorite Locations</h2>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            {favorites.map((favorite, index) => (
              <button
                key={index}
                className="bg-gray-200 text-gray-500 p-2 rounded-lg"
                onClick={() => handleFavoriteClick(favorite)}
              >
                <span>{favorite}</span>
                <button
                  className="ml-2 text-red-600"
                  onClick={() => removeFavorite(favorite)}
                >
                  Remove
                </button>
              </button>
            ))}
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={newFavorite}
              onChange={(e) => setNewFavorite(e.target.value)}
              placeholder="Enter city name"
              className="border text-gray-500 rounded px-2 py-1 mr-2"
            />
            <button
              onClick={addFavorite}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Add Favorite
            </button>
          </div>

          <Forecast
            title="Hourly Forecast"
            unit={unit}
            forecast={weather.hourlyForecast}
          />
          <Forecast
            title="Daily Forecast"
            unit={unit}
            forecast={weather.dailyForecast}
          />
        </>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
};

export default App;
