import { createContext, use, useState } from 'react';

type CompetitionParticipant = string;

type CompetitionResult = {
  participantA: CompetitionParticipant;
  participantB: CompetitionParticipant;
  scoreA: number;
  scoreB: number;
};

interface CompetitionConfig {
  title: string;
}

interface CompetitionState {
  participants: CompetitionParticipant[];
  results: CompetitionResult[];
}

interface CompetitionActions {
  addParticipant: (participant: CompetitionParticipant) => void;
  addResult: (result: CompetitionResult) => void;
}

interface CompetitionContextValue {
  config: CompetitionConfig;
  state: CompetitionState;
  actions: CompetitionActions;
}

const CompetitionContext = createContext<CompetitionContextValue | null>(null);

const useCompetitionContext = () => {
  const context = use(CompetitionContext);
  if (!context) {
    throw new Error('Competition components must be used within a Competition.Provider');
  }
  return context;
};

interface CompetitionProps {
  children: React.ReactNode;
  config: CompetitionConfig;
  initialState?: CompetitionState;
}

const Competition = ({ children, config, initialState }: CompetitionProps) => {
  const [participants, setParticipants] = useState<CompetitionParticipant[]>(initialState?.participants || []);
  const [results, setResults] = useState<CompetitionResult[]>(initialState?.results || []);

  const actions: CompetitionActions = {
    addParticipant: (participant: CompetitionParticipant) => {
      if (!participants.includes(participant)) {
        setParticipants([...participants, participant]);
      }
    },
    addResult: (result: CompetitionResult) => {
      setResults([...results, result]);
    }
  };

  return (
    <CompetitionContext.Provider
      value={{
        config,
        actions,
        state: { participants, results }
      }}
    >
      {children}
    </CompetitionContext.Provider>
  );
};

const Debug = () => {
  const { config, state } = useCompetitionContext();
  return (
    <div style={{ fontSize: '0.8rem' }}>
      <h3>Competition Debug Info</h3>
      <pre>{JSON.stringify({ config, state }, null, 2)}</pre>
    </div>
  );
};

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
