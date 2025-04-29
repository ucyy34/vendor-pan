import { Heading } from "@medusajs/ui"
import { RouteDrawer } from "../../../components/modals"
import { useParams } from "react-router-dom"
import { useRequest } from "../../../hooks/api"
import { EditCollectionRequestForm } from "./components/EditCollectionRequestForm"
import { EditCategoryRequestForm } from "./components/EditCategoryRequestForm"

export const RequestEdit = () => {
  const { id } = useParams()
  const { request, isLoading } = useRequest(id!)

  const requestTypes = {
    product_category: {
      label: "Product Category",
      component: <EditCategoryRequestForm request={request} />,
    },
    product_collection: {
      label: "Product Collection",
      component: <EditCollectionRequestForm request={request} />,
    },
  }

  if (!request) return null

  return (
    <RouteDrawer>
      <RouteDrawer.Header>
        <RouteDrawer.Title asChild>
          <Heading>
            {requestTypes[request.type as keyof typeof requestTypes].label}{" "}
            Request Edit
          </Heading>
        </RouteDrawer.Title>
        <RouteDrawer.Description className="sr-only">
          Edit your request
        </RouteDrawer.Description>
      </RouteDrawer.Header>
      {!isLoading &&
        request &&
        requestTypes[request.type as keyof typeof requestTypes].component}
    </RouteDrawer>
  )
}
