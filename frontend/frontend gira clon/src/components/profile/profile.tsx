import useAuth from "../../hook/useAuth";
import ProfileForm from "./components/formChangeUser";


function ProfileUser() { 
    const  {data,isLoading} = useAuth();

    if(isLoading) return <h1>Cargando...</h1>
    return ( <>
     <ProfileForm data={data}/>
    </> );
}

export default ProfileUser;