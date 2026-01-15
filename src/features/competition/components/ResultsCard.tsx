import { Card } from '@/components/ui';
import { Competition } from '..';
import { useCompetitionContext } from '../context';

export function ResultsCard() {
  const { state } = useCompetitionContext();
  const { results } = state;

  if (results.length > 0) {
    return (
      <Card.Root>
        <Competition.Results />
      </Card.Root>
    );
  }
}
