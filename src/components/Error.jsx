const Error = ({ mensaje }) => {
    return (
        <div className="bg-red-800 text-white font-bold p-3 uppercase text-center mb-3 rounded">
            <p>{mensaje}</p>
        </div>
    );
};

export default Error;
