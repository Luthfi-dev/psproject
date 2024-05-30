import Router, { useRouter } from 'next/router';
import Link from 'next/link';

const Failed = ({appsData}) =>{ 
  const router = useRouter();
  return(
    <>
      <div className="card bg-transparent">
        <div className="card-body p-0">
          <div className="card-px text-center py-20 my-10">
            <h2 className="fs-2x fw-bolder mb-10 text-primary">
              {
                appsData?.error?.code === 'ECONNREFUSED' ?
                "Connection !"
                :
                'Failed !'
              }
            </h2>
            <p className=" fs-4 fw-bold mb-10 text-danger">
              {
                appsData?.error?.code === 'ECONNREFUSED' ?
                "Check your internet connection."
                :
                appsData?.error?.message
              }
            </p>
            <button className="btn btn-danger">
              <i className="las la-undo-alt fs-2 "></i> 
              <Link href={router.asPath} >
                <a className='text-light'>Try Again</a>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Failed;