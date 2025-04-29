import { useForm } from "react-hook-form"
import { RouteDrawer, useRouteModal } from "../../../../components/modals"
import { z } from "zod"
import { KeyboundForm } from "../../../../components/utilities/keybound-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "../../../../components/common/form"
import { Button, Input, toast } from "@medusajs/ui"
import { HandleInput } from "../../../../components/inputs/handle-input"
import { useTranslation } from "react-i18next"
import { useUpdateVendorRequest } from "../../../../hooks/api"

const EditCategorySchema = z.object({
  name: z.string().min(1),
  handle: z.string().optional(),
})

export const EditCategoryRequestForm = ({ request }: { request: any }) => {
  const { t } = useTranslation()
  const { handleSuccess } = useRouteModal()

  const form = useForm<z.infer<typeof EditCategorySchema>>({
    defaultValues: {
      name: request.data.name,
      handle: request.data.handle,
    },
    resolver: zodResolver(EditCategorySchema),
  })

  const { mutateAsync, isPending } = useUpdateVendorRequest(request.id!)

  const handleSubmit = form.handleSubmit(async (data) => {
    await mutateAsync(
      {
        request: {
          type: request.type,
          data,
        },
      },
      {
        onSuccess: () => {
          toast.success("Request updated successfully")
          handleSuccess()
        },
        onError: (error) => {
          toast.error(error.message)
        },
      }
    )
  })

  return (
    <RouteDrawer.Form form={form}>
      <KeyboundForm onSubmit={handleSubmit} className="flex flex-1 flex-col">
        <RouteDrawer.Body>
          <div className="flex flex-col gap-y-4">
            <Form.Field
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <Form.Item>
                    <Form.Label>Title</Form.Label>
                    <Form.Control>
                      <Input autoComplete="off" {...field} />
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )
              }}
            />
            <Form.Field
              control={form.control}
              name="handle"
              render={({ field }) => {
                return (
                  <Form.Item>
                    <Form.Label
                      optional
                      tooltip={t("collections.handleTooltip")}
                    >
                      Handle
                    </Form.Label>
                    <Form.Control>
                      <HandleInput {...field} />
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )
              }}
            />
          </div>
        </RouteDrawer.Body>
        <RouteDrawer.Footer>
          <div className="flex items-center gap-x-2">
            <RouteDrawer.Close asChild>
              <Button size="small" variant="secondary">
                {t("actions.cancel")}
              </Button>
            </RouteDrawer.Close>
            <Button size="small" type="submit" isLoading={isPending}>
              {t("actions.save")}
            </Button>
          </div>
        </RouteDrawer.Footer>
      </KeyboundForm>
    </RouteDrawer.Form>
  )
}
