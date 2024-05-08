
function  ErrorMensaje({children}:{children: React.ReactNode} ) {
    return ( <>
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{children}</p>
        </div>
    
    </> );
}

export default ErrorMensaje;