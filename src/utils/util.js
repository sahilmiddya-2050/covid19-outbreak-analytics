import React from "react";
import numeral from "numeral";
import { Circle, Popup } from "react-leaflet";

const caseTypeColors = {
  cases: {
    hex: "#CC1034",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

//Drawing Circles On the Map
export const showDataOnMap = (data, caseType = "cases") =>
  data.map((country) => (
    <Circle
      center={{ lat: country.countryInfo.lat, lng: country.countryInfo.long }}
      fillOpacity={0.4}
      color={caseTypeColors[caseType].hex}
      fillColor={caseTypeColors[caseType].hex}
      radius={
        15 * Math.sqrt(country[caseType] * caseTypeColors[caseType].multiplier)
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format("0,0")}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format("0,0")}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format("0,0")}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

// Printing CoronaVirus Stats Nicely
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "no cases are detected";
