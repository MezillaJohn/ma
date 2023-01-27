import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useState, useEffect } from "react";

const Cities = ({ getCity }) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [cityData, setCityData] = useState({
    lat: 6.455,
    lng: 3.3941,
    name: "Lagos",
    humidityToday: 44,
    pressureToday: 1033,
    tempToday: 303,
    descToday: "Rainy",
    humidityTom: 40,
    pressureTom: 1002,
    tempTom: 300,
    descTom: "Light Rain",
  });

  useEffect(() => {
    getCity(cityData);
  }, [cityData, getCity]);

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  today.setHours(19, 0, 0);
  tomorrow.setHours(19, 0, 0);

  const todayFormatted = today.toISOString().slice(0, 19).replace("T", " ");
  const tomorrowFormatted = tomorrow
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  useEffect(() => {
    if (searchTerm !== null) {
      const fetchData = async (country) => {
        const api = {
          url: "https://api.openweathermap.org/data/2.5/",
          key: "899a2a4ede86e7bee8eec3f073cd6c0a",
        };

        try {
          const res = await fetch(
            `${api.url}forecast?q=${country}&units=standard&appid=${api.key}`
          );

          if (!res.ok) {
            throw new Error("City not Found");
          }

          const data = await res.json();
          const weatherData = data.list.filter((data) => {
            return (
              data.dt_txt === todayFormatted ||
              data.dt_txt === tomorrowFormatted
            );
          });

          setCityData({
            lng: data.city.coord.lon,
            lat: data.city.coord.lat,
            humidityToday: weatherData[0].main.humidity,
            pressureToday: weatherData[0].main.pressure,
            tempToday: weatherData[0].main.temp,
            descToday: weatherData[0].weather[0].description,
            humidityTom: weatherData[1].main.humidity,
            pressureTom: weatherData[1].main.pressure,
            tempTom: weatherData[1].main.temp,
            descTom: weatherData[1].weather[0].description,
            name: data.city.name,
          });
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchData(searchTerm.label);
    }
  }, [searchTerm, todayFormatted, tomorrowFormatted]);

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        sx={{ width: "100%" }}
        renderInput={(params) => (
          <TextField {...params} label="Search Cities" />
        )}
        onChange={(event, newValue) => {
          setSearchTerm(newValue);
        }}
        autoSelect
      />
    </>
  );
};

// list of 20 cities in nigeria
const top100Films = [
  { label: "Warri" },
  { label: "Abuja" },
  { label: "Benin City" },
  { label: "Lokoja" },
  { label: "Makurdi	" },
  { label: "Kano	" },
  { label: "Port Harcourt	" },
  { label: "Yenagoa	" },
  { label: "Onitsha	" },
  { label: "Ogbomosho		" },
  { label: "Zaria" },
  { label: "Abakaliki" },
  { label: "Calabar" },
  { label: "Ibadan" },
  { label: "Akure" },
  { label: "Gombe	" },
  { label: "Ikorodu	" },
  { label: "Lafia	" },
  { label: "Ijebu-Ode	" },
  { label: "Sokoto	" },
];

export default Cities;
