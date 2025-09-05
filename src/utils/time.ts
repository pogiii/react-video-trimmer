/**
 * Formats time in seconds to mm:ss format
 * @param timeInSeconds - Time in seconds (can be decimal)
 * @returns Formatted time string in mm:ss format
 */
export function formatTimeToMMSS(timeInSeconds: number): string {
  // Handle negative values by treating them as 0
  const totalSeconds = Math.max(0, Math.floor(timeInSeconds));
  
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  // Pad with leading zeros
  const paddedMinutes = minutes.toString().padStart(2, '0');
  const paddedSeconds = seconds.toString().padStart(2, '0');
  
  return `${paddedMinutes}:${paddedSeconds}`;
}

/**
 * Parses a mm:ss format string to seconds
 * @param timeString - Time string in mm:ss format
 * @returns Time in seconds, or 0 if invalid format
 */
export function parseMMSSToSeconds(timeString: string): number {
  const parts = timeString.split(':');
  
  if (parts.length !== 2) {
    return 0;
  }
  
  const minutes = parseInt(parts[0], 10);
  const seconds = parseInt(parts[1], 10);
  
  if (isNaN(minutes) || isNaN(seconds) || seconds >= 60 || minutes < 0 || seconds < 0) {
    return 0;
  }
  
  return minutes * 60 + seconds;
} 