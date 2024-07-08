import Logo from "../Logo/Index";

export default function Navbar({ children }) {
    return (
        <nav
            className={`flex justify-between items-center bg-green-100
                w-11/12 h-16 px-5 rounded
            `}
        >

            <Logo />
            
            {children}

        </nav>
    )
}