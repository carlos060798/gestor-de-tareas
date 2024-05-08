import ErrorMensaje from "../Error.mensaje"
import { UseFormRegister, FieldErrors } from "react-hook-form";

type ProjectFormProps = {
    register:  UseFormRegister<{
        projectName: string;
        clientName: string;
        description: string;
    }>
    errors:  FieldErrors<{
        projectName: string;
        clientName: string;
        description: string;
    }>

}

export default function ProjectForm( {register,errors}: ProjectFormProps) {
    return (
        <>
            <div className="mb-5 space-y-3">
                <label htmlFor="projectName" className="text-sm uppercase font-bold">
                    Nombre del Proyecto
                </label>
                <input
                    id="projectName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del Proyecto"
                    {...register("projectName", {
                        required: "El Titulo del Proyecto es obligatorio",
                    })}
                />

                {errors.projectName && (
                    <ErrorMensaje >{errors.projectName.message}</ErrorMensaje >
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="clientName" className="text-sm uppercase font-bold">
                    Nombre Cliente
                </label>
                <input
                    id="clientName"
                    className="w-full p-3  border border-gray-200"
                    type="text"
                    placeholder="Nombre del Cliente"
                    {...register("clientName", {
                        required: "El Nombre del Cliente es obligatorio",
                    })}
                />

                {errors.clientName && (
                    <ErrorMensaje >{errors.clientName.message}</ErrorMensaje >
                )}
            </div>

            <div className="mb-5 space-y-3">
                <label htmlFor="description" className="text-sm uppercase font-bold">
                    Descripción
                </label>
                <textarea
                    id="description"
                    className="w-full p-3  border border-gray-200"
                    placeholder="Descripción del Proyecto"
                    {...register("description", {
                        required: "Una descripción del proyecto es obligatoria"
                    })}
                />

                {errors.description && (
                    <ErrorMensaje >{errors.description.message}</ErrorMensaje >
                )}
            </div>
        </>
    )
}


