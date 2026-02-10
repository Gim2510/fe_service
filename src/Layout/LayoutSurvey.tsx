import type {ReactNode} from "react";
import {Navbar} from "../Components/Navbar/Navbar.tsx";

export function LayoutSurvey({children}: {children: ReactNode}) {
    return (
        <>
            <div className='w-full h-full relative'>
                <Navbar/>
                {children}
            </div>
        </>
    )
}