import type React from 'react';
import type { CompetitionParticipantStanding } from '../types';

export type CellRenderer = (
  key: keyof CompetitionParticipantStanding,
  value: unknown,
  row: CompetitionParticipantStanding
) => React.ReactNode;

type CellOverrides = {
  [K in keyof CompetitionParticipantStanding]?: (value: CompetitionParticipantStanding[K]) => React.ReactNode;
};

export function createCellRenderer(overrides: CellOverrides): CellRenderer {
  return (key, value): React.ReactNode => {
    const override = overrides[key];
    return override ? override(value as never) : (value as React.ReactNode);
  };
}
