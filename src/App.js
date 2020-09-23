import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import InfoBox from "./components/InfoBox";
import Map from "./components/Map";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";
import { prettyPrintStat } from "./utils/util";

// https://disease.sh/v3/covid-19/countries

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [coronavirusInformation, setCoronavirusInformation] = useState({});
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [caseType, setCaseType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCoronavirusInformation(data);
      });
  }, []);

  useEffect(() => {
    async function getCountries() {
      const response = await fetch("https://disease.sh/v3/covid-19/countries", {
        method: "GET",
      });
      const responseData = await response.json();
      const countries = responseData.map((country) => ({
        name: country.country, // India, United State etc.
        value: country.countryInfo.iso2, // UK, US, IND
        cases: country.cases,
      }));
      setCountries(countries);
      setMapCountries(responseData);
    }
    getCountries();
  }, []);

  const countrySelectChangeHandler = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    const response = await fetch(url, { method: "GET" });
    const responseData = await response.json();

    setCoronavirusInformation(responseData);
    setCountry(countryCode);
    if (e.target.value === "worldwide") {
      setMapCenter({
        lat: 34.80746,
        lng: -40.4796,
      });
      setMapZoom(2);
    } else {
      setMapCenter({
        lat: responseData.countryInfo.lat,
        lng: responseData.countryInfo.long,
      });
      setMapZoom(4);
    }
  };

  return (
    <div className="app">
      {/* Left Side of the App */}
      <div className="app__left">
        {/* Header */}
        <div className="app__header">
          <h1>COVID-19 Outbreak Analytics</h1>

          {/* Title + Select DropDown field */}
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={countrySelectChangeHandler}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* Info boxes */}
        <div className="app__stats">
          <InfoBox
            onClick={(e) => setCaseType("cases")}
            active={caseType === "cases"}
            caseType={caseType}
            customClassName="cases"
            title="Coronavirus cases"
            cases={prettyPrintStat(coronavirusInformation.todayCases)}
            total={prettyPrintStat(coronavirusInformation.cases)}
          />
          <InfoBox
            onClick={(e) => setCaseType("recovered")}
            active={caseType === "recovered"}
            caseType={caseType}
            customClassName="recovered"
            title="Recovered"
            cases={prettyPrintStat(coronavirusInformation.todayRecovered)}
            total={prettyPrintStat(coronavirusInformation.recovered)}
          />
          <InfoBox
            onClick={(e) => setCaseType("deaths")}
            active={caseType === "deaths"}
            caseType={caseType}
            customClassName="deaths"
            title="Dathes"
            cases={prettyPrintStat(coronavirusInformation.todayDeaths)}
            total={prettyPrintStat(coronavirusInformation.deaths)}
          />
        </div>

        {/* Map */}
        <Map
          caseType={caseType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      {/* Right Side of the App */}
      <Card className="app__right">
        <CardContent>
          <h1>Live Cases From Countries</h1>
          <Table countries={countries} />
          {/* Table */}
        </CardContent>
        <CardContent className="card__content">
          <h1>Chart Of Situation</h1>
          {/* Graph */}
          <LineGraph caseType={caseType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
