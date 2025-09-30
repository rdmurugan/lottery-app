/**
 * Lottery Number Generator App
 *
 * Main application component that allows users to generate random lottery numbers
 * for Powerball and Mega Millions with multipliers.
 *
 * Features:
 * - Generate Powerball tickets (5 numbers 1-69, 1 Powerball 1-26, Power Play multiplier)
 * - Generate Mega Millions tickets (5 numbers 1-70, 1 Mega Ball 1-25, Megaplier)
 * - Display multiple tickets in a list
 * - Clear all generated tickets
 * - Responsive design for mobile and web
 *
 * State Management:
 * - Uses React useState hooks to manage arrays of tickets
 * - New tickets are added to the top of the list (prepended)
 */

import React, { useState } from 'react';
import './App.css';
import { LotteryTicket } from './components/LotteryTicket';
import {
  generatePowerballTicket,
  generateMegaMillionsTicket,
  PowerballTicket as PowerballTicketType,
  MegaMillionsTicket as MegaMillionsTicketType,
} from './utils/lotteryGenerators';

/**
 * Main App component
 *
 * @returns {JSX.Element} The complete lottery generator application
 */
function App() {
  // State: Array to store all generated Powerball tickets
  // useState<PowerballTicketType[]> tells TypeScript this is an array of PowerballTicket objects
  const [powerballTickets, setPowerballTickets] = useState<PowerballTicketType[]>([]);

  // State: Array to store all generated Mega Millions tickets
  const [megaMillionsTickets, setMegaMillionsTickets] = useState<MegaMillionsTicketType[]>([]);

  /**
   * Generates a new Powerball ticket and adds it to the list
   *
   * The spread operator (...) copies existing tickets and adds the new one at the front.
   * This creates a "newest first" ordering in the display.
   */
  const handleGeneratePowerball = () => {
    const newTicket = generatePowerballTicket();
    // [newTicket, ...powerballTickets] means: new ticket first, then all old tickets
    setPowerballTickets([newTicket, ...powerballTickets]);
  };

  /**
   * Generates a new Mega Millions ticket and adds it to the list
   *
   * Works the same as handleGeneratePowerball but for Mega Millions
   */
  const handleGenerateMegaMillions = () => {
    const newTicket = generateMegaMillionsTicket();
    setMegaMillionsTickets([newTicket, ...megaMillionsTickets]);
  };

  /**
   * Clears all generated tickets from both lists
   *
   * Resets both state arrays to empty arrays []
   */
  const handleClearAll = () => {
    setPowerballTickets([]);
    setMegaMillionsTickets([]);
  };

  return (
    <div className="App">
      {/* Header section with app title and description */}
      <header className="App-header">
        <h1>🎰 Lottery Number Generator</h1>
        <p>Generate random numbers for Powerball and Mega Millions</p>
      </header>

      {/* Main content area */}
      <main className="App-main">
        {/* Button controls for generating tickets and clearing */}
        <div className="button-container">
          <button className="generate-btn powerball-btn" onClick={handleGeneratePowerball}>
            Generate Powerball
          </button>
          <button className="generate-btn megamillions-btn" onClick={handleGenerateMegaMillions}>
            Generate Mega Millions
          </button>
          {/* Conditional rendering: Only show "Clear All" button if tickets exist */}
          {/* The && operator means: if left side is true, render right side */}
          {(powerballTickets.length > 0 || megaMillionsTickets.length > 0) && (
            <button className="clear-btn" onClick={handleClearAll}>
              Clear All
            </button>
          )}
        </div>

        {/* Container for displaying all generated tickets */}
        <div className="tickets-container">
          {/* Loop through Powerball tickets and render each one */}
          {/* .map() creates a new array of React components from the ticket data */}
          {powerballTickets.map((ticket, idx) => (
            <LotteryTicket key={`powerball-${idx}`} type="powerball" ticket={ticket} />
          ))}
          {/* Loop through Mega Millions tickets and render each one */}
          {megaMillionsTickets.map((ticket, idx) => (
            <LotteryTicket key={`megamillions-${idx}`} type="megamillions" ticket={ticket} />
          ))}
        </div>

        {/* Empty state: Show message when no tickets have been generated yet */}
        {powerballTickets.length === 0 && megaMillionsTickets.length === 0 && (
          <div className="empty-state">
            <p>Click a button above to generate your lottery numbers!</p>
          </div>
        )}
      </main>

      {/* Footer with responsible gaming message */}
      <footer className="App-footer">
        <p>Good luck! Remember to play responsibly.</p>
      </footer>
    </div>
  );
}

export default App;