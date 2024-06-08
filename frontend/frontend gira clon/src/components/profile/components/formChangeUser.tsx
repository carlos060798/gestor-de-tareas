import { useForm } from "react-hook-form"
import ErrorMensaje from "../../Error.mensaje"
import { updateUser } from "../../../api/user"
import { useMutation,useQueryClient} from "@tanstack/react-query"
import { toast } from "react-toastify"
import { UserIcon } from '@heroicons/react/20/solid';




export default function ProfileForm({ data }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: data });
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: updateUser,
        onError: (error) => {
            console.log(error);
            toast.error('Error al actualizar el usuario');
        },
        onSuccess: () => {
            toast.success('Usuario actualizado');
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
    });

    const handleEditProfile = (formData) => {
        console.log(formData);
        mutate(formData);
    };

    return (
        <div className="mx-auto max-w-3xl">
        <h3 className="text-5xl font-black flex items-center justify-center">
            <UserIcon className="h-11 w-11 text-blue-600 mr-2" /> 
        </h3>

        <form
            onSubmit={handleSubmit(handleEditProfile)}
            className="mt-14 mx-auto grid grid-cols-7 gap-5 max-w-lg"
            noValidate
        >
            <div className="col-span-7 mb-5 space-y-3">
                <label className="text-sm uppercase font-bold" htmlFor="name">Nombre</label>
                <input
                    id="name"
                    type="text"
                    placeholder="Tu Nombre"
                    className="w-full p-3 border border-gray-200"
                    {...register("name", { required: "Nombre de usuario es obligatorio" })}
                />
                {errors.name && <ErrorMensaje>{errors.name.message}</ErrorMensaje>}
            </div>

            <div className="col-span-7 mb-5 space-y-3">
                <label className="text-sm uppercase font-bold" htmlFor="email">E-mail</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Tu Email"
                    className="w-full p-3 border border-gray-200"
                    {...register("email", {
                        required: "El e-mail es obligatorio",
                        pattern: { value: /\S+@\S+\.\S+/, message: "E-mail no válido" },
                    })}
                />
                {errors.email && <ErrorMensaje>{errors.email.message}</ErrorMensaje>}
            </div>

            <input
                type="submit"
                value="Guardar Cambios"
                className="col-span-7 bg-blue-400 w-full p-3 text-white uppercase font-bold hover:bg-blue-600 cursor-pointer transition-colors"
            />
        </form>
    </div>
    );
}

















