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

export interface ActionResult {
  ok: boolean;
  error?: string;
}

export interface CompetitionActions {
  addParticipant: (participant: CompetitionParticipant) => ActionResult;
  addResult: (result: CompetitionResult) => ActionResult;
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
