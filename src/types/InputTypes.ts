import type {ChangeEventHandler} from "react";
import {CompanyRoles} from "./CompanyRoles.ts";

export type InputProps = {
    label: string,
    name: string,
    type?: string,
    value: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    theme: string
}

export type InputConfirmProps = {
    form: RegisterForm,
    handleChange: ChangeEventHandler<HTMLInputElement>,
    theme: string,
    passwordsMatch: boolean,
}

export type RegisterForm = {
    given_name: string;
    family_name: string;
    email: string;
    password: string;
    confirmPassword: string;
    fiscal_code: string;
    partita_iva: string;
    company_name: string;
    company_role: CompanyRoles;
}