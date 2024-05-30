import { useState } from "react";
import Apps from "../../Template/Apps";
import ProfileHeader from "./Components/ProfileHeader";
import ProfileDetailsCard from "./Components/ProfileDetailsCard";

const ContainerProfile = ({appsData}) => {
  const [userData,setUserData] = useState()
  const [tab, seTab] = useState(0);

  return (
    <>
        <ProfileHeader userData={userData} seTab={seTab} tab={tab}/>      
        <ProfileDetailsCard setUserData={setUserData} userData={userData} tab={tab} />
    </>
  ) 
}
export default ContainerProfile;