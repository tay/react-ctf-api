'use client'

import "./styles.css";
import { useState, useEffect } from "react";
import React from "react";

const Loading = () => {
  return <div className="loading">Loading…</div>;
};

const Typewriter = ({ text }) => {
  const DELAY_MS = 500; // half a second
  const [index, setIndex] = useState(0); // show nothing at first

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setIndex(index + 1);
      }, DELAY_MS);
    }
  }, [index]);

  return (
      <ol className="typewriter">
        {text
            .substring(0, index)
            .split("")
            .map((char: string, i: number) => (
                <li className="typewriter-char" key={i}>
                  {char}
                </li>
            ))}
      </ol>
  );
};

export default function App() {
  const API_URL =
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/626f6e";
  const [text, setText] = useState();

  useEffect(() => {
    fetchText().then((body: string) => setText(body));
  }, []);

  const fetchText = async (): Promise<string> => {
    const response = await fetch(API_URL);
    return response.text();
  };

  return (
      <div className="App">{text ? <Typewriter text={text} /> : <Loading />}</div>
  );
}
