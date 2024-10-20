import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Input,
    Button,


} from '@nextui-org/react';
import HeaderAuth from './header-auth';
import HeaderAuthGoole from './header-auth-google';

export default function Header() {
    return (
        <Navbar className='shadow mb-6'>
            <NavbarBrand>
                <Link href='/' className='font-bold font-sans'>Discuss</Link>
            </NavbarBrand>
            <NavbarContent justify='center'>
                <NavbarItem><Input /></NavbarItem>
            </NavbarContent>
            <NavbarContent justify='end'>
                <HeaderAuth />
            </NavbarContent>
            <NavbarContent>
                <HeaderAuthGoole/>
            </NavbarContent>
            <NavbarContent>

                <Link href=""><Button type="submit" color="success" variant="bordered">Sign Up</Button></Link>
            </NavbarContent>
        </Navbar>
    );
}