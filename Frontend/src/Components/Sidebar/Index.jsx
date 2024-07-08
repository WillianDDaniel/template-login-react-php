import React, { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

export default function Sidebar({ children, logOut, switchSheet }) {

    const menus = [
        { label: "Inicio", icon: MdOutlineDashboard, sheet: 'DashHome' },
        { label: "Configurações", icon: RiSettings4Line, sheet: 'Settings' },
        { label: "Sair", icon: BiLogOut },
    ];

    const [open, setOpen] = useState(false);

    return (
        <section className="flex">
            <div
                data-testid='sidebar-menu'
                className={`
                    bg-zinc-900 min-h-screen 
                    ${open ? "w-52" : "w-16"} 
                    duration-500 text-gray-100 px-4
                `}
            >
                <div className="py-3 flex justify-end">
                    <HiMenuAlt3
                        data-testid='menu-show-button'
                        size={26}
                        className="cursor-pointer"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                <div className="mt-4 flex flex-col gap-4 relative h-[80%]">
                    {menus?.map((menu, i) => (
                        <div
                            key={i}
                            onClick={menu.label === 'Sair' ? logOut : () => switchSheet(menu.sheet)}
                            className={` 
                                ${menu?.margin && "mt-5"} 
                                group cursor-pointer last:mt-auto flex items-center 
                                text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md
                            `}
                        >
                            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                            <h2
                                style={{
                                    transitionDelay: `${i + 3}00ms`,
                                }}
                                className={`
                                    whitespace-pre duration-500 
                                    ${!open && "opacity-0 translate-x-28 overflow-hidden"}
                                `}
                            >
                                {menu?.label}
                            </h2>
                            <h2
                                className={`
                                    ${open && "hidden"} 
                                    absolute left-48 bg-white font-semibold whitespace-pre 
                                    text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 
                                    overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 
                                    group-hover:duration-300 group-hover:w-fit
                                `}
                            >
                                {menu?.label}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col min-h-[100vh] w-full text-xl text-gray-900 font-semibold">
                {children}
            </div>
        </section>
    )
}


