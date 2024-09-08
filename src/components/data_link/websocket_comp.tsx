"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import WebsocketClientButton from "./ws_client";

const WebsocketComp = () => {
  const [serverAddress, setServerAddress] = useState<string>("127.0.0.1:9090");

  return (
    <div className="flex flex-wrap gap-10 justify-center items-center py-20">
      <div className="text-lg">Server Address</div>

      <input
        type="text"
        placeholder="127.0.0.1:9090"
        value={serverAddress}
        onChange={(e) => setServerAddress(e.target.value)} // Update the server address
        className="border-2 border-black mr-10 py-1"
      />

      {/* Pass the serverAddress to WebsocketClientButton */}
      <WebsocketClientButton address={serverAddress} />
    </div>
  );
};

export default WebsocketComp;
