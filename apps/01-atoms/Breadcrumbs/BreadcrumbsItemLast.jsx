import Link from "next/link";

const BreadcrumbsItemLast = ({children, props}) =>{
  const text = props?.text ? props.text : 'Breadcrumbs'
  return(
    <li className="breadcrumb-item text-muted">
      { text }
    </li>
  )
}
export default BreadcrumbsItemLast;