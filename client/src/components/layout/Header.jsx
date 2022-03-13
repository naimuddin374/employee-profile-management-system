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

                        {Object.keys(user).length !== 0 ? <>
                            {user.role > 1 &&
                                <NavItem>
                                    <Link href='/employee'>
                                        <a className="nav-link">Employee</a>
                                    </Link>
                                </NavItem>
                            }
                            {user.role === 3 &&
                                <NavItem>
                                    <Link href='/company'>
                                        <a className="nav-link">Company</a>
                                    </Link>
                                </NavItem>
                            }
                            <NavItem>
                                <Link href='/profile'>
                                    <a className="nav-link">Profile</a>
                                </Link>
                            </NavItem>
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