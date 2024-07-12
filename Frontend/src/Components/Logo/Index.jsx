import { Link } from "react-router-dom"

export default function Logo() {

    return (
        <div className="text-2xl italic flex items-center">
            <img src="/logo.png" alt="logo" className="w-8"/>
            <Link to='/' className="text-lg sm:text-2xl">
                Seu<strong>Logo</strong>Aqui
            </Link>
        </div>
    )
}