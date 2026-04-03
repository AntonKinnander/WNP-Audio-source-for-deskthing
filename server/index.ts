import { DeskThing } from "@deskthing/server";
import { DESKTHING_EVENTS } from "@deskthing/types";
import { WNPServer } from "./wnpServer";

// Create a single instance of the WNP server
const wnpServer = new WNPServer(6344);

const start = async () => {
  console.log('WNP Audio Source starting...');

  try {
    // Start the WNP WebSocket server on port 6344
    await wnpServer.start();
    console.log('WNP Server started successfully');
  } catch (error) {
    console.error('Failed to start WNP Server:', error);
    throw error;
  }
};

const stop = async () => {
  console.log('WNP Audio Source stopping...');

  try {
    // Stop the WNP WebSocket server
    await wnpServer.stop();
    console.log('WNP Server stopped successfully');
  } catch (error) {
    console.error('Error stopping WNP Server:', error);
  }
};

const purge = async () => {
  console.log('WNP Audio Source purging...');

  try {
    // Stop the server and clean up
    await wnpServer.stop();
    console.log('WNP Server purged successfully');
  } catch (error) {
    console.error('Error purging WNP Server:', error);
  }
};

// Main entrypoint - start the app
DeskThing.on(DESKTHING_EVENTS.START, start);

// Main exit point - stop the app
DeskThing.on(DESKTHING_EVENTS.STOP, stop);

// Purge event - clean reset
DeskThing.on(DESKTHING_EVENTS.PURGE, purge);

export {};
