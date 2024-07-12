import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Index";

export default function NavItems({ selected }) {

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <div className="flex flex-row-reverse gap-3 text-lg font-semibold">

            <div className={`
                    z-50 sm:hidden w-7 cursor-pointer
                `}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span className={`
                        ${menuOpen && 'rotate-45 left-1 -bottom-0.5'}
                        block w-7 h-1 mb-1.5 bg-gray-500 rounded relative transform 
                        origin-top-left transition-transform duration-500 ease-out
                    `}>
                </span>

                <span className={`
                        ${menuOpen && 'opacity-0'}
                        block w-7 h-1 mb-1.5 bg-gray-500 rounded relative transform 
                        origin-top-left transition-transform duration-500 ease-out
                    `}>
                </span>

                <span className={`
                        ${menuOpen && '-rotate-45'}
                        block w-7 h-1 mb-1.5 bg-gray-500 rounded relative transform 
                        origin-top-left transition-transform duration-500 ease-out
                    `}>
                    </span>
                
            </div>

            {menuOpen &&

                <div className={`
                    sm:hidden bg-white w-full fixed flex flex-col justify-center items-center z-40 h-5/6 inset-0
                `}>

                    <Logo />

                    <br />

                    <Link to='/signup' className="m-1">

                        <button

                            className={`
                            ${selected === 'signup'
                                    ? "bg-green-200"
                                    : "hover:bg-green-200"
                                } 
                            p-1.5 px-4 rounded

                        `}
                        >
                            Cadastrar
                        </button>
                    </Link>

                    <Link to='/signin' className="m-1">
                        <button
                            className={`
                            ${selected === 'signin'
                                    ? "bg-green-200"
                                    : "hover:bg-green-200"
                                } 
                            p-1.5 px-4 rounded
                        `}
                        >
                            Entrar
                        </button>
                    </Link>
                </div>
            }

            <div className={`
                    max-[640px]:hidden flex gap-3
                `}>

                <Link to='/signup'>
                    <button
                        className={`
                            ${selected === 'signup'
                                ? "bg-green-200"
                                : "hover:bg-green-200"
                            } 
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
                                : "hover:bg-green-200"
                            } 
                            p-1.5 px-4 rounded-full
                        `}
                    >
                        Entrar
                    </button>
                </Link>
            </div>


        </div>
    )
}