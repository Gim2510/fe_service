export function ContactPage() {
    return (
        <div className="max-w-xl mx-auto p-6 w-full min-h-screen">
            <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
            <p>If you have questions, feedback, or need support, please reach out:</p>
            <ul className="mt-4 space-y-2">
                <li>Email: <a href="mailto:gmguglielmino2510@gmail.com" className="text-blue-600">support@myapp.com</a></li>
                <li>Phone: +39 012 345 6789</li>
                <li>Address: Via Roma 123, Milano, Italy</li>
            </ul>
        </div>
    );
}