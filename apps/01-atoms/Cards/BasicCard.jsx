export default function BasicCard({children,props}){
  const addClass = props?.addClass ? props?.addClass:'';
  return(<div className={'card card-xl-stretch '+addClass}>
    {children}
  </div>)
}