import { Link } from "react-router-dom";

export default function NavItems({selected}) {
    return (
        <div className="flex gap-3 text-lg font-semibold">

            <Link to='/signup'>
                <button
                    className={`
                        ${selected === 'signup' 
                        ? "bg-green-200" 
                        :"hover:bg-green-200"} 
                        p-1.5 px-4 rounded-full
                    `}
                >
                    Cadastrar
                </button>
            </Link>

            <Link to='/signin'>
                <button
                    className={`
                        ${selected === 'signin' 
                        ? "bg-green-200" 
                        :"hover:bg-green-200"} 
                        p-1.5 px-4 rounded-full
                    `}
                    >
                    Entrar
                </button>
            </Link>

        </div>
    )
}