import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Button, Card, InputText, Row, Error } from '../ui';

interface AddParticipantFormProps {
  participants: string[];
  onAdd: (name: string) => void;
}

export function AddParticipantForm({ participants, onAdd }: AddParticipantFormProps) {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (name.trim() === '') {
      setErrorMessage(`Participant name cannot be empty`);
      return;
    }

    const alreadyExists = participants.some((participant) => participant.toLowerCase() === name.toLowerCase());
    if (alreadyExists) {
      setErrorMessage(`Participant already exists`);
      return;
    }

    onAdd(name.trim());
    setName('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setName(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card.Root>
        <Card.Title>Add Team</Card.Title>
        <Row>
          <InputText variant="error" value={name} onChange={handleInputChange} placeholder="Team Name" />
          <Button>Add</Button>
        </Row>
        {errorMessage && <Error>{errorMessage}</Error>}
      </Card.Root>
    </form>
  );
}
