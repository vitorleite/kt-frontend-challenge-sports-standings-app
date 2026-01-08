import { type FormEvent, useRef, useState } from 'react';
import { Button, InputText, Row, Error, Column } from '@/components/ui';
import { useCompetitionContext } from '../context';

const DEFAULT_PROPS = {
  labels: {
    participantName: 'Team Name'
  }
};

export type AddParticipantFormProps = {
  labels?: Partial<typeof DEFAULT_PROPS.labels>;
};

export function AddParticipantForm() {
  const { actions, config } = useCompetitionContext();

  const { labels } = {
    labels: { ...DEFAULT_PROPS.labels, ...config.addParticipantLabels }
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const name = inputRef.current?.value.trim() || '';

    const result = actions.addParticipant(name);

    if (!result.ok) {
      setErrorMessage(result.error || 'Failed to add participant');
      return;
    }

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleInputChange = () => {
    setErrorMessage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Column gap="sm">
        <Row>
          <InputText ref={inputRef} variant="error" onChange={handleInputChange} placeholder={labels.participantName} />
          <Button>Add</Button>
        </Row>
        {errorMessage && <Error>{errorMessage}</Error>}
      </Column>
    </form>
  );
}
