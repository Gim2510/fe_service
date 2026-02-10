import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../../auth/AuthContext.tsx"

export function Navbar() {
    const { isAuthenticated, logout } = useAuth()

    return (
        <header className="sticky top-0 z-50 bg-white backdrop-blur border-b border-gray-200">
            <nav className="mx-auto max-w-7xl px-8 py-4 flex items-center justify-between">

                {/* Brand */}
                <Link
                    to="/"
                    className="text-xl font-semibold tracking-tight text-gray-900">
                    MyCompany<span className="text-gray-400">.</span>
                </Link>

                {/* Actions */}
                <div className="flex items-center gap-6">
                    {!isAuthenticated ? (
                        <>
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-gray-900"
                                            : "text-gray-500 hover:text-gray-900"
                                    }`
                                }
                            >
                                Login
                            </NavLink>

                            <NavLink
                                to="/register"
                                className="text-sm font-medium px-5 py-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition"
                            >
                                Inizia ora
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to="/survey/start"
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-gray-900"
                                            : "text-gray-500 hover:text-gray-900"
                                    }`
                                }
                            >
                                Survey
                            </NavLink>
                            <NavLink
                                to="/dashboard"
                                className={({ isActive }) =>
                                    `text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-gray-900"
                                            : "text-gray-500 hover:text-gray-900"
                                    }`
                                }
                            >
                                Dashboard
                            </NavLink>

                            <button
                                onClick={logout}
                                className="text-sm font-medium text-gray-500 hover:text-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}
