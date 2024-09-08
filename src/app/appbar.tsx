import React from "react";
import { LOGO_URL_DARK } from "@/lib/logo_urls";
import { Button } from "@/components/ui/button";
import WebsocketComp from "@/components/data_link/websocket_comp";

const Appbar = () => {
  return (
    <div className="w-full flex flex-col lg:flex-row lg:gap-20">
      <div className="flex justify-center  lg:justify-start">
        <img src={LOGO_URL_DARK} className="w-96 " />
      </div>
      <div className="text-3xl flex justify-center items-center">
        Flight Indicators
      </div>
    </div>
  );
};

export default Appbar;
