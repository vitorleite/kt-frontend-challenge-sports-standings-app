import { useCompetitionContext } from '../context';

export function Debug() {
  const { config, state } = useCompetitionContext();
  return (
    <div style={{ fontSize: '0.8rem' }}>
      <h3>Competition Debug Info</h3>
      <pre>{JSON.stringify({ config, state }, null, 2)}</pre>
    </div>
  );
}
