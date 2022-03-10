import React from 'react';
import { Navbar, NavbarToggler, Collapse, Nav, NavItem, Button } from 'reactstrap';
import Link from 'next/link'
import { Context } from '../../store/Context';
import { setAuthToken } from '../../util/axios';
import { useRouter } from 'next/router';

const Header = () => {
    const [user, setUser] = React.useContext(Context)

    const router = useRouter()

    function logoutHandler() {
        setAuthToken()
        setUser({})
        router.push('/')
    }


    return (
        <div>
            <Navbar
                color="dark"
                dark
                expand="md"
            >
                <Link href='/'>
                    <a className='navbar-brand'>EPMS</a>
                </Link>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse
                    navbar
                    className="justify-content-end"
                >
                    <Nav
                        navbar
                    >
                        <NavItem>
                            <Link href='/'>
                                <a className="nav-link">Home</a>
                            </Link>
                        </NavItem>
                        {Object.keys(user).length !== 0 ? <>
                            {user.type > 1 &&
                                <NavItem>
                                    <Link href='/article'>
                                        <a className="nav-link">Article</a>
                                    </Link>
                                </NavItem>}
                            {user.type > 2 &&
                                <NavItem>
                                    <Link href='/editor'>
                                        <a className="nav-link">Editor</a>
                                    </Link>
                                </NavItem>}
                            <NavItem>
                                <Button onClick={() => logoutHandler()} className="nav-link">Logout</Button>
                            </NavItem>
                        </> :
                            <NavItem>
                                <Link href='/login'>
                                    <a className="nav-link">Login</a>
                                </Link>
                            </NavItem>}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
}
export default Header;