import React, { useState } from 'react';

function UpdatePresenceForm({ onSubmit }) {
  const [rollno, setRollno] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rollno);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter Roll No"
        value={rollno}
        onChange={(e) => setRollno(e.target.value)}
      />
      <button type="submit">Update Presence</button>
    </form>
  );
}
export default UpdatePresenceForm