"use client";

import { useEffect, useState } from "react";

type Carrera = {
  fecha: string;
  origen: string;
  destino: string;
  km: number;
  monto: number;
};

export default function DriverProfile() {
  const adminWhatsapp = "+5353050838";
  const depositoDireccion = "Calle 23 #101, Vedado, La Habana";
  const tarjetaTransferencia = "1234 5678 9012 3456";
  const porcentajeDescuento = 10;

  const [chofer, setChofer] = useState<any>(null);
  const [metodoPago, setMetodoPago] = useState<"efectivo" | "transferencia" | null>(null);
  const [mostrarRealizadas, setMostrarRealizadas] = useState(false);
  const [mostrarCanceladas, setMostrarCanceladas] = useState(false);
  const [mesFiltro, setMesFiltro] = useState<string>("");
  const [detalleCarrera, setDetalleCarrera] = useState<Carrera | null>(null);

  useEffect(() => {
    setChofer({
      nombre: "Juan Carlos Pérez González",
      direccion: "Calle 10 #234 entre 3ra y 5ta",
      municipio: "Playa",
      telefono: "+53 51234567",
      tipoVehiculo: "Almendrón",
      capacidad: 4,
      chapa: "P123456",
      carnet: "88010112345",
      aireAcondicionado: true,
      musica: true,
      fotoVehiculo: "/carro.jpg",
      fondo: 240,
      carrerasRealizadas: [
        { fecha: "2025-07-10", origen: "Playa", destino: "Habana Vieja", km: 12, monto: 150 },
        { fecha: "2025-07-05", origen: "Vedado", destino: "Centro Habana", km: 8, monto: 100 },
        { fecha: "2025-06-28", origen: "Miramar", destino: "Marianao", km: 10, monto: 120 },
      ],
      carrerasCanceladas: [
        { fecha: "2025-07-03", origen: "Playa", destino: "Vedado", km: 9, monto: 0 },
        { fecha: "2025-06-29", origen: "Centro Habana", destino: "Habana Vieja", km: 6, monto: 0 },
      ],
    });
  }, []);

  if (!chofer) return <p className="text-center p-4">Cargando perfil...</p>;

  const fondoBajo = chofer.fondo <= 250;

  const filtrarPorMes = (lista: Carrera[]) => {
    const ordenadas = [...lista].sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    if (!mesFiltro) return ordenadas;
    return ordenadas.filter((c) => new Date(c.fecha).toISOString().slice(0, 7) === mesFiltro);
  };

  const totalGanado = filtrarPorMes(chofer.carrerasRealizadas).reduce((suma, c) => suma + c.monto, 0);

  const descargarEstadisticas = () => {
    const stats = [
      "📌 Carreras Realizadas:",
      ...filtrarPorMes(chofer.carrerasRealizadas).map(
        (c) => `- ${c.fecha}: ${c.origen} → ${c.destino} | ${c.km} km | ${c.monto} CUP`
      ),
      "",
      "📌 Carreras Canceladas:",
      ...filtrarPorMes(chofer.carrerasCanceladas).map(
        (c) => `- ${c.fecha}: ${c.origen} → ${c.destino}`
      ),
    ];
    const blob = new Blob([stats.join("\n")], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "estadisticas_chofer.txt";
    link.href = url;
    link.click();
  };

  return (
    <div className="max-w-md mx-auto p-4 space-y-4 text-white font-sans">
      {/* Perfil */}
      <div className="bg-gray-900 rounded-2xl p-4 shadow-lg space-y-3">
        <h2 className="text-2xl font-bold text-center">🚖 Perfil del Chofer</h2>
        <img src={chofer.fotoVehiculo} alt="Vehículo" className="w-full h-48 object-cover rounded-xl" />
        <div className="text-sm space-y-1 mt-2">
          <p><strong>👤 Nombre:</strong> {chofer.nombre}</p>
          <p><strong>🏠 Dirección:</strong> {chofer.direccion}, {chofer.municipio}</p>
          <p><strong>📞 Teléfono:</strong> {chofer.telefono}</p>
          <p><strong>🪪 Carnet:</strong> {chofer.carnet}</p>
          <p><strong>🚗 Vehículo:</strong> {chofer.tipoVehiculo} • {chofer.capacidad} plazas • {chofer.chapa}</p>
          <p><strong>❄️ Aire Acondicionado:</strong> {chofer.aireAcondicionado ? "Sí" : "No"}</p>
          <p><strong>🎵 Música:</strong> {chofer.musica ? "Sí" : "No"}</p>
          <p><strong>💵 Fondo:</strong> <span className={fondoBajo ? "text-yellow-300 font-semibold" : ""}>{chofer.fondo} CUP</span></p>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="bg-gray-800 rounded-2xl p-4 shadow-md space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">📊 Estadísticas</h3>
          <input
            type="month"
            className="p-1 rounded text-black text-sm"
            value={mesFiltro}
            onChange={(e) => setMesFiltro(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-3 text-center text-sm">
          <div
            onClick={() => setMostrarRealizadas(!mostrarRealizadas)}
            className="bg-green-600 p-3 rounded-xl cursor-pointer hover:bg-green-700 transition"
          >
            <p className="text-xl font-bold">{filtrarPorMes(chofer.carrerasRealizadas).length}</p>
            <p>Realizadas</p>
          </div>
          <div
            onClick={() => setMostrarCanceladas(!mostrarCanceladas)}
            className="bg-red-600 p-3 rounded-xl cursor-pointer hover:bg-red-700 transition"
          >
            <p className="text-xl font-bold">{filtrarPorMes(chofer.carrerasCanceladas).length}</p>
            <p>Canceladas</p>
          </div>
        </div>

        {filtrarPorMes(chofer.carrerasRealizadas).length > 0 && (
          <p className="text-sm text-right">🤑 Ganancia en el mes: <strong>{totalGanado} CUP</strong></p>
        )}

        {/* Realizadas */}
        {mostrarRealizadas && (
          <div className="bg-green-900 rounded-xl p-3 space-y-2 text-sm">
            <p className="font-bold mb-2">✅ Carreras Realizadas:</p>
            {filtrarPorMes(chofer.carrerasRealizadas).map((c, i) => (
              <div
                key={i}
                onClick={() => setDetalleCarrera(c)}
                className="p-2 rounded hover:bg-green-800 cursor-pointer"
              >
                <p>{new Date(c.fecha).toLocaleDateString()}</p>
                <p>{c.origen} → {c.destino}</p>
              </div>
            ))}
          </div>
        )}

        {/* Canceladas */}
        {mostrarCanceladas && (
          <div className="bg-red-900 rounded-xl p-3 space-y-2 text-sm">
            <p className="font-bold mb-2">❌ Canceladas:</p>
            {filtrarPorMes(chofer.carrerasCanceladas).map((c, i) => (
              <div
                key={i}
                onClick={() => setDetalleCarrera(c)}
                className="p-2 rounded hover:bg-red-800 cursor-pointer"
              >
                <p>{new Date(c.fecha).toLocaleDateString()}</p>
                <p>{c.origen} → {c.destino}</p>
              </div>
            ))}
          </div>
        )}

        {/* Detalles de la carrera */}
        {detalleCarrera && (
          <div className="mt-3 bg-gray-900 p-3 rounded-xl text-sm">
            <h4 className="font-bold mb-2">📋 Detalles de la carrera:</h4>
            <p><strong>Fecha:</strong> {new Date(detalleCarrera.fecha).toLocaleDateString()}</p>
            <p><strong>Ruta:</strong> {detalleCarrera.origen} → {detalleCarrera.destino}</p>
            <p><strong>Distancia:</strong> {detalleCarrera.km} km</p>
            <p><strong>Ganancia:</strong> {detalleCarrera.monto} CUP</p>
            <button
              onClick={() => setDetalleCarrera(null)}
              className="mt-2 px-3 py-1 bg-white text-black rounded hover:bg-gray-300"
            >
              Cerrar
            </button>
          </div>
        )}

        <div className="text-center mt-3">
          <button
            onClick={descargarEstadisticas}
            className="px-4 py-2 bg-white text-black rounded-xl hover:bg-gray-300 transition"
          >
            ⬇️ Descargar Estadísticas
          </button>
        </div>
      </div>

      {/* Fondo Bajo */}
      {fondoBajo && (
        <div className="bg-yellow-300 text-black p-4 rounded-xl shadow-lg space-y-2">
          <p className="font-bold text-center">⚠️ Fondo bajo ({chofer.fondo} CUP)</p>
          <p className="text-sm">Seleccione una forma para reponer su fondo:</p>
          <div className="flex gap-2">
            <button
              onClick={() => setMetodoPago("transferencia")}
              className={`flex-1 p-2 rounded-xl ${metodoPago === "transferencia" ? "bg-green-700 text-white" : "bg-white text-black"}`}
            >
              Transferencia
            </button>
            <button
              onClick={() => setMetodoPago("efectivo")}
              className={`flex-1 p-2 rounded-xl ${metodoPago === "efectivo" ? "bg-blue-700 text-white" : "bg-white text-black"}`}
            >
              Efectivo
            </button>
          </div>

          {metodoPago === "transferencia" && (
            <div className="text-sm mt-2">
              <p><strong>Tarjeta:</strong> {tarjetaTransferencia}</p>
              <p>Envíe captura a WhatsApp:</p>
              <a href={`https://wa.me/${adminWhatsapp.replace("+", "")}`} target="_blank" className="underline">
                {adminWhatsapp}
              </a>
            </div>
          )}

          {metodoPago === "efectivo" && (
            <div className="text-sm mt-2">
              <p><strong>Dirección:</strong> {depositoDireccion}</p>
              <p>Envíe foto del recibo a:</p>
              <a href={`https://wa.me/${adminWhatsapp.replace("+", "")}`} target="_blank" className="underline">
                {adminWhatsapp}
              </a>
            </div>
          )}
        </div>
      )}

      {/* Contacto WhatsApp */}
      <div className="text-center">
        <a
          href={`https://wa.me/${adminWhatsapp.replace("+", "")}`}
          className="inline-block mt-4 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
          target="_blank"
        >
          📞 Contactar Admin por WhatsApp
        </a>
      </div>
    </div>
  );
}
