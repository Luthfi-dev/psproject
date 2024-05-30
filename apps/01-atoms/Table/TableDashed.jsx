const TableDashed = ({children, props})=>{
  const addClass = props?.addClass ? props.addClass : ''
  return(
    <table className={'table table-row-dashed table-row-light align-middle gs-0 gy-1  '+addClass}>
      {children}
    </table>
  )
}
export default TableDashed