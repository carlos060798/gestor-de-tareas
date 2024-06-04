import { TeamMember } from "../../../types";
import { useMutation, QueryClient, useQueryClient } from '@tanstack/react-query';
import { addTeamMember } from "../../../api/teamApi";
import { toast } from "react-toastify";


interface userMember{
    user: TeamMember,
    projectid: string 
    resetDate: () => void
}

function TeamMemberId({user, projectid, reset}: userMember) {
    const  queryClient=useQueryClient()
    const {mutate} = useMutation(
        {
            mutationFn: addTeamMember,
            onError: (err: Error) => {
                toast.error(err.message)
            },onSuccess: () => {
                toast.success('Miembro agregado con éxito')
                reset()
                queryClient.invalidateQueries({queryKey:['team', projectid]})
            }
        }
    )

    const handleaddMember = () => {
        const data={
            projectid,
            id: user._id
        }
        mutate(data)
    }
   
    return (
        <>
            <div className="flex justify-center">
                <div className="w-1/2 py-2 border-b border-gray-200">
                    <p className="text-lg">{user.name}</p>
                </div>
                <div className="w-1/2 py-2 border-b border-gray-200">
                <button className="bg-red-500 text-white p-2 rounded-md"
                onClick={ handleaddMember
                }
                >Agregar al proyecto</button>
                </div>
            </div>
        </>
    );
}

export default  TeamMemberId;