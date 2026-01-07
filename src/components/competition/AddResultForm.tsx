import { type FormEvent, useState } from 'react';
import { type Participant, type Result } from '../../types';
import { Button, Card, Column, InputText, Row, Select } from '../ui';

interface AddResultFormProps {
  participants: string[];
  onAdd: (result: Result) => void;
}

export function AddResultForm({ participants, onAdd }: AddResultFormProps) {
  const [homeParticipant, setHomeParticipant] = useState<Participant['name']>('');
  const [homeScore, setHomeScore] = useState('');
  const [awayParticipant, setAwayParticipant] = useState<Participant['name']>('');
  const [awayScore, setAwayScore] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !homeParticipant ||
      !awayParticipant ||
      homeParticipant === awayParticipant ||
      homeScore === '' ||
      awayScore === ''
    ) {
      return;
    }

    onAdd({
      homeParticipant,
      awayParticipant,
      homeScore: Number(homeScore),
      awayScore: Number(awayScore)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card.Root>
        <Card.Title>Add Score</Card.Title>
        <Row gap="sm">
          <Column gap="sm">
            <Select value={homeParticipant} onChange={(e) => setHomeParticipant(e.target.value)}>
              <option value={undefined}>Home Team</option>
              {participants.map((participant) => (
                <option key={participant} value={participant}>
                  {participant}
                </option>
              ))}
            </Select>
            <InputText placeholder="Home Score" value={homeScore} onChange={(e) => setHomeScore(e.target.value)} />
          </Column>
          <Column gap="sm">
            <Select value={awayParticipant} onChange={(e) => setAwayParticipant(e.target.value)}>
              <option value={undefined}>Away Team</option>
              {participants.map((participant) => (
                <option key={participant} value={participant}>
                  {participant}
                </option>
              ))}
            </Select>
            <InputText placeholder="Away Score" value={awayScore} onChange={(e) => setAwayScore(e.target.value)} />
          </Column>
        </Row>
        <Button>Add Score</Button>
      </Card.Root>
    </form>
  );
}
