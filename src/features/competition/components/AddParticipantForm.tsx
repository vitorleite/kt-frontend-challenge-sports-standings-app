import { type FormEvent, useRef, useState } from 'react';
import { Button, InputText, Row, Error, Column } from '@/components/ui';
import { useCompetitionContext } from '../context';

export function AddParticipantForm() {
  const { actions } = useCompetitionContext();

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
          <InputText ref={inputRef} variant="error" onChange={handleInputChange} placeholder="Team Name" />
          <Button>Add</Button>
        </Row>
        {errorMessage && <Error>{errorMessage}</Error>}
      </Column>
    </form>
  );
}
