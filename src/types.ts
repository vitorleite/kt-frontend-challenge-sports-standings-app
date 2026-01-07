export type Participant = {
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  points: number;
};

export type Result = {
  homeParticipant: string;
  awayParticipant: string;
  homeScore: number;
  awayScore: number;
};

export type Competition = {
  name: string;
  participants: Participant[];
  results: Result[];
};
