'use client';
import './index.css'; // Assicurati di importare il file CSS per Tailwind e Flowbite
import { useState } from "react";
import 'flowbite'; // Importa Flowbite per usare i componenti dinamici

export default function Home() {
  const [giocatori, setGiocatori] = useState(['']);
  const [numeroSquadre, setNumeroSquadre] = useState(1);
  const [squadre, setSquadre] = useState([]);
  const [nuovoGiocatore, setNuovoGiocatore] = useState('');

  // Aggiungi un campo per un nuovo giocatore
  const aggiungiCampoGiocatore = () => {
    setGiocatori([...giocatori, '']);
  };

  // Rimuovi un campo di un giocatore
  const rimuoviCampoGiocatore = (index) => {
    setGiocatori(giocatori.filter((_, i) => i !== index));
  };

  // Aggiorna il valore di un giocatore
  const aggiornaGiocatore = (index, valore) => {
    const nuoviGiocatori = [...giocatori];
    nuoviGiocatori[index] = valore;
    setGiocatori(nuoviGiocatori);
  };

    // Verifica se ci sono campi vuoti tra i giocatori
    const sonoTuttiGiocatoriCompilati = () => {
      return giocatori.every((giocatore) => giocatore.trim() !== "");
    };

  // Genera le squadre
  const generaSquadre = () => {
    if (giocatori.length === 0 || numeroSquadre <= 0 || numeroSquadre > giocatori.length) {
      alert("Inserisci un numero valido di squadre.");
      return;
    }

    const giocatoriMescolati = [...giocatori].sort(() => Math.random() - 0.5);

    const squadreGenerate = Array.from({ length: numeroSquadre }, () => []);
    giocatoriMescolati.forEach((giocatore, index) => {
      squadreGenerate[index % numeroSquadre].push(giocatore);
    });

    setSquadre(squadreGenerate);
  };

  return (
    <div className="container py-5" >
      {/* Titolo principale */}
      <h1 className="text-center mb-4 text-gray-800 font-semibold text-2xl" style={{width:"100%", color:"red"}}><b>Generate Teams</b></h1>
      <div className="mb-4">
        {/* Inserimento dei giocatori */}
        <h2 className="mb-3 text-gray-700 font-bold text-lg" style={{ width:"100%",textAlign:"center", color:"red"}}><b>Players</b></h2>
        <div>
          {giocatori.map((giocatore, index) => (
            <div key={index} className="mb-2 flex items-center " >
              <input
                className="border p-2 rounded-md w-64 mr-2 focus:ring-2 focus:ring-indigo-500 "
                type="text"
                value={giocatore}
                onChange={(e) => aggiornaGiocatore(index, e.target.value)}
                placeholder={`Player ${index + 1}`}
                style={{width:"90%", marginLeft:"5%"}}
                required
              />
              {giocatori.length > 1 && (
                <button
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition"
                  onClick={() => rimuoviCampoGiocatore(index)}
                  style={{width:"20%", marginRight:"5%"}}
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button 
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
            onClick={aggiungiCampoGiocatore}
            style={{marginLeft:"5%", marginRight: "5%", width:"90%"}}
          >
            Add Player
          </button>
        </div>
      </div>

      <div className="mb-4">
        {/* Numero di squadre */}
        <h2 className=" mb-3 text-gray-700 font-semibold text-lg" style={{textAlign:"center", color:"red"}}><b>Number of teams</b></h2>
        <div>
          <input
            className="border p-2 rounded-md w-64 mb-2 focus:ring-2 focus:ring-indigo-500"
            type="number"
            value={numeroSquadre}
            onChange={(e) => setNumeroSquadre(Number(e.target.value))}
            min="1"
            max={giocatori.length}
            style={{marginLeft:"5%", marginRight: "5%", width:"90%"}}
          /><br/>
          <button 
           className={`p-2 rounded-md w-64 transition duration-300 ${!sonoTuttiGiocatoriCompilati() ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'}`}
            onClick={generaSquadre}
            style={{marginLeft:"5%", marginRight: "5%", width:"90%"}}
            disabled={!sonoTuttiGiocatoriCompilati()} // Disabilita il bottone se ci sono campi vuoti
          >
            Generate
          </button>
        </div>
      </div>

      {/* Visualizzazione delle squadre generate */}
      {squadre.length > 0 && (
        <div>
          <h2 className="text-gray-700 font-bold text-lg" style={{textAlign:"center", color:"red"}}><b>Teams</b></h2>
          <div className="" style={{marginLeft:"5%", marginRight: "5%", width:"90%"}}>
            {squadre.map((squadra, index) => (
              <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-300" style={{ marginBottom:"3%"}}>
                <h3 className="text-gray-800 font-semibold text-lg"><b>Team {index + 1}</b></h3>
                <ul>
                  {squadra.map((giocatore, idx) => (
                    <li key={idx} className="py-1 text-gray-600" style={{marginLeft:"2%"}}>{giocatore}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
