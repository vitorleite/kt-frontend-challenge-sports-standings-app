export type CompetitionParticipant = string;

export type CompetitionResult = {
  participantA: CompetitionParticipant;
  participantB: CompetitionParticipant;
  scoreA: number;
  scoreB: number;
};

export interface CompetitionConfig {
  title: string;
  iconName?: string;
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

export interface CompetitionParticipantStanding {
  name: CompetitionParticipant;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  scoreFor: number;
  scoreAgainst: number;
  scoreDifference: number;
  points: number;
}
