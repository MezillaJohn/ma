import Cities from "./components/Cities";
import Map from "./components/Map";
import { Stack, Box } from "@mui/system";
import { useState } from "react";

function App() {
  const [cityData, setCityData] = useState({
    lat: "",
    lng: "",
    name: "",
    desc: "",
    pressure: "",
    temp: "",
    humidity: "",
  });

  const getCity = (cityData) => {
    setCityData(cityData);
  };

  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack
        sx={{
          flexDirection: { sx: "column", md: "row" },
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            height: { xs: "120px", md: "100%" },
            p: { xs: "20px", md: "30px" },
            width: { xs: "90%", md: "20%" },
            overflow: "auto",
          }}
        >
          {" "}
          <div
            style={{
              marginBottom: "15px",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            click the marker on the map to see weather forcast for your selected
            location
          </div>
          <Cities getCity={getCity} />
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            height: "100vh",
            flex: "auto",
          }}
        >
          {" "}
          <Map cityData={cityData} />
        </Box>
      </Stack>
    </Box>
  );
}

export default App;
