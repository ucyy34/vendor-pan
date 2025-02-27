import { _DataTable } from '../../../../components/table/data-table/data-table';
import { useRequests } from '../../../../hooks/api/requests';
import { useDataTable } from '../../../../hooks/use-data-table';
import { useRequestsTableColumns } from './use-requests-table-columns';

const PAGE_SIZE = 20;

export const RequestListTable = ({
  request_type,
}: {
  request_type: string;
}) => {
  const { requests, count, isPending, isError, error } =
    useRequests();

  const requestList =
    requests?.filter(
      ({ type }: { type: string }) => type === request_type
    ) || [];

  const columns = useRequestsTableColumns();

  const { table } = useDataTable({
    data: requestList || [],
    columns,
    count,
    enablePagination: true,
    getRowId: (row) => row.id,
    pageSize: PAGE_SIZE,
  });

  if (isError) {
    throw error;
  }

  return (
    <div>
      <_DataTable
        table={table}
        columns={columns}
        pageSize={PAGE_SIZE}
        count={count}
        isLoading={isPending}
        pagination
        // navigateTo={(row) => `/requests/${row.id}`}
        search={false}
      />
    </div>
  );
};
