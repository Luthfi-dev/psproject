import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import cookie from "js-cookie"

const DirectToDetail = ({detail}) =>{
  console.log(detail)
  const router = useRouter()
  const [countDown, setCountDown] = useState(30);

  useEffect(() => {
    if(countDown === 0){
      cookie.set("fast_token",detail.token_access)
      if(detail.flag === 'input_po'){
        router.push('/purchaserequest/incoming?act=inputpo&id='+detail.token)
        return
      }
      router.push('/purchaserequest/detail?id='+detail.token+'&position=inbox&state=pending')
      return
    }

    setTimeout(() => {
      setCountDown((countDown) => countDown - 1)
    }, 100)
  }, [countDown]);

  return(
    <>
      <div className="pt-lg-10 mb-10">
        <h1 className="fw-bolder fs-2qx text-light opacity-75 mb-10">Validating url...</h1>
        <div className="fw-bold fs-3 text-muted mb-15">
          Redirect please wait ...
        </div>
        <div className="text-center">
          <center>
            <div className='col-5'>
              <div className="progress">
                <div className="progress-bar  progress-bar-striped progress-bar-animated w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" ></div>
              </div>
            </div>
          </center>
        </div> 
      </div>
      <div className="d-flex flex-row-auto bgi-no-repeat bgi-position-x-center bgi-size-contain bgi-position-y-bottom min-h-100px min-h-lg-350px" ></div>
    </>
  )
}
export default DirectToDetail;