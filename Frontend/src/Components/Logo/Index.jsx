import { Link } from "react-router-dom"

export default function Logo() {

    return (
        <div className="text-2xl italic flex items-center">
            <img src="/logo.png" alt="logo" className="w-12"/>
            <Link to='/'>
                Seu<strong>Logo</strong>Aqui
            </Link>
        </div>
    )
}