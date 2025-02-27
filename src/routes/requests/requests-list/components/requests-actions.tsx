import { PencilSquare, Trash } from '@medusajs/icons';

import { ActionMenu } from '../../../../components/common/action-menu';
import { useDeleteReservationItem } from '../../../../hooks/api/reservations';
import { usePrompt } from '@medusajs/ui';
import { useTranslation } from 'react-i18next';

const getRequestType = (type: string) => {
  switch (type) {
    case 'product_category':
      return 'categories';
    case 'product_collection':
      return 'collections';
    default:
      return '';
  }
};
export const RequestsActions = ({
  request,
}: {
  request: any;
}) => {
  const { t } = useTranslation();
  const prompt = usePrompt();
  const { mutateAsync } = useDeleteReservationItem(
    request.id
  );

  const type = getRequestType(request.type);

  const handleDelete = async () => {
    const res = await prompt({
      title: t('general.areYouSure'),
      description: t('reservations.deleteWarning'),
      confirmText: t('actions.delete'),
      cancelText: t('actions.cancel'),
    });

    if (!res) {
      return;
    }

    await mutateAsync();
  };

  return (
    <ActionMenu
      groups={[
        {
          actions: [
            {
              label: t('actions.edit'),
              to: `/requests/${type}/${request.id}/edit`,
              icon: <PencilSquare />,
            },
          ],
        },
        {
          actions: [
            {
              label: t('actions.delete'),
              onClick: handleDelete,
              icon: <Trash />,
            },
          ],
        },
      ]}
    />
  );
};
