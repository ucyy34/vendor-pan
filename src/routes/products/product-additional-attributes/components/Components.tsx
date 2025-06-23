import { Input, Switch, Textarea } from "@medusajs/ui"
import { AttributeSelect } from "./AttributeSelect"

export const Components = ({
  attribute,
  field,
}: {
  attribute: any
  field: any
}) => {
  const { ui_component, possible_values } = attribute

  if (ui_component === "select")
    return <AttributeSelect values={possible_values} field={field} />

  if (ui_component === "toggle")
    return <Switch {...field} onCheckedChange={field.onChange} />

  if (ui_component === "text_area") return <Textarea {...field} rows={4} />

  return <Input placeholder="Enter value" {...field} />
}
