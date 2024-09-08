"use client";
import React, { useState } from "react";

import {
  Airspeed,
  Altimeter,
  AttitudeIndicator,
  HeadingIndicator,
  TurnCoordinator,
  Variometer,
} from "react-typescript-flight-indicators";
import { useFlightDataStore } from "./data_link/flight_data_store";
import { Button } from "./ui/button";

const FlightIndicators = () => {
  const { flight_data } = useFlightDataStore();
  const [showBox, setShowBox] = useState(false);
  const [showData, setShowData] = useState(false);

  return (
    <div className="w-full flex flex-col gap-10 justify-center">
      <div className="flex flex-wrap px-10 gap-10">
        <Button onClick={() => setShowBox(!showBox)}>Show Box</Button>
        <Button
          onClick={() => {
            setShowData(!showData);
          }}
        >
          Show Raw Data
        </Button>
      </div>
      {showData && <pre>{JSON.stringify(flight_data, null, 2)}</pre>}
      <div className="grid grid-cols-2 lg:grid-cols-3  gap-5 lg:gap-40">
        <Airspeed speed={flight_data?.airspeed || 0} showBox={showBox} />
        <AttitudeIndicator
          roll={((flight_data?.roll || 0) * 180) / 3.14159}
          pitch={((flight_data?.pitch || 0) * 180) / 3.14159}
          showBox={showBox}
        />
        <Altimeter altitude={flight_data?.altitude || 0} showBox={showBox} />
        <TurnCoordinator turn={0} showBox={showBox} />
        <HeadingIndicator
          heading={((flight_data?.heading || 0) * 180) / 3.14159}
          showBox={showBox}
        />
        <Variometer
          vario={flight_data?.vertical_speed || 0}
          showBox={showBox}
        />
      </div>
    </div>
  );
};

export default FlightIndicators;
