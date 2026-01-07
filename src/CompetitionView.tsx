import { useEffect, useState } from 'react';
import { Column } from './components/ui';
import { CompetitionHeader, AddParticipantForm, AddResultForm } from './components/competition';
import type { Participant, Result } from './types';

export function CompetitionView() {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [participantNames, setParticipantNames] = useState<string[]>([]);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    setParticipantNames(participants.map((p) => p.name));
  }, [participants]);

  const handleAddParticipant = (name: Participant['name']) => {
    const exists = participants.some((p) => p.name === name);
    if (!exists) {
      setParticipants([...participants, { name, played: 0, won: 0, drawn: 0, lost: 0, points: 0 }]);
    }
  };

  const handleAddResult = (result: Result) => {
    const { homeParticipant, awayParticipant, homeScore, awayScore } = result;
    setResults([...results, result]);

    /* TODO: move to redux, but calculate on render instead of updating state directly */
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) => {
        if (participant.name === homeParticipant) {
          const updatedParticipant = { ...participant, played: participant.played + 1 };
          if (homeScore > awayScore) {
            updatedParticipant.won += 1;
            updatedParticipant.points += 3;
          } else if (homeScore < awayScore) {
            updatedParticipant.lost += 1;
          } else {
            updatedParticipant.drawn += 1;
            updatedParticipant.points += 1;
          }
          return updatedParticipant;
        } else if (participant.name === awayParticipant) {
          const updatedParticipant = { ...participant, played: participant.played + 1 };
          if (awayScore > homeScore) {
            updatedParticipant.won += 1;
            updatedParticipant.points += 3;
          } else if (awayScore < homeScore) {
            updatedParticipant.lost += 1;
          } else {
            updatedParticipant.drawn += 1;
            updatedParticipant.points += 1;
          }
          return updatedParticipant;
        }
        return participant;
      })
    );
  };

  return (
    <>
      <Column gap="lg" padding="lg">
        <AddParticipantForm participants={participantNames} onAdd={handleAddParticipant} />
        <AddResultForm participants={participantNames} onAdd={handleAddResult} />

        <section className="standingsGrid">
          <div className="standingsGridHeaders">
            <div>Team</div>
            <div className="cell center">P</div>
            <div className="cell center">W</div>
            <div className="cell center">D</div>
            <div className="cell center">L</div>
            <div className="cell center">Pts</div>
          </div>

          {participants.length === 0 && <div className="standingsGridEmpty">No participants added yet</div>}
          {participants.map((participant, index) => (
            <div key={index} className="standingsGridRow">
              <div>
                <span>{participant.name}</span>
              </div>
              <div className="cell center">{participant.played}</div>
              <div className="cell center">{participant.won}</div>
              <div className="cell center">{participant.drawn}</div>
              <div className="cell center">{participant.lost}</div>
              <div className="cell center strong">{participant.points}</div>
            </div>
          ))}
        </section>
      </Column>
    </>
  );
}
