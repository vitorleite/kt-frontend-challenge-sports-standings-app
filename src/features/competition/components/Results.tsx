import { Column, Row } from '@/components/ui';
import { useCompetitionContext } from '../context';

export interface ResultsProps {
  renderName?: (name: string) => React.ReactNode;
}

export function Results({ renderName }: ResultsProps) {
  const { state } = useCompetitionContext();
  const { results } = state;

  return (
    <>
      {results.map((result) => (
        <Column key={`${result.participantA}-vs-${result.participantB}`} gap="lg">
          <Row gap="space-between">
            <Row gap="lg">
              <div>{renderName ? renderName(result.participantA) : result.participantA}</div>
              <div>vs</div>
              <div>{renderName ? renderName(result.participantB) : result.participantB}</div>
            </Row>
            <strong>{`${result.scoreA}-${result.scoreB}`}</strong>
          </Row>
        </Column>
      ))}
    </>
  );
}
