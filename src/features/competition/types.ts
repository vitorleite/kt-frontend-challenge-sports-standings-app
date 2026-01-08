export type CompetitionParticipant = string;

export type CompetitionResult = {
  participantA: CompetitionParticipant;
  participantB: CompetitionParticipant;
  scoreA: number;
  scoreB: number;
};

export interface CompetitionConfig {
  title: string;
  matchFormat?: 'singleRoundRobin' | 'doubleRoundRobin';
  pointsSystem?: {
    win: number;
    draw: number;
    loss: number;
  };
}

export interface CompetitionState {
  participants: CompetitionParticipant[];
  results: CompetitionResult[];
}

export interface ActionResult {
  ok: boolean;
  error?: string;
}

export interface CompetitionActions {
  addParticipant: (participant: CompetitionParticipant) => ActionResult;
  addResult: (result: CompetitionResult) => ActionResult;
}

export interface CompetitionContextValue {
  config: Required<CompetitionConfig>;
  state: Required<CompetitionState>;
  actions: Required<CompetitionActions>;
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
