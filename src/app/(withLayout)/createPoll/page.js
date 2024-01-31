// components/Poll.js
"use client"
import React, { useState } from 'react';

const Poll = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const options = ['Option A', 'Option B', 'Option C'];

  const handleVote = () => {
    // Handle the voting logic here, e.g., send a request to your server
    console.log(`Voted for ${selectedOption}`);
  };

  return (
    <div className='text-white'>
      <h2>Vote for Your Favorite Option:</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="pollOption"
                value={option}
                checked={selectedOption === option}
                onChange={() => setSelectedOption(option)}
              />
              {option}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleVote}>Vote</button>
    </div>
  );
};

export default Poll;
