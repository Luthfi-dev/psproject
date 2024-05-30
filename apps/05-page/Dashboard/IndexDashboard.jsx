import DashboardManagement from './Management/IndexDashboardManagement'
const IndexDashboard = ({ props }) =>{
  return(<>
    {
    [109].includes(Number(props?.session.userId)) &&
    <div className="row">
      <div className="col-8">
        <div className="card rounded-1">
          <iframe height={'602px'} className='rounded-1' src="https://lookerstudio.google.com/embed/reporting/05beb3f9-9801-4618-a4c6-28bc73d76d04/page/S4OgD"></iframe>
        </div>
      </div>
      <div className="col-4">
        <div className="card rounded-1 mb-2">
          <iframe height={'299px'} className='rounded-1' src="https://lookerstudio.google.com/embed/reporting/caa69b11-fdc1-4589-88e4-b52fc5afaa2c/page/S4OgD"></iframe>
        </div>
        <div className="card rounded-1">
          <iframe height={'299px'} className='rounded-1' src="https://lookerstudio.google.com/embed/reporting/07a23f0a-0ebf-42d5-8f83-55b7a76d5a95/page/S4OgD"></iframe>
        </div>
      </div>
    </div>
    }
  </>)
}
export default IndexDashboard