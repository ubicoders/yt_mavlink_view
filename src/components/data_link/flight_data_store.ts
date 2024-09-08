import { create } from "zustand";

// Define the FlightData type with optional fields and one required field (vertical_speed).
export type FlightData = {
  airspeed?: number;
  altitude?: number;
  roll?: number;
  pitch?: number;
  heading?: number;
  turn_rate?: number;
  vertical_speed: number;
};

// Define the shape of the Zustand store's state and actions.
interface FlightDataState {
  flight_data: FlightData;
  setFlightData: (flight_data: FlightData) => void;
}

// Create the Zustand store with proper typing for both state and actions.
export const useFlightDataStore = create<FlightDataState>((set) => ({
  flight_data: { vertical_speed: 0 }, // Initialize with a default value for vertical_speed
  setFlightData: (flight_data: FlightData) => set({ flight_data }),
}));
