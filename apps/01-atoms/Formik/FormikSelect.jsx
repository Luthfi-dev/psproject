import Select from 'react-select'

const FormikSelect = ({
  field,
  form,
  options,
  placeholder = 'Select',
  hasCallback,
  callback,
}) => {
  return (
    <Select
      options={options}
      name={field.name}
      value={
        options ? options.find((option) => option.value === field.value) : ''
      }
      onChange={(option) => {
        form.setFieldValue(field.name, option.value)
        if (hasCallback) callback(option.value)
      }}
      onBlur={field.onBlur}
      placeholder={placeholder}
    />
  )
}

export default FormikSelect
