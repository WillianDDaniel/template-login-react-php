import { BrowserRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import Sidebar from './Index'
import { vi } from 'vitest'

describe('<Sidebar/>', () => {
    it('should render the sidebar items correctly', () => {
        render(
            <Sidebar />
        )

        const menuInicio = screen.getAllByRole('heading', { name: 'Inicio' })
        const menuConfig = screen.getAllByRole('heading', { name: 'Configurações' })

        menuConfig.forEach((menuConfig) => expect(menuConfig).toBeInTheDocument())
        menuInicio.forEach((menuInicio) => expect(menuInicio).toBeInTheDocument())

    })

    it('should close or open Sidebar menus, when clicked on menu show button', () => {

        render(
            <Sidebar />
        )

        const showMenu = screen.getByTestId('menu-show-button')
        const sidebarMenu = screen.getAllByTestId('sidebar-menu')

        // First click is to open menu
        fireEvent.click(showMenu)
        expect(sidebarMenu[0].className).contain('w-52')

        // Second click close menu
        fireEvent.click(showMenu)
        expect(sidebarMenu[0].className).contain('w-16')
    })

    it('should to called logOut function when click in logOut menu item', () => {

        const logOut = vi.fn()

        render(
            <BrowserRouter>
                <Sidebar 
                    logOut={logOut}
                />
            </BrowserRouter>
        )

        const logOutMenuButton = screen.getAllByRole('heading', { name: 'Sair' })

        fireEvent.click(logOutMenuButton[0])
        expect(logOut).toBeCalled()
        
    })

})