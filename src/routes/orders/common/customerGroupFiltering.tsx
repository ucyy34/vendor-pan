import { HttpTypes } from "@medusajs/types"

type CustomerGroupData = {
  customer_group_id: string
  customer_group: HttpTypes.AdminCustomerGroup
}

type SortDirection = "asc" | "desc"

const getSymbol = (a: string | Date, symbol: string, b: string | Date) => {
  const dateA = new Date(a)
  const dateB = new Date(b)

  switch (symbol) {
    case "$gte":
      return dateA >= dateB
    case "$lte":
      return dateA <= dateB
    case "$gt":
      return dateA > dateB
    case "$lt":
      return dateA < dateB
    default:
      return dateA.getTime() === dateB.getTime()
  }
}

const isString = (value: unknown): value is string => {
  return typeof value === "string"
}

const sortCustomerGroups = (
  groups: CustomerGroupData[],
  sortField: keyof HttpTypes.AdminCustomerGroup,
  direction: SortDirection
) => {
  return [...groups].sort((a, b) => {
    if (!a.customer_group || !b.customer_group) return 0

    const aValue = a.customer_group[sortField]
    const bValue = b.customer_group[sortField]

    if (sortField === "name" && isString(aValue) && isString(bValue)) {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    }

    // For dates
    if (isString(aValue) && isString(bValue)) {
      const dateA = new Date(aValue)
      const dateB = new Date(bValue)
      return direction === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    }

    return 0
  })
}

export const filterCustomerGroups = (
  groups?: any[],
  filters?: Record<string, Record<string, string | Date>>,
  sort?: string
) => {
  if (!groups || !filters) return groups

  let filteredGroups = groups.filter((group) => {
    // Ensure the group has a customer_group property
    if (!group.customer_group) return false

    return Object.keys(filters).every((key: string) => {
      if (!filters[key]) return true

      const groupValue = group.customer_group[key]
      if (!groupValue) return false

      if (key === "created_at" || key === "updated_at") {
        if (!isString(groupValue)) return false
        return Object.entries(filters[key]).every(([operator, value]) => {
          return getSymbol(groupValue, operator, value as string)
        })
      }

      if (key === "name") {
        if (!isString(groupValue)) return false
        const searchValue = Object.values(filters[key])[0] as string
        return groupValue.toLowerCase().includes(searchValue.toLowerCase())
      }

      return true
    })
  })

  if (sort) {
    const isDescending = sort.startsWith("-")
    const field = isDescending ? sort.slice(1) : sort
    const direction = isDescending ? "desc" : "asc"

    if (["name", "created_at", "updated_at"].includes(field)) {
      filteredGroups = sortCustomerGroups(
        filteredGroups,
        field as keyof HttpTypes.AdminCustomerGroup,
        direction as SortDirection
      )
    }
  }

  return filteredGroups
}
