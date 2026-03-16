export default function PageLoader() {
    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <div className="flex flex-row gap-2 mb-4">
            <div className="w-4 h-4 rounded-full bg-red-500 animate-bounce" />
            <div
            className="w-4 h-4 rounded-full bg-red-500 animate-bounce"
            style={{ animationDelay: "-0.3s" }}
            />
            <div
            className="w-4 h-4 rounded-full bg-red-500 animate-bounce"
            style={{ animationDelay: "-0.5s" }}
            />
        </div>
        <span className="text-lg font-medium text-gray-700">Loading...</span>
        </div>
    );
}