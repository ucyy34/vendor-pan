import { HttpTypes } from "@medusajs/types"
import { useStore } from "../../../../hooks/api/store"

type UsePriceListCurrencyDataReturn =
  | {
      isReady: false
      currencies: undefined
      regions: undefined
      pricePreferences: undefined
    }
  | {
      isReady: true
      currencies: HttpTypes.AdminStoreCurrency[]
      regions: HttpTypes.AdminRegion[]
      pricePreferences: HttpTypes.AdminPricePreference[]
    }

export const usePriceListCurrencyData = (): UsePriceListCurrencyDataReturn => {
  const {
    store,
    isPending: isStorePending,
    isError: isStoreError,
    error: storeError,
  } = useStore({
    fields: "+supported_currencies",
  })

  const currencies = store?.supported_currencies

  // const {
  //   price_preferences: pricePreferences,
  //   isPending: isPreferencesPending,
  //   isError: isPreferencesError,
  //   error: preferencesError,
  // } = usePricePreferences({})

  const isReady = !!currencies && !isStorePending

  if (isStoreError) {
    throw storeError
  }

  if (!isReady) {
    return {
      regions: undefined,
      currencies: undefined,
      pricePreferences: undefined,
      isReady: false,
    }
  }

  return {
    regions: [],
    currencies,
    pricePreferences: [],
    isReady,
  }
}
