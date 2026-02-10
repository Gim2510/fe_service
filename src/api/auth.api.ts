const BASE_URL = import.meta.env.VITE_USER_BASE_URL;

export async function loginApi(email: string, password: string) {
    const res = await fetch(`${BASE_URL}v1/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
}

export async function registerApi(payload: any) {
    const res = await fetch(`${BASE_URL}v1/user/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
