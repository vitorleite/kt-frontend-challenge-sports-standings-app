import { type FormEvent, useState } from 'react';
import { Button, Column, InputText, Row, Select } from '@/components/ui';
import { useCompetitionContext } from '../context';

export function AddResultForm() {
  const {
    state: { participants },
    actions
  } = useCompetitionContext();

  const [participantA, setParticipantA] = useState('');
  const [participantB, setParticipantB] = useState('');
  const [scoreA, setScoreA] = useState('');
  const [scoreB, setScoreB] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    actions.addResult({
      participantA,
      participantB,
      scoreA: Number(scoreA),
      scoreB: Number(scoreB)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row gap="sm">
        <Column gap="sm">
          <Select value={participantA} onChange={(e) => setParticipantA(e.target.value)}>
            <option value={undefined}>Home Team</option>
            {participants.map((participant) => (
              <option key={participant} value={participant}>
                {participant}
              </option>
            ))}
          </Select>
          <InputText placeholder="Home Score" value={scoreA} onChange={(e) => setScoreA(e.target.value)} />
        </Column>
        <Column gap="sm">
          <Select value={participantB} onChange={(e) => setParticipantB(e.target.value)}>
            <option value={undefined}>Away Team</option>
            {participants.map((participant) => (
              <option key={participant} value={participant}>
                {participant}
              </option>
            ))}
          </Select>
          <InputText placeholder="Away Score" value={scoreB} onChange={(e) => setScoreB(e.target.value)} />
        </Column>
      </Row>
      <Column marginTop="sm">
        <Button>Add Score</Button>
      </Column>
    </form>
  );
}
