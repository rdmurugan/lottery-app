/**
 * LotteryTicket Component
 *
 * This component displays a formatted lottery ticket for either Powerball or Mega Millions.
 * It shows the main numbers, special ball, and multiplier in a visually appealing card layout.
 *
 * The component adapts its styling and labels based on the lottery type:
 * - Powerball: Red theme with "Powerball" and "Power Play" labels
 * - Mega Millions: Purple theme with "Mega Ball" and "Megaplier" labels
 */

import React from 'react';
import { PowerballTicket, MegaMillionsTicket } from '../utils/lotteryGenerators';
import './LotteryTicket.css';

/**
 * Props for the LotteryTicket component
 *
 * @property {string} type - The lottery type: 'powerball' or 'megamillions'
 * @property {PowerballTicket | MegaMillionsTicket} ticket - The ticket data containing numbers and multiplier
 */
interface LotteryTicketProps {
  type: 'powerball' | 'megamillions';
  ticket: PowerballTicket | MegaMillionsTicket;
}

/**
 * LotteryTicket functional component
 *
 * Renders a lottery ticket card with:
 * - 5 main numbers displayed as circular balls
 * - 1 special ball (Powerball or Mega Ball) with distinct styling
 * - Multiplier badge (Power Play or Megaplier)
 *
 * @param {LotteryTicketProps} props - Component props
 * @returns {JSX.Element} A formatted lottery ticket display
 *
 * @example
 * // Powerball ticket
 * <LotteryTicket
 *   type="powerball"
 *   ticket={{ numbers: [5, 23, 34, 56, 67], powerball: 15, powerPlay: 3 }}
 * />
 *
 * @example
 * // Mega Millions ticket
 * <LotteryTicket
 *   type="megamillions"
 *   ticket={{ numbers: [8, 19, 31, 54, 68], megaBall: 12, megaplier: 4 }}
 * />
 */
export const LotteryTicket: React.FC<LotteryTicketProps> = ({ type, ticket }) => {
  // Check if this is a Powerball ticket (vs Mega Millions)
  const isPowerball = type === 'powerball';

  // Extract the special ball number based on ticket type
  // TypeScript type assertion (as) tells the compiler which specific type we're using
  const specialBall = isPowerball
    ? (ticket as PowerballTicket).powerball
    : (ticket as MegaMillionsTicket).megaBall;

  // Extract the multiplier value based on ticket type
  const multiplier = isPowerball
    ? (ticket as PowerballTicket).powerPlay
    : (ticket as MegaMillionsTicket).megaplier;

  // Set appropriate labels for the UI based on lottery type
  const specialBallLabel = isPowerball ? 'Powerball' : 'Mega Ball';
  const multiplierLabel = isPowerball ? 'Power Play' : 'Megaplier';

  return (
    <div className={`lottery-ticket ${type}`}>
      {/* Header section - displays lottery type name */}
      <div className="ticket-header">
        <h3>{isPowerball ? 'Powerball' : 'Mega Millions'}</h3>
      </div>

      {/* Main ticket body - contains all number displays */}
      <div className="ticket-body">
        {/* White balls section - displays the 5 main numbers */}
        <div className="numbers-section">
          <label>Numbers</label>
          <div className="numbers-container">
            {/* Loop through each number and display it in a circular ball */}
            {ticket.numbers.map((num, idx) => (
              <div key={idx} className="number-ball white-ball">
                {num}
              </div>
            ))}
          </div>
        </div>

        {/* Special ball section - displays Powerball or Mega Ball */}
        <div className="special-ball-section">
          <label>{specialBallLabel}</label>
          <div className="numbers-container">
            {/* Special ball gets unique styling based on lottery type */}
            <div className={`number-ball special-ball ${type}`}>
              {specialBall}
            </div>
          </div>
        </div>

        {/* Multiplier section - displays Power Play or Megaplier */}
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