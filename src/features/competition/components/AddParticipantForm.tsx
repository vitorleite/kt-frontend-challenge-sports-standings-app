import { type FormEvent, useRef, useState } from 'react';
import { Button, InputText, Row, Error } from '@/components/ui';
import { useCompetitionContext } from '../context';

export function AddParticipantForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { state, actions } = useCompetitionContext();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const name = inputRef.current?.value.trim() || '';

    if (name === '') {
      setErrorMessage(`Participant name cannot be empty`);
      return;
    }

    const alreadyExists = state.participants.some((participant) => participant.toLowerCase() === name.toLowerCase());
    if (alreadyExists) {
      setErrorMessage(`Participant already exists`);
      return;
    }

    actions.addParticipant(name);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleInputChange = () => {
    setErrorMessage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Row>
        <InputText ref={inputRef} variant="error" onChange={handleInputChange} placeholder="Team Name" />
        <Button>Add</Button>
      </Row>
      {errorMessage && <Error>{errorMessage}</Error>}
    </form>
  );
}
