import { useOnboarding } from '../../hooks/api';
import { DashboardCharts } from './components/dashboard-charts';
import { DashboardOnboarding } from './components/dashboard-onboarding';

export const Dashboard = () => {
  const { onboarding, isError, error } = useOnboarding();

  console.log({ onboarding, isError, error });
  if (isError) {
    throw error;
  }

  if (
    !onboarding?.products ||
    !onboarding?.locations_shipping ||
    !onboarding?.store_information ||
    !onboarding?.stripe_connect
  )
    return (
      <DashboardOnboarding
        products={onboarding?.products}
        locations_shipping={onboarding?.locations_shipping}
        store_information={onboarding?.store_information}
        stripe_connect={onboarding?.stripe_connect}
      />
    );

  return <DashboardCharts />;
};
