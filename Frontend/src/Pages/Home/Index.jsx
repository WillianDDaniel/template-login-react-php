// Components
import Footer from "../../Components/Footer/Index";
import Main from "../../Components/Main/Index";
import NavItems from "../../Components/NavItems/Index";
import Navbar from "../../Components/Navbar/Index";

export default function Home() {
    return (
        <>
            <Navbar>
                <NavItems />
            </Navbar>

            <Main>
                <div>
                    <h1 className="font-semibold text-3xl px-3 italic my-5 flex justify-center w-full text-center">Personalize aqui!</h1>
                    
                    <div className="border-zinc-200 border rounded-lg p-10 flex flex-col items-center shadow-lg bg-white">
                        <p className="text-center text-2xl font-bold text-blue-600 mb-4">
                            Bem-vindo!
                        </p>
                        <p className="text-center text-lg text-gray-800 mb-4">
                            Esta página é <span className="font-semibold text-green-600">totalmente personalizável</span>. Adicione aqui o conteúdo do seu site e dê vida às suas ideias.
                        </p>
                        <p className="text-center text-lg text-gray-800 mb-4">
                            Este projeto é um template <span className="font-semibold text-blue-600">React</span> com Backend em <span className="font-semibold text-blue-600">PHP</span>, fornecendo um sistema de login pronto com autenticação de <span className="font-semibold text-red-600">dois fatores via email</span>.
                        </p>
                        <p className="text-center text-lg text-gray-800">
                            <span className="font-semibold">Explore, personalize e aproveite!</span>
                        </p>
                    </div>

                </div>
            </Main>

            <Footer />
        </>
    )
}