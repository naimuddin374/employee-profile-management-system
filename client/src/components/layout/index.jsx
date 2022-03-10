import { Container } from 'reactstrap';
import Header from './Header';



function Layout({ children }) {
    return (
        <>
            <Header />
            <Container>
                <main>{children}</main>
            </Container>
            {/* <h1>Footer</h1> */}
        </>
    )
}
export default Layout