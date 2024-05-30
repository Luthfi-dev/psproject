import Header from "../../03-organisms/Apps/Header";
import Content from "../../03-organisms/Apps/Content";
import Footer from "../../03-organisms/Apps/Footer";

const Index = ({children,props}) =>{
  const title = props?.title ? props.title : 'Welcome'
  return(<>
    <Header props={{ title: title}}/>
    <Content props={props} >{ children }</Content>
    <Footer/>
  </>)
}
export default Index;