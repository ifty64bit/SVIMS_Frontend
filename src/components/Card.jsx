function Card({ children }) {
    return (
        <div className="w-52 h-32 p-4 shadow-lg rounded-lg border flex justify-end items-end hover:border-green-500 transition-colors duration-300 text-lg">
            {children || "Card"}
        </div>
    );
}

export default Card;
