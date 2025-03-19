import { Container, Heading, Text } from '@medusajs/ui';
import { NotConnected } from './components/not-connected';

export const StripeConnect = () => {
  return (
    <Container className='divide-y p-0'>
      <div className='flex items-center justify-between px-6 py-4'>
        <div>
          <Heading>Stripe Connect</Heading>
          <Text className='text-ui-fg-subtle' size='small'>
            Connect Stripe to receive automatic payouts from
            the marketplace
          </Text>
        </div>
        <div>status</div>
      </div>
      <div className='px-6 py-4'>
        <NotConnected />
      </div>
    </Container>
  );
};
