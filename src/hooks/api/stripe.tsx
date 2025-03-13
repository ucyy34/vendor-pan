import {
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { fetchQuery } from '../../lib/client';
import { queryClient } from '../../lib/query-client';
import { FetchError } from '@medusajs/js-sdk';
import { queryKeysFactory } from '../../lib/query-key-factory';

const STRIPE_QUERY_KEY = 'stripe' as const;
export const stripeQueryKeys = queryKeysFactory(
  STRIPE_QUERY_KEY
);

export const useCreateStripeAccount = (
  options?: UseMutationOptions<any, FetchError, any>
) => {
  return useMutation({
    mutationFn: (payload) =>
      fetchQuery('/vendor/payout-account', {
        method: 'POST',
        body: payload,
      }),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [STRIPE_QUERY_KEY, 'account'],
      });

      options?.onSuccess?.(data, variables, context);
    },
    ...options,
  });
};
