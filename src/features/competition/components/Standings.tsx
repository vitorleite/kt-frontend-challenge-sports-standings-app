import { useCompetitionContext } from '../context';
import type { CompetitionParticipantStanding } from '../types';

import type { CellRenderer } from '../utils/cellRenderer';
import styles from './Standings.module.css';

export type StandingsColumn = {
  label: string;
  key: keyof CompetitionParticipantStanding;
};

function findColumnByKey(value: string) {
  return (col: StandingsColumn) => col.key === value;
}

const defaultRenderCell: CellRenderer = (_, value) => <>{value}</>;

export interface StandingsProps {
  renderCell?: CellRenderer;
}

export function Standings({ renderCell = defaultRenderCell }: StandingsProps = {}) {
  const { standings, config } = useCompetitionContext();
  const { standingsColumns } = config;

  const teamColumnLabel = standingsColumns.find(findColumnByKey('name'))?.label || 'Team';
  const pointsColumnLabel = standingsColumns.find(findColumnByKey('points'))?.label || 'Pts';
  const columns = standingsColumns.filter((col) => col.key !== 'name' && col.key !== 'points');

  return (
    <div
      className={styles.standings}
      style={
        {
          '--columns-count': columns.length
        } as React.CSSProperties
      }
    >
      <div className={styles.standingsHeaders}>
        <div className={[styles.cell, styles.alignLeft].join(' ')}>{teamColumnLabel}</div>
        {columns.map((col) => (
          <div key={col.key} className={styles.cell}>
            {col.label}
          </div>
        ))}
        <div className={styles.cell}>{pointsColumnLabel}</div>
      </div>

      {standings.length === 0 && (
        <div className={styles.standingsEmpty}>
          <div>No participants added yet</div>
        </div>
      )}
      {standings.map((row) => (
        <div key={row.name} className={styles.standingsRow}>
          <div className={[styles.cell, styles.alignLeft, styles.truncate].join(' ')}>
            {renderCell('name', row.name, row)}
          </div>
          {columns.map((col) => (
            <div key={col.key} className={styles.cell}>
              {renderCell(col.key, row[col.key], row)}
            </div>
          ))}
          <div className={[styles.cell, styles.strong].join(' ')}>{row.points}</div>
        </div>
      ))}
    </div>
  );
}
