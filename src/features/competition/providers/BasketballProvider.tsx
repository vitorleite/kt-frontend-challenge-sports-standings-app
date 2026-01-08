import type { CompetitionConfig } from '../types';
import { Provider, type CompetitionProps } from './Provider';

const basketballConfig: Partial<CompetitionConfig> = {
  matchFormat: 'singleRoundRobin',
  pointsSystem: {
    win: 2,
    draw: 0,
    loss: 1
  },
  standingsColumns: [
    { label: 'W', key: 'won' },
    { label: 'L', key: 'lost' },
    { label: 'D', key: 'drawn' }
  ]
};

export function BasketballProvider({ children, config, initialState, onStateChange = () => {} }: CompetitionProps) {
  return (
    <Provider
      config={{ ...basketballConfig, ...config } as CompetitionConfig}
      initialState={initialState}
      onStateChange={onStateChange}
    >
      {children}
    </Provider>
  );
}
