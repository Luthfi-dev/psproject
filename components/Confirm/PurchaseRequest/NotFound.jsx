import Link from "next/link";

const NotFound = () =>{
  return(
    <>
      <div className="pt-lg-10 mb-10">
        <h1 className="fw-bolder fs-2qx text-light opacity-75 mb-10">Not Found !</h1>
        <div className="fw-bold fs-3 text-muted mb-15">Sorry, link confirm not found !
        <br />Please try again later.</div>
        <div className="text-center">
          <Link href={process.env.BASE_URL_OLD+'dashboard'}>
            <a className="btn btn-lg btn-primary fw-bolder">Go to dashboard</a>
          </Link>
        </div> 
      </div>
    </>
  )
}
export default NotFound;