import { FaRobot } from "react-icons/fa";
import { IoChevronDown } from "react-icons/io5";

const Navbar = () => {
    return (
        <header className="h-16 border-b border-[#303030] flex items-center px-6">
            <div className="flex items-center gap-3 cursor-pointer">
                <FaRobot className="text-xl text-white" />

                <h1 className="text-lg font-semibold">AI Chatbot</h1>

                <IoChevronDown className="text-gray-400" />
            </div>
        </header>
    );
};

export default Navbar;