import { createContext, use, useState } from 'react';

const AddParticipant = () => {
  const { actions } = useCompetitionContext();
  const [name, setName] = useState('');

  const handleAdd = () => {
    if (name.trim()) {
      actions.addParticipant(name.trim());
      setName('');
    }
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Participant Name" />
      <button onClick={handleAdd}>Add Participant</button>
    </div>
  );
};

Competition.Debug = Debug;
Competition.Provider = Competition;
Competition.AddParticipant = AddParticipant;

export default Competition;
