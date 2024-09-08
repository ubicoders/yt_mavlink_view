"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { useFlightDataStore } from "./flight_data_store";

const WebsocketClientButton = ({ address }: { address: string }) => {
  const [message, setMessage] = useState<string>(""); // State to hold the received message
  const [isConnected, setIsConnected] = useState<boolean>(false); // State to track connection status
  const [ws, setWs] = useState<WebSocket | null>(null); // WebSocket instance
  const websocketRef = useRef<WebSocket | null>(null); // Ref for WebSocket instance
  const intervalRef = useRef<number | null>(null); // Ref for 50Hz interval

  const { setFlightData } = useFlightDataStore();

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (ws) {
        ws.close();
      }
    };
  }, [ws]);

  const connectWebSocket = () => {
    websocketRef.current = new WebSocket(`ws://${address}`);

    websocketRef.current.onopen = () => {
      console.log("WebSocket connection opened");
      setIsConnected(true);
      startSendingMessages(); // Automatically start sending messages when connected
    };

    websocketRef.current.onmessage = (event) => {
      //   console.log("Message from server: ", event.data);
      setFlightData(JSON.parse(event.data));
      setMessage(event.data); // Update state with the received message
    };

    websocketRef.current.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    websocketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
      setIsConnected(false);
      stopSendingMessages(); // Ensure sending stops if connection is closed
    };
  };

  const sendMessage = () => {
    if (
      websocketRef.current &&
      websocketRef.current.readyState === WebSocket.OPEN
    ) {
      websocketRef.current.send("Message from React Client at 50 Hz");
    }
  };

  const startSendingMessages = () => {
    if (!intervalRef.current) {
      intervalRef.current = window.setInterval(() => {
        sendMessage();
      }, 20); // 50 Hz (every 20 milliseconds)
    }
  };

  const stopSendingMessages = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const disconnectWebSocket = () => {
    stopSendingMessages(); // Stop sending messages
    if (websocketRef.current) {
      websocketRef.current.close(); // Close WebSocket connection
      setIsConnected(false); // Update connection status
    }
  };

  useEffect(() => {
    return () => {
      stopSendingMessages(); // Clean up on component unmount
      if (websocketRef.current) {
        websocketRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      {isConnected ? (
        <Button onClick={disconnectWebSocket}>Disconnect</Button>
      ) : (
        <Button onClick={connectWebSocket}>Connect WebSocket</Button>
      )}
    </div>
  );
};

export default WebsocketClientButton;
