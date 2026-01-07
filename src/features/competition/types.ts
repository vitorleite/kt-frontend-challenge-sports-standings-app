export type CompetitionParticipant = string;

export type CompetitionResult = {
  participantA: CompetitionParticipant;
  participantB: CompetitionParticipant;
  scoreA: number;
  scoreB: number;
};

export interface CompetitionConfig {
  title: string;
}

export interface CompetitionState {
  participants: CompetitionParticipant[];
  results: CompetitionResult[];
}

export interface CompetitionActions {
  addParticipant: (participant: CompetitionParticipant) => void;
  addResult: (result: CompetitionResult) => void;
}

export interface CompetitionContextValue {
  config: CompetitionConfig;
  state: CompetitionState;
  actions: CompetitionActions;
}
