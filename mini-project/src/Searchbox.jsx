import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Searchbox.css";
import { useState } from "react";

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_URL = "http://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "f105044fc56477f8eb177984d7e89c2f";

  let getWetherinfo = async () => {
    try {
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}`);
      let jsonResponse = await response.json();
      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      console.log(result);
      return result;
    } catch (err) {
      throw err;
    }
  };

  let handalChange = (evt) => {
    setCity(evt.target.value);
  };

  let handleSubmit = async (evt) => {
    try {
      evt.preventDefault();
      console.log(city);
      setCity("");
      let newInfo = await getWetherinfo();
      updateInfo(newInfo);
    } catch (err) {
      setError(true);
    }
  };
  return (
    <div className="searchbox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handalChange}
        />
        <br />
        <br />
        <br />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{ color: "red" }}>No Such Place Exist</p>}
      </form>
    </div>
  );
}
