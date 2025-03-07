import { LoaderFunctionArgs } from 'react-router-dom';

import { inventoryItemsQueryKeys } from '../../../hooks/api/inventory';
import { fetchQuery } from '../../../lib/client';
import { queryClient } from '../../../lib/query-client';

const inventoryDetailQuery = (id: string) => ({
  queryKey: inventoryItemsQueryKeys.detail(id),
  queryFn: async () =>
    fetchQuery(`/vendor/inventory-items/${id}`, {
      method: 'GET',
    }),
});

export const inventoryItemLoader = async ({
  params,
}: LoaderFunctionArgs) => {
  const id = params.id;
  const query = inventoryDetailQuery(id!);

  return queryClient.ensureQueryData(query);
};
