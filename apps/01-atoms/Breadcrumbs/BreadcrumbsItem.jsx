import Link from "next/link";

const BreadcrumbsItem = ({children, props}) =>{
  const text = props?.text ? props.text : 'Breadcrumbs'
  const link = props?.link ? props.link : '#'
  return(
    <li className="breadcrumb-item text-muted">
      <Link href={ link }>
        <a className="text-muted text-hover-primary">{ text }</a>
      </Link>
    </li>
  )
}
export default BreadcrumbsItem;