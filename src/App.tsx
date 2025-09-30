import React, { useState } from 'react';
import './App.css';
import { LotteryTicket } from './components/LotteryTicket';
import {
  generatePowerballTicket,
  generateMegaMillionsTicket,
  PowerballTicket as PowerballTicketType,
  MegaMillionsTicket as MegaMillionsTicketType,
} from './utils/lotteryGenerators';

function App() {
  const [powerballTickets, setPowerballTickets] = useState<PowerballTicketType[]>([]);
  const [megaMillionsTickets, setMegaMillionsTickets] = useState<MegaMillionsTicketType[]>([]);

  const handleGeneratePowerball = () => {
    const newTicket = generatePowerballTicket();
    setPowerballTickets([newTicket, ...powerballTickets]);
  };

  const handleGenerateMegaMillions = () => {
    const newTicket = generateMegaMillionsTicket();
    setMegaMillionsTickets([newTicket, ...megaMillionsTickets]);
  };

  const handleClearAll = () => {
    setPowerballTickets([]);
    setMegaMillionsTickets([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎰 Lottery Number Generator</h1>
        <p>Generate random numbers for Powerball and Mega Millions</p>
      </header>

      <main className="App-main">
        <div className="button-container">
          <button className="generate-btn powerball-btn" onClick={handleGeneratePowerball}>
            Generate Powerball
          </button>
          <button className="generate-btn megamillions-btn" onClick={handleGenerateMegaMillions}>
            Generate Mega Millions
          </button>
          {(powerballTickets.length > 0 || megaMillionsTickets.length > 0) && (
            <button className="clear-btn" onClick={handleClearAll}>
              Clear All
            </button>
          )}
        </div>

        <div className="tickets-container">
          {powerballTickets.map((ticket, idx) => (
            <LotteryTicket key={`powerball-${idx}`} type="powerball" ticket={ticket} />
          ))}
          {megaMillionsTickets.map((ticket, idx) => (
            <LotteryTicket key={`megamillions-${idx}`} type="megamillions" ticket={ticket} />
          ))}
        </div>

        {powerballTickets.length === 0 && megaMillionsTickets.length === 0 && (
          <div className="empty-state">
            <p>Click a button above to generate your lottery numbers!</p>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>Good luck! Remember to play responsibly.</p>
      </footer>
    </div>
  );
}

export default App;