import { DeskThing } from "@deskthing/server";
import {
  DESKTHING_EVENTS,
  SongEvent,
  AUDIO_REQUESTS
} from "@deskthing/types";
import { MediaStore } from "./mediaStore.js";

/**
 * WNP Audio Source for Deskthing
 *
 * Main entrypoint for the WebNowPlaying audio source adapter.
 * Receives music metadata from browser extensions via WNP protocol
 * and forwards it to the Deskthing server.
 */

const start = async () => {
  console.log('WNP Audio Source starting...');

  const mediaStore = MediaStore.getInstance();

  try {
    // Initialize MediaStore (starts WNP server and sets up listeners)
    await mediaStore.initializeListeners();
    console.log('WNP Audio Source started successfully');
  } catch (error) {
    console.error('Failed to start WNP Audio Source:', error);
    throw error;
  }
};

const stop = async () => {
  console.log('WNP Audio Source stopping...');

  const mediaStore = MediaStore.getInstance();

  try {
    await mediaStore.stop();
    console.log('WNP Audio Source stopped successfully');
  } catch (error) {
    console.error('Error stopping WNP Audio Source:', error);
  }
};

const purge = async () => {
  console.log('WNP Audio Source purging...');

  const mediaStore = MediaStore.getInstance();

  try {
    await mediaStore.purge();
    console.log('WNP Audio Source purged successfully');
  } catch (error) {
    console.error('Error purging WNP Audio Source:', error);
  }
};

// ========== Deskthing SDK Event Listeners ==========

// Main entrypoint - start the app
DeskThing.on(DESKTHING_EVENTS.START, start);

// Main exit point - stop the app
DeskThing.on(DESKTHING_EVENTS.STOP, stop);

// Purge event - clean reset
DeskThing.on(DESKTHING_EVENTS.PURGE, purge);

// Song GET events - requests for song data
DeskThing.on(SongEvent.GET, async (data) => {
  const mediaStore = MediaStore.getInstance();
  switch (data.request) {
    case AUDIO_REQUESTS.SONG:
      await mediaStore.handleGetSong();
      break;
    case AUDIO_REQUESTS.REFRESH:
      await mediaStore.handleRefresh();
      break;
  }
});

// Song SET events - control commands (v2 - not yet implemented)
DeskThing.on(SongEvent.SET, async (data) => {
  console.log(`WNP: Received SET command - ${data.request} (not yet implemented)`);
});

export {};
