import type { AddParticipantFormProps, AddResultFormProps, StandingsColumn } from './components';

export type CompetitionParticipant = string;

export type CompetitionResult = {
  participantA: CompetitionParticipant;
  participantB: CompetitionParticipant;
  scoreA: number;
  scoreB: number;
};

export interface CompetitionConfig {
  title: string;
  // I'd separate 'title' from these 'rules' and also from 'customisations' below
  matchFormat?: 'singleRoundRobin' | 'doubleRoundRobin';
  pointsSystem?: {
    win: number;
    draw: number;
    loss: number;
  };
  // These below would be 'customisations', but a better approach could be i18n with namespaces
  addParticipantLabels?: AddParticipantFormProps['labels'];
  addResultLabels?: AddResultFormProps['labels'];
  // A more optimised version would be an object/map with the 'key' as key and a config as value
  standingsColumns?: StandingsColumn[];
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
