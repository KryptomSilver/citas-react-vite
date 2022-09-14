import { useState, useEffect } from "react";
import Error from "./Error";

export const Formulario = ({ setPacientes, pacientes, paciente }) => {
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState("");
    const [sintomas, setSintomas] = useState("");

    const [error, setError] = useState(false);
    useEffect(() => {
        if (Object.keys(paciente).length > 0) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
        }
    }, [paciente]);

    const generarId = () => {
        const random = Math.random().toString(36).substring(2);
        const fecha = Date.now().toString(36);
        return random + fecha;
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validación del formulario
        if ([nombre, propietario, email, fecha, sintomas].includes("")) {
            console.log("Hay Al menos un campo vacio");
            setError(true);
            return;
        }
        setError(false);
        // Objeto de Paciente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
        };
        if (paciente.id) {
            // Editar
            objetoPaciente.id = paciente.id;
            const pacientesActualizados = pacientes.map((pacienteState) =>
                pacienteState.id === paciente.id
                    ? objetoPaciente
                    : pacienteState
            );
            setPacientes(pacientesActualizados)
        } else {
            // Crear
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]);
        }

        // Reiniciar form
        setNombre("");
        setPropietario("");
        setEmail("");
        setFecha("");
        setSintomas("");
    };
    return (
        <div className="md:w-1/2 lg:w-2/5">
            <h1 className="text-center font-black text-3xl ">
                Seguimiento Pacientes
            </h1>
            <p className="mt-5 text-lg text-center mb-10">
                Añade Pacientes y {""}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>
            <form
                onSubmit={handleSubmit}
                action=""
                className="bg-white shadow-md rounded-lg py-10 px-5  mb-10"
            >
                {error && <Error mensaje="Todos lo campos son obligatorios" />}
                <div className="mb-5">
                    <label
                        htmlFor="mascota"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Nombre Mascota
                    </label>
                    <input
                        type="text"
                        name=""
                        id="mascota"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Nombre Propietario
                    </label>
                    <input
                        type="text"
                        name=""
                        id="propietario"
                        placeholder="Nombre del Propetario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name=""
                        id="email"
                        placeholder="Email Contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="alta"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Alta
                    </label>
                    <input
                        type="date"
                        name=""
                        id="alta"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="block text-gray-700 uppercase font-bold"
                    >
                        Síntomas
                    </label>
                    <textarea
                        name=""
                        id="sintomas"
                        cols="30"
                        rows="5"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Describe los Síntomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    ></textarea>
                </div>
                <input
                    type="submit"
                    value={paciente.id ? "Editar Paciente" : "Agregar Paciente"}
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                />
            </form>
        </div>
    );
};
