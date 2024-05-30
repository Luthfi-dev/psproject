import Avatar from "../../01-atoms/Symbol/Avatar";

const UserInfoHorizontal =({children,props})=>{
  const title = props?.title ? props.title : 'Title';
  const subtitle = props?.subtitle ? props.subtitle : 'Subtitle';
  const state = props?.state ? props.state : 'Online';
  const stateColor = props?.stateColor ? props.stateColor : 'success';
  const titleColor = props?.titleColor ? props.titleColor : 'white';
  const showState = props?.showState ? props.showState : true;
  const addClass = props?.addClass ? props.addClass : '';

  return(
    <div className={'d-flex align-items-center '+addClass}>
      <Avatar props={{ src: props?.avatar, size:props?.size}} />
      <div className="aside-user-info flex-row-fluid flex-wrap ms-5">
        <div className="d-flex">
          <div className="flex-grow-1 me-2">
            <a href="#" className={'text-hover-primary fs-6 fw-bold text-'+titleColor}>{title}</a>
            <span className="text-gray-600 fw-bold d-block fs-8 mb-1">{subtitle}</span>
            {
              showState  === true &&
              <div className={'d-flex align-items-center  fs-9 text-'+stateColor}>
                <span className={'bullet bullet-dot me-1 bg-'+stateColor}></span>{state}
              </div>
            }
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
export default UserInfoHorizontal;