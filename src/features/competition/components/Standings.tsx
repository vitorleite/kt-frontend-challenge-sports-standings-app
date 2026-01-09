import { useMemo } from 'react';

import { useCompetitionContext } from '../context';
import type { CompetitionParticipant, CompetitionParticipantStanding } from '../types';

import styles from './Standings.module.css';
import type { CellRenderer } from '../utils/cellRenderer';

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
  const { state, config } = useCompetitionContext();
  const { participants, results } = state;
  const { pointsSystem, standingsColumns } = config;

  const teamColumnLabel = standingsColumns.find(findColumnByKey('name'))?.label || 'Team';
  const pointsColumnLabel = standingsColumns.find(findColumnByKey('points'))?.label || 'Pts';
  const columns = standingsColumns.filter((col) => col.key !== 'name' && col.key !== 'points');

  const standings = useMemo(() => {
    const standingsMap = new Map<CompetitionParticipant, CompetitionParticipantStanding>();

    participants.forEach((participant) => {
      standingsMap.set(participant, {
        name: participant,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        scoreFor: 0,
        scoreAgainst: 0,
        scoreDifference: 0,
        points: 0
      });
    });

    results.forEach((result) => {
      const homeTeam = standingsMap.get(result.participantA)!;
      const awayTeam = standingsMap.get(result.participantB)!;

      homeTeam.played++;
      awayTeam.played++;
      homeTeam.scoreFor += result.scoreA;
      homeTeam.scoreAgainst += result.scoreB;
      awayTeam.scoreFor += result.scoreB;
      awayTeam.scoreAgainst += result.scoreA;

      if (result.scoreA > result.scoreB) {
        homeTeam.won++;
        homeTeam.points += pointsSystem.win;
        awayTeam.lost++;
        awayTeam.points += pointsSystem.loss;
      } else if (result.scoreA < result.scoreB) {
        awayTeam.won++;
        awayTeam.points += pointsSystem.win;
        homeTeam.lost++;
        homeTeam.points += pointsSystem.loss;
      } else {
        homeTeam.drawn++;
        awayTeam.drawn++;
        homeTeam.points += pointsSystem.draw;
        awayTeam.points += pointsSystem.draw;
      }

      homeTeam.scoreDifference = homeTeam.scoreFor - homeTeam.scoreAgainst;
      awayTeam.scoreDifference = awayTeam.scoreFor - awayTeam.scoreAgainst;
    });

    return Array.from(standingsMap.values()).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.scoreDifference !== a.scoreDifference) return b.scoreDifference - a.scoreDifference;
      return b.scoreFor - a.scoreFor;
    });
  }, [participants, results, pointsSystem]);

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
