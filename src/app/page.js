'use client';

import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [giocatori, setGiocatori] = useState(['']);
  const [numeroSquadre, setNumeroSquadre] = useState(1);
  const [squadre, setSquadre] = useState([]);
  const [nuovoGiocatore, setNuovoGiocatore] = useState('');

  const aggiungiCampoGiocatore = () => {
    setGiocatori([...giocatori, '']);
  };

  const rimuoviCampoGiocatore = (index) => {
    setGiocatori(giocatori.filter((_, i) => i !== index));
  };

  const aggiornaGiocatore = (index, valore) => {
    const nuoviGiocatori = [...giocatori];
    nuoviGiocatori[index] = valore;
    setGiocatori(nuoviGiocatori);
  };

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
    <div className={styles.page}>
      {/* Titolo principale */}
      <h1 className={styles.title}>Generate Teams</h1>

      <div className={styles.container}>
        {/* Inserimento dei giocatori */}
        <h2 className={styles.h2}>Players</h2>
        <div className={styles.inputContainer}>
          {giocatori.map((giocatore, index) => (
            <div key={index} className={styles.inputWrapper}>
              <input
                className={styles.input}
                type="text"
                value={giocatore}
                onChange={(e) => aggiornaGiocatore(index, e.target.value)}
                placeholder={`Player ${index + 1}`}
              />
              {giocatori.length > 1 && (
                <button
                  className={styles.removeButton}
                  onClick={() => rimuoviCampoGiocatore(index)}
                >
                  X
                </button>
              )}
            </div>
          ))}
        </div>
        <button className={styles.button} onClick={aggiungiCampoGiocatore}>
          Add Player
        </button>
      </div>

      <div className={styles.container}>
        {/* Numero di squadre */}
        <h2 className={styles.h2}>N. teams</h2>
        <input
          className={styles.input}
          type="number"
          value={numeroSquadre}
          onChange={(e) => setNumeroSquadre(Number(e.target.value))}
          min="1"
          max={giocatori.length}
        />
        <br/>
        <button className={styles.button} onClick={generaSquadre}>
          Generate
        </button>
      </div>
      {/* Visualizzazione delle squadre generate */}
      {squadre.length > 0 && (
        <div className={styles.squadreContainer}>
          <h2>Teams:</h2>
          {squadre.map((squadra, index) => (
            <div key={index} className={styles.squadra}>
              <h3 className={styles.h3}>Team {index + 1}:</h3>
              <ul className={styles.ul}>
                {squadra.map((giocatore, idx) => (
                  <li key={idx} className={styles.li}>{giocatore}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
