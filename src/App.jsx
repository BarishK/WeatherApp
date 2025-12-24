import { useEffect, useState } from "react";
import "./App.css";
import { WeatherInfo } from "./components/WeatherInfo";
import { WeatherSummary } from "./components/WeatherSummary";
import bgRainy from "./bgImages/rainybg.jpg";
import bgClear from "./bgImages/clear.jpeg";
import bgClouds from "./bgImages/clouds.jpeg";

function App() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [cityName, setCityName] = useState("");
  const [latLon, setLatLon] = useState({});
  const [allData, setAllData] = useState();
  const [currentBg, setCurrentBg] = useState();

  console.log(import.meta.env.VITE_API_KEY);

  async function getLatLon(userCity) {
    const res = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${userCity}&limit=1&appid=${apiKey}`
    );

    const data = await res.json();

    if (!data || data.length === 0) {
      throw new Error("Şehir bulunamadı");
    }

    const name = data[0].name;
    const coords = {
      lat: data[0].lat,
      lon: data[0].lon,
    };

    setLatLon(coords);
    setCityName(name);

    return coords;
  }

  async function getCityData(userCity) {
    const coords = await getLatLon(userCity);

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    setAllData(data);
    // console.log(data);
    let weatherMainBg = await data.weather[0].main;

    switch (weatherMainBg) {
      case "Clouds":
        setCurrentBg(bgClouds);
        break;
      case "Clear":
        setCurrentBg(bgClear);
        break;
      case "Rain":
        setCurrentBg(bgRainy);
    }
  }
  const getUserLocation = async () => {
    const res = await fetch("https://ipinfo.io/json");
    const data = await res.json();
    console.log(data);

    if (!data.city) {
      return null; //implement error handling
    }

    // setSearchCity(data.city);

    getCityData(data.city);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div
      className="app d-flex justify-around"
      style={{
        backgroundImage: `url(${currentBg})`,
      }}
    >
      <WeatherSummary cityName={cityName} allData={allData} />
      <WeatherInfo getCityData={getCityData} allData={allData} />
    </div>
  );
}

export default App;
