import React from 'react'
import { Toggle, type ToggleProps } from '.'
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions
} from 'react-hook-form'

interface Props<T extends FieldValues> extends ToggleProps {
  control: Control<T>
  rules?: RegisterOptions
  name: Path<T>
}

const ToggleControl = <T extends FieldValues>({
  control,
  name,
  rules,
  ...rest
}: Props<T>) => {
  const {
    field: { onChange, onBlur, value },
    formState: { isSubmitting }
  } = useController({ control, name, rules })

  return (
    <Toggle
      onChangeValue={onChange}
      checked={value}
      onBlur={onBlur}
      disabled={isSubmitting}
      {...rest}
    />
  )
}

export default ToggleControl
