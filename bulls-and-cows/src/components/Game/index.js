import React from 'react';
import { withAuthorization } from '../Session';
import BullsAndCows from './bullsandcows';
const Game = () => (
  <div className="inner-wrap">
    <h1>Bulls And Cows</h1>
    <p>Bulls Cows (also known as Cows and Bulls, Pigs and Bulls, Bulls and Cleots or Mastermind) is a number guessing game. In some countries is played with colors or words but in this version you must break the code with numbers. At the start of the game the computer generates a random number. You must guess that number. Every of your choices gives you bulls and cows. Every bull is a guessed digit in the original number and every cow is a guessed digit but misplaced. For instance if the random number is 259 and you guessed 329, result is 1 Bull (digit 9) and 1 Cow (digit 2). Enjoy!</p>
    <BullsAndCows />
  </div>
);
const condition = authUser => !!authUser;
export default withAuthorization(condition)(Game);