// Client-side validation mirroring user_platform_service backend rules

export function isValidEmail(email: string): boolean {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.toLowerCase());
}

export function validatePassword(password: string): string[] {
    const errors: string[] = [];
    if (!password || password.length < 8)  errors.push("Almeno 8 caratteri");
    if (!/[a-z]/.test(password))           errors.push("Almeno una lettera minuscola");
    if (!/[A-Z]/.test(password))           errors.push("Almeno una lettera maiuscola");
    if (!/\d/.test(password))              errors.push("Almeno un numero");
    if (!/[^A-Za-z0-9]/.test(password))   errors.push("Almeno un carattere speciale");
    return errors;
}

export function validateFiscalCode(cf: string): boolean {
    if (!cf || typeof cf !== "string") return false;
    cf = cf.toUpperCase();

    if (!/^[A-Z]{6}[0-9]{2}[A-Z][0-9]{2}[A-Z][0-9]{3}[A-Z]$/.test(cf)) return false;

    const oddValues: Record<string, number> = {
        "0":1,"1":0,"2":5,"3":7,"4":9,"5":13,"6":15,"7":17,"8":19,"9":21,
        A:1,B:0,C:5,D:7,E:9,F:13,G:15,H:17,I:19,J:21,K:2,L:4,M:18,N:20,
        O:11,P:3,Q:6,R:8,S:12,T:14,U:16,V:10,W:22,X:25,Y:24,Z:23,
    };
    const evenValues: Record<string, number> = {
        "0":0,"1":1,"2":2,"3":3,"4":4,"5":5,"6":6,"7":7,"8":8,"9":9,
        A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,
        O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,
    };

    let sum = 0;
    for (let i = 0; i < 15; i++) {
        sum += i % 2 === 0 ? oddValues[cf[i]] : evenValues[cf[i]];
    }
    if (String.fromCharCode((sum % 26) + 65) !== cf[15]) return false;

    const monthMap: Record<string, number> = {
        A:1,B:2,C:3,D:4,E:5,H:6,L:7,M:8,P:9,R:10,S:11,T:12,
    };
    const month = monthMap[cf[8]];
    if (!month) return false;

    let day = parseInt(cf.substring(9, 11), 10);
    if (day > 40) day -= 40;

    const yearCode = parseInt(cf.substring(6, 8), 10);
    const currentYear = new Date().getFullYear() % 100;
    const fullYear = yearCode <= currentYear ? 2000 + yearCode : 1900 + yearCode;
    const birthDate = new Date(fullYear, month - 1, day);
    if (isNaN(birthDate.getTime())) return false;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const md = today.getMonth() - birthDate.getMonth();
    if (md < 0 || (md === 0 && today.getDate() < birthDate.getDate())) age--;
    if (age < 18) return false;

    return true;
}

export type PartitaIVAError = {
    valid: false;
    message: string;
};

export function validatePartitaIVA(piva: string): { valid: true } | PartitaIVAError {
    if (!piva || piva.trim().length === 0)
        return { valid: false, message: "La Partita IVA è obbligatoria" };
    if (!/^\d+$/.test(piva))
        return { valid: false, message: "La Partita IVA deve contenere solo cifre numeriche" };
    if (piva.length !== 11)
        return { valid: false, message: "La Partita IVA deve essere composta da 11 cifre" };

    let sum = 0;
    for (let i = 0; i < 10; i++) {
        let d = parseInt(piva[i], 10);
        if (i % 2 === 1) { d *= 2; if (d > 9) d -= 9; }
        sum += d;
    }
    const expected = (10 - (sum % 10)) % 10;
    if (expected !== parseInt(piva[10], 10))
        return { valid: false, message: "La Partita IVA non è valida (check digit errato)" };

    return { valid: true };
}

export type RegisterFormErrors = {
    given_name?: string;
    family_name?: string;
    email?: string;
    password?: string;
    fiscal_code?: string;
    partita_iva?: string;
    company_name?: string;
};

export function validateRegisterForm(form: {
    given_name: string;
    family_name: string;
    email: string;
    password: string;
    fiscal_code: string;
    partita_iva: string;
    company_name: string;
}): RegisterFormErrors {
    const errors: RegisterFormErrors = {};

    if (!form.given_name)               errors.given_name   = "Campo obbligatorio";
    else if (form.given_name.length > 25) errors.given_name = "Max 25 caratteri";

    if (!form.family_name)                errors.family_name  = "Campo obbligatorio";
    else if (form.family_name.length > 25) errors.family_name = "Max 25 caratteri";

    if (!form.email)                    errors.email        = "Campo obbligatorio";
    else if (!isValidEmail(form.email)) errors.email        = "Formato email non valido";

    if (!form.company_name)             errors.company_name = "Campo obbligatorio";

    const pwdErrors = validatePassword(form.password);
    if (pwdErrors.length > 0)           errors.password     = pwdErrors[0];

    const pivaResult = validatePartitaIVA(form.partita_iva);
    if (!pivaResult.valid)              errors.partita_iva  = pivaResult.message;

    if (!form.fiscal_code)              errors.fiscal_code  = "Campo obbligatorio";
    else if (!validateFiscalCode(form.fiscal_code))
                                        errors.fiscal_code  = "Codice fiscale non valido";

    return errors;
}
