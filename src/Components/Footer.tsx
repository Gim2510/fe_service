export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-200 py-6 text-center absolute bottom-0 w-full">
            <p>© 2026 MyApp. All rights reserved.</p>
            <p>
                <a href="/contact" className="text-blue-400 hover:underline mx-2">Contact</a>
                <a href="/privacy" className="text-blue-400 hover:underline mx-2">Privacy Policy</a>
            </p>
        </footer>
    );
}