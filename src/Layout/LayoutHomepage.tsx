import type {ReactNode} from "react";
import {Navbar} from "../Components/Navbar/Navbar.tsx";
import {Footer} from "../Components/Footer.tsx";

export function LayoutHomepage({children}: {children: ReactNode}) {
    return (
        <>
            <div className='w-full h-full relative'>
                <Navbar/>
                {children}
                <Footer/>
            </div>
        </>
    )
}