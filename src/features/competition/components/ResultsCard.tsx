import { useCompetitionContext } from '../context';
import { Competition } from '..';
import { Card } from '@/components/ui';

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
