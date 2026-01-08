import * as components from './components';
import * as providers from './providers';

export const Competition = {
  ...components,
  ...providers
};

export { useCompetitionContext } from './context';
