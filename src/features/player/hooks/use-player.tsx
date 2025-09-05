import { useContext } from "react";
import { PlayerContext, type PlayerContextType } from "../context";

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
};