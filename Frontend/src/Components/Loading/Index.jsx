import { FaCheck } from "react-icons/fa6";

export default function Loading({ loading, title, message }) {
    return (
        <>
            {loading &&

                <div data-testid='loading'
                    className={`
                        absolute text-black bg-black/60 w-full h-full rounded
                        flex flex-col items-center justify-center  
                    `}
                >

                    <div
                        className={`
                         bg-white w-10/12 p-3 flex flex-col justify-center items-center
                            rounded py-5
                        `}
                    >
                        <div className="flex items-center gap-1">
                            {message &&
                                <>
                                    <FaCheck className="text-green-700"/>
                                    {message}
                                    <br />
                                </>
                            }
                        </div>

                        <div className="flex justify-center gap-2 items-center text-2xl mb-4 mt-2">
                            <img src="/loading.gif" alt="loading"
                                className={`w-6 h-6`}
                            />
                            {title ? title : 'Carregando...'}
                        </div>

                        Aguarde um momento!

                    </div>

                </div>
            }
        </>
    )
}