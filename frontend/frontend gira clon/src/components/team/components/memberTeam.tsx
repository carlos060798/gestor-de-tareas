import { TeamMember } from "../../../types";
import { useMutation,useQueryClient } from '@tanstack/react-query';
import { addTeamMember } from "../../../api/teamApi";
import { toast } from "react-toastify";
import { UserIcon } from '@heroicons/react/24/outline';



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
        <div className="flex justify-center items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="w-1/2 py-2 ">
            <p className="text-lg font-semibold text-black text-center">{user.name}</p>
          </div>
          <div className="w-1/2 py-2  flex justify-center items-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 flex items-center"
              onClick={handleaddMember}
            >
              <UserIcon className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </>
    
    );
}

export default  TeamMemberId;