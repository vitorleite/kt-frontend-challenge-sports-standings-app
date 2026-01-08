import { Column, Row } from '@/components/ui';
import { useCompetitionContext } from '../context';

export function Results() {
  const { state } = useCompetitionContext();
  const { results } = state;

  return (
    <>
      {results.map((result) => (
        <Column key={`${result.participantA}-vs-${result.participantB}`} gap="lg">
          <Row gap="space-between">
            <Row gap="lg">
              <div>{result.participantA}</div>
              <div>vs</div>
              <div>{result.participantB}</div>
            </Row>
            <strong>{`${result.scoreA}-${result.scoreB}`}</strong>
          </Row>
        </Column>
      ))}
    </>
  );
}
