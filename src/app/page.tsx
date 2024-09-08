import FlightIndicators from "../components/flight_indicator";
import WebsocketComp from "@/components/data_link/websocket_comp";

export default function Home() {
  return (
    <div className="">
      <div className="mt-0">
        <div className="w-full flex justify-center">
          <WebsocketComp />
        </div>
        <div className="mt-0">
          <FlightIndicators />
        </div>
      </div>
    </div>
  );
}
