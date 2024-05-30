import App from "../apps/04-templates/Apps/Index";
import IndexDashboard from "../apps/05-page/Dashboard/IndexDashboard";

const Home = ({ session }) =>{
  const props = {
    session:session,
    title:'Dashboard',
    breadcrumbs:[]
  }
  return(<>
    <App props={props}>
      <IndexDashboard props={ props }/>
    </App>
  </>)

}
export async function getServerSideProps(context) {
  const session = context.req.cookies.user ? JSON.parse(context.req.cookies.user):'';
  return {
    props: {session}, // will be passed to the page component as props
  }
}
export default Home;