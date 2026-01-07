import { useMemo } from 'react';

import { useCompetitionContext } from '../context';
import type { CompetitionParticipant, CompetitionParticipantStanding } from '../types';

import styles from './Standings.module.css';

export function Standings() {
  const { state } = useCompetitionContext();
  const { participants, results } = state;

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
        homeTeam.points += 3;
        awayTeam.lost++;
      } else if (result.scoreA < result.scoreB) {
        awayTeam.won++;
        awayTeam.points += 3;
        homeTeam.lost++;
      } else {
        homeTeam.drawn++;
        awayTeam.drawn++;
        homeTeam.points += 1;
        awayTeam.points += 1;
      }

      homeTeam.scoreDifference = homeTeam.scoreFor - homeTeam.scoreAgainst;
      awayTeam.scoreDifference = awayTeam.scoreFor - awayTeam.scoreAgainst;
    });

    return Array.from(standingsMap.values()).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.scoreDifference !== a.scoreDifference) return b.scoreDifference - a.scoreDifference;
      return b.scoreFor - a.scoreFor;
    });
  }, [participants, results]);

  return (
    <div className={styles.standingsGrid}>
      <div className={styles.standingsGridHeaders}>
        <div className={`${styles.cell} ${styles.alignLeft}`}>Team</div>
        <div className={styles.cell}>P</div>
        <div className={styles.cell}>W</div>
        <div className={styles.cell}>D</div>
        <div className={styles.cell}>L</div>
        <div className={styles.cell}>Pts</div>
      </div>

      {standings.length === 0 && <div className={styles.standingsGridEmpty}>No participants added yet</div>}
      {standings.map((row) => (
        <div key={row.name} className={styles.standingsGridRow}>
          <div>
            <span>{row.name}</span>
          </div>
          <div className={styles.cell}>{row.played}</div>
          <div className={styles.cell}>{row.won}</div>
          <div className={styles.cell}>{row.drawn}</div>
          <div className={styles.cell}>{row.lost}</div>
          <div className={styles.cell}>{row.points}</div>
        </div>
      ))}
    </div>
  );
}
