"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  const getTasks = () => {
    fetch("/api/test/11233?offset=0&limit=10", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 123456",
      },
    });
  };
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="flex gap-3">
        <input
          className="text-black p-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={async () => {
            await fetch("/api/test/11233?text1=text1", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer 123456",
              },
              body: JSON.stringify({
                text,
                textMore: "textMore",
              }),
            });
            getTasks();
          }}
        >
          submit
        </button>
        <button onClick={getTasks}>get</button>
      </div>
    </div>
  );
}
