import React from 'react';
import { PowerballTicket, MegaMillionsTicket } from '../utils/lotteryGenerators';
import './LotteryTicket.css';

interface LotteryTicketProps {
  type: 'powerball' | 'megamillions';
  ticket: PowerballTicket | MegaMillionsTicket;
}

export const LotteryTicket: React.FC<LotteryTicketProps> = ({ type, ticket }) => {
  const isPowerball = type === 'powerball';
  const specialBall = isPowerball
    ? (ticket as PowerballTicket).powerball
    : (ticket as MegaMillionsTicket).megaBall;
  const multiplier = isPowerball
    ? (ticket as PowerballTicket).powerPlay
    : (ticket as MegaMillionsTicket).megaplier;
  const specialBallLabel = isPowerball ? 'Powerball' : 'Mega Ball';
  const multiplierLabel = isPowerball ? 'Power Play' : 'Megaplier';

  return (
    <div className={`lottery-ticket ${type}`}>
      <div className="ticket-header">
        <h3>{isPowerball ? 'Powerball' : 'Mega Millions'}</h3>
      </div>

      <div className="ticket-body">
        <div className="numbers-section">
          <label>Numbers</label>
          <div className="numbers-container">
            {ticket.numbers.map((num, idx) => (
              <div key={idx} className="number-ball white-ball">
                {num}
              </div>
            ))}
          </div>
        </div>

        <div className="special-ball-section">
          <label>{specialBallLabel}</label>
          <div className="numbers-container">
            <div className={`number-ball special-ball ${type}`}>
              {specialBall}
            </div>
          </div>
        </div>

        <div className="multiplier-section">
          <label>{multiplierLabel}</label>
          <div className="multiplier-badge">
            {multiplier}x
          </div>
        </div>
      </div>
    </div>
  );
};