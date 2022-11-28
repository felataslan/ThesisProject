import React from 'react'
import Menu from '../components/Menu'

const Profile = () => {



  return (
    <div>
        <Menu isLogin={localStorage.getItem("token")? true:false}/>

          <h1>User Profile</h1>  

    </div>
  )
}
export default Profile;