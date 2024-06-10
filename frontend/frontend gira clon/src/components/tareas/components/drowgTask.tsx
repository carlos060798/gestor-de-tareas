import { useDroppable } from "@dnd-kit/core";



function DropTask( status ) {
    const { isOver, setNodeRef } = useDroppable({
        id: status.status
    });

    return (
        <div
            ref={setNodeRef}
            className={`mt-5 grid place-content-center text-gray-500 text-sx font-bold uppercase p-2 border border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-800 transition duration-300 ease-in-out ${isOver ? 'bg-gray-200' : ''}`}
        >
            Poner tarea {status.status}
        </div>
    );
}

export default DropTask;













/*import { useDroppable } from "@dnd-kit/core";


function DropTask(status) {
    console.log(status)

    const {isOver,setNodeRef}=useDroppable({
        id: status.status
    })
    return ( <>
    <div 
        ref={setNodeRef}
        className=" mt-5 grid place-content-center text-gray-500
         text-sx font-bold uppercase p2  border border-dashed border-gray-400 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-800 transition duration-300 ease-in-out
        "
       
    >
        poner tarea {status.status}
    </div>
    
   
    
    </>  );
}

export default DropTask;

*/