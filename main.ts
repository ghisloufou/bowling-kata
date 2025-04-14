import { BowlingGame } from "./src/bowlingGame";
import { getNumberFromUser } from "./src/getNumberFromUser";

new BowlingGame(getNumberFromUser).start(10);
