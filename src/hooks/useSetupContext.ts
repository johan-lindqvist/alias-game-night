import { useContext } from 'react';

import { SetupContext } from '~/components/SetupProvider';

export function useSetupContext() {
  const context = useContext(SetupContext);

  if (!context) {
    throw new Error('useSetupContext must be used as a child to SetupProvider');
  }

  return context;
}
