import { type FormEvent, useState } from 'react';
import { Button, Column, InputText, Row, Select, Error } from '@/components/ui';
import { useCompetitionContext } from '../context';

const DEFAULT_PROPS = {
  labels: {
    homeParticipant: 'Home Team',
    homeResult: 'Home Result',
    awayParticipant: 'Away Team',
    awayResult: 'Away Result'
  }
};

export type AddResultFormProps = {
  labels?: Partial<typeof DEFAULT_PROPS.labels>;
};

export function AddResultForm() {
  const {
    config,
    state: { participants },
    actions
  } = useCompetitionContext();

  const { labels } = {
    labels: { ...DEFAULT_PROPS.labels, ...config.addResultLabels }
  };

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [participantA, setParticipantA] = useState('');
  const [participantB, setParticipantB] = useState('');
  const [scoreA, setScoreA] = useState('');
  const [scoreB, setScoreB] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const result = actions.addResult({
      participantA,
      participantB,
      scoreA: Number(scoreA),
      scoreB: Number(scoreB)
    });

    if (!result.ok) {
      setErrorMessage(result.error || 'Failed to add result');
      return;
    }

    // Clear form
    setParticipantA('');
    setParticipantB('');
    setScoreA('');
    setScoreB('');
    setErrorMessage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row gap="sm">
        <Column gap="sm">
          <Select value={participantA} onChange={(e) => setParticipantA(e.target.value)}>
            <option value="" disabled>
              {labels.homeParticipant}
            </option>
            {participants.map((participant) => (
              <option key={participant} value={participant}>
                {participant}
              </option>
            ))}
          </Select>
          <InputText placeholder={labels.homeResult} value={scoreA} onChange={(e) => setScoreA(e.target.value)} />
        </Column>
        <Column gap="sm">
          <Select value={participantB} onChange={(e) => setParticipantB(e.target.value)}>
            <option value="" disabled>
              {labels.awayParticipant}
            </option>
            {participants.map((participant) => (
              <option key={participant} value={participant}>
                {participant}
              </option>
            ))}
          </Select>
          <InputText placeholder={labels.awayResult} value={scoreB} onChange={(e) => setScoreB(e.target.value)} />
        </Column>
      </Row>
      <Column marginTop="sm">
        <Button>Add Score</Button>
        {errorMessage && <Error>{errorMessage}</Error>}
      </Column>
    </form>
  );
}
