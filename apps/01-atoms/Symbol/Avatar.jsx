import { serverAssets , imgLoader} from "../../../utility/Image";
import Image from "next/image";

const Avatar = ({children, props}) =>{
  const size = props?.size ? props.size : '50px';
  const sourceURL = props?.src ? props.src : 'media/avatars/blank.png';
  const imageLoader = props?.loader === 'local' ? imgLoader : serverAssets;
  return(
    <div className={'symbol symbol-'+size}>
      <div className={'container-img w-'+size}>
        <Image
        src={sourceURL}
        layout="fill"
        className={'img symbol symbol-'+size}
        priority={true}
        loader={ imageLoader }
        />
      </div>
    </div>
  )
}
export default Avatar;