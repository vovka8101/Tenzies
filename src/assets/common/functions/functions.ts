import { Results } from "../types/Tenzies.types";

export const CheckResults = (resPrev: Results, newRes:Results): boolean => {
  if (resPrev.bestTime === 0 || newRes.bestTime < resPrev.bestTime) {
    localStorage.setItem('bestResults', JSON.stringify(newRes));
    return true;
  }

  return false;
}

export const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const remainingMilliseconds = Math.round((milliseconds % 1000) / 10);

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');
  const formattedMilliseconds = String(remainingMilliseconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`;
};
