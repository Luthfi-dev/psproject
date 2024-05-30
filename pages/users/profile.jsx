import App from "../../apps/04-templates/Apps/Index";
import ProfileIndex from "../../apps/05-page/Users/ProfileIndex";
import { useState } from "react";

const profile = ({session}) =>{
  const [title, setTitle] = useState('Users Profile');
  const props = {
    session:session,
    title,
    breadcrumbs:[]
  }
  props.breadcrumbs.push({text:'Users',link:''})
  props.breadcrumbs.push({text:'Profile',link:''})
  return(<>
    <App props={props}>
      <ProfileIndex props={props} changeHeader={(title)=>{ setTitle(title) }} />
    </App>
  </>)
}
export async function getServerSideProps(context) {
  const session = context.req.cookies.user ? JSON.parse(context.req.cookies.user):'';
  return {
    props: {session}, // will be passed to the page component as props
  }
}
export default profile;