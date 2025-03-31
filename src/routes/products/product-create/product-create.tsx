import { useTranslation } from 'react-i18next';
import { RouteFocusModal } from '../../../components/modals';
import { useSalesChannels } from '../../../hooks/api';
// import { usePricePreferences } from '../../../hooks/api/price-preferences';
import { useStore } from '../../../hooks/api/store';
import { ProductCreateForm } from './components/product-create-form/product-create-form';

export const ProductCreate = () => {
  const { t } = useTranslation();

  const { store, isPending: isStorePending } = useStore();

  const {
    sales_channels,
    isPending: isSalesChannelPending,
  } = useSalesChannels();

  // const { price_preferences } = usePricePreferences();

  const ready =
    !!store &&
    !isStorePending &&
    !!sales_channels &&
    !isSalesChannelPending;

  return (
    <RouteFocusModal>
      <RouteFocusModal.Title asChild>
        <span className='sr-only'>
          {t('products.create.title')}
        </span>
      </RouteFocusModal.Title>
      <RouteFocusModal.Description asChild>
        <span className='sr-only'>
          {t('products.create.description')}
        </span>
      </RouteFocusModal.Description>
      {ready && (
        <ProductCreateForm
          defaultChannel={sales_channels[0]}
          store={store}
          // pricePreferences={price_preferences}
        />
      )}
    </RouteFocusModal>
  );
};
