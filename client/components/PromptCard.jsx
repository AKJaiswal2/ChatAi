const PromptCard = ({ title, subtitle }) => {
    return (
        <div
            className="
      bg-[#2F2F2F]
      hover:bg-[#383838]
      rounded-2xl
      p-5
      cursor-pointer
      transition
      w-60
      border border-[#3A3A3A]
      "
        >
            <h3 className="font-medium text-white">
                {title}
            </h3>

            <p className="text-sm text-gray-400 mt-2">
                {subtitle}
            </p>
        </div>
    );
};

export default PromptCard;