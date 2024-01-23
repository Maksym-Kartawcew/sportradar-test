import { matchNames } from "../constants";

function getRandomMatchName() {
  const randomNameIndex = Math.floor(Math.random() * matchNames.length);
  return matchNames[randomNameIndex];
}

export default getRandomMatchName;
