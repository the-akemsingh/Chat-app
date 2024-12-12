import { Link } from "react-router-dom";

export default function Welcome() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome to Our Chat Application</h1>
        <p className="text-xl mb-8 text-center max-w-md">Ready to start chatting? Join a room now!</p>
        <Link
          to="/join-chat" 
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          Join a Room
        </Link>
      </div>
    );
}