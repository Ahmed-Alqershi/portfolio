import { useEffect, useState } from "react";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(): [boolean, () => void] {
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    let buffer: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      buffer = [...buffer, k].slice(-KONAMI.length);
      if (buffer.length === KONAMI.length && buffer.every((v, i) => v === KONAMI[i])) {
        setTriggered(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return [triggered, () => setTriggered(false)];
}
