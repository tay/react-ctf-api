'use client'

import "./styles.css";
import { useState, useEffect } from "react";
import React from "react";

const Loading = () => {
  return <div className="loading">Loading…</div>;
};

const Codeword = ({ codeword }) => {
  const DELAY_MS = 500; // half a second
  const [index, setIndex] = useState(0); // show nothing at first

  useEffect(() => {
    if (index < codeword.length) {
      const timeoutId = setTimeout(() => {
        // console.log(`Setting ${index + 1}`)
        setIndex(index + 1);
      }, DELAY_MS);
    }
  }, [index]);

  return (
      <ul className="codeword">
        {codeword
            .substring(0, index)
            .split("")
            .map((char: string, i: number) => (
                <li className="codeword-char" key={i}>
                  {char}
                </li>
            ))}
      </ul>
  );
};

export default function App() {
  const API_URL =
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/626f6e";
  const [codeword, setCodeword] = useState();

  useEffect(() => {
    fetchCodeword().then((body: string) => setCodeword(body));
  }, []);

  const fetchCodeword = async (): Promise<string> => {
    const response = await fetch(API_URL);
    return response.text();
  };

  return (
      <div className="App">
        {codeword ? <Codeword codeword={codeword} /> : <Loading />}
      </div>
  );
}
