import { ChannelTypeEnum } from '@novu/shared';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row } from 'react-table';
import { ROUTES } from '../../constants/routes.enum';

import { useIsMultiProviderConfigurationEnabled } from '../../hooks';
import { IntegrationsList } from './IntegrationsList';
import { IntegrationsStore } from './IntegrationsStorePage';
import { ITableIntegration } from './types';

export const IntegrationsListPage = () => {
  const navigate = useNavigate();
  const isIntegrationsListPageEnabled = useIsMultiProviderConfigurationEnabled();

  const onRowClickCallback = useCallback(
    (item: Row<ITableIntegration>) => {
      navigate(`/integrations/${item.original.integrationId}`);
    },
    [navigate]
  );

  const onAddProviderClickCallback = useCallback(() => {
    navigate(ROUTES.INTEGRATIONS_CREATE);
  }, [navigate]);

  const onChannelClickCallback = useCallback(
    (channel: ChannelTypeEnum) => {
      navigate(`${ROUTES.INTEGRATIONS_CREATE}/${channel}`);
    },
    [navigate]
  );

  return isIntegrationsListPageEnabled ? (
    <IntegrationsList
      onAddProviderClick={onAddProviderClickCallback}
      onRowClickCallback={onRowClickCallback}
      onChannelClick={onChannelClickCallback}
    />
  ) : (
    <IntegrationsStore />
  );
};
