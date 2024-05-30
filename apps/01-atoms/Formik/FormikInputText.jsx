import Currency from '../../../helper/Currency'

const FormikInputText = ({
  field,
  form,
  placeholder = 'Type here',
  isIdrCurrency = false,
  hasCallback = false,
  callback,
}) => {
  const currency = new Currency()
  return (
    <input
      placeholder={placeholder}
      className='form-control form-control-solid border'
      type='text'
      name={field.name}
      onChange={(e) => {
        const value = isIdrCurrency
          ? currency.rupiah(e.target.value)
          : e.target.value
        form.setFieldValue(field.name, value)
        if (hasCallback) callback()
      }}
      value={field.value}
    />
  )
}

export default FormikInputText
