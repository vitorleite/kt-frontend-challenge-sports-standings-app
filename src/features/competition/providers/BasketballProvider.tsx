import type { CompetitionConfig } from '../types';
import { Provider, type CompetitionProps } from './Provider';

const defaultConfig: Partial<CompetitionConfig> = {
  matchFormat: 'singleRoundRobin',
  pointsSystem: {
    win: 2,
    draw: 0,
    loss: 1
  }
};

export function BasketballProvider({ children, config, initialState, onStateChange = () => {} }: CompetitionProps) {
  return (
    <Provider
      config={{ ...defaultConfig, ...config } as CompetitionConfig}
      initialState={initialState}
      onStateChange={onStateChange}
    >
      {children}
    </Provider>
  );
}
