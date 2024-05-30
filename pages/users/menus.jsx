import App from "../../apps/04-templates/Apps/Index";
import IndexMenus from "../../apps/05-page/Menus/IndexMenus";

const Test = ({session}) =>{
  const props = {
    session:session,
    title:'Management Menus',
    breadcrumbs:[]
  }
  props.breadcrumbs.push({text:'Menus',link:''})
  return(<>
    <App props={props}>
      <IndexMenus>
        
      </IndexMenus>
    </App>
  </>)

}
export async function getServerSideProps(context) {
  const session = context.req.cookies.user ? JSON.parse(context.req.cookies.user):'';
  return {
    props: {session}, // will be passed to the page component as props
  }
}
export default Test;