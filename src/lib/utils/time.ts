/**
 * Formats seconds into MM:SS format
 */
export const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Formats seconds into a human-readable format (e.g., "25 minutes", "1 hour 30 minutes")
 */
export const formatTimeVerbose = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }

  return `${hours} ${hours === 1 ? "hour" : "hours"}${
    minutes > 0 ? ` ${minutes} ${minutes === 1 ? "minute" : "minutes"}` : ""
  }`;
};

/**
 * Calculate progress percentage for circular timer
 */
export const calculateProgress = (remaining: number, total: number): number => {
  if (total === 0) return 0;

  const progress = (1 - remaining / total) * 100;
  return Math.min(100, Math.max(0, progress));
};
