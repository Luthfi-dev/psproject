import Router, { useRouter } from 'next/router';
import Link from 'next/link';

const ContinuousFormError = ({appsData}) =>{ 
  const router = useRouter();
  return(
    <>
      <div className="card bg-transparent">
        <div className="card-body p-0">
          <div className="card-px text-center py-20 my-10">
            <h2 className="fs-2x fw-bolder mb-10 text-primary">
              Sorry !
            </h2>
            <p className=" fs-4 fw-bold mb-10 text-danger">
              <small>{appsData?.detail?.message}<br/>
              Draft can't continuous completed, you can try again to reload data or create new request.
              </small><br/>
            </p>
            <button className="btn btn-danger me-2">
              <i className="las la-undo-alt fs-2 "></i> 
              <Link href={router.asPath} >
                <a className='text-light'>Try Again</a>
              </Link>
            </button>
            <button className="btn btn-primary">
              <i className="las la-undo-alt fs-2 "></i> 
              <Link href={'/goodsandservices/create'} >
                <a className='text-light text-actived-light'>Create New Request</a>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default ContinuousFormError;