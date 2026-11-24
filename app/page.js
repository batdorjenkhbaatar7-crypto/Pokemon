// export default function Home() {
//   return (
//     <main className="bg-[#f1f5f9] w-screen h-screen rounded-[15px]">
//       <div className="flex flex-col mt-10 bg-white rounded-[15px] p-5 items-center w-[600px] mx-auto min-h-[700px]">
//         <div className="flex flex-col gap-3 w-[550px] h-[200px]">
//           <h1 className="font-bold text-2xl">💸 Зардлын тэмдэглэл</h1>
//           <div className="flex flex-col justify-center p-5 rounded-[10px] bg-[#0e162a] h-[150px]">
//             <h1 className="text-[#8a9bb2] ">нийт</h1>
//             <h1 className="text-white text-2xl font-bold">{}₮</h1>
//           </div>
//         </div>
//         <div className="flex flex-col">
//           <input className="border-1" />
//           <input className="border-1" />
//           <button>Нэмэх</button>
//         </div>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";

const API = "https://pokeapi.co/api/v2/pokemon/";

export default function PokemonPage() {
  const [hero, setHero] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const getPokemonById = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const responce = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      if (responce.ok) {
        const data = await responce.json();

        setHero(data);
      } else {
        setError("😕 Ийм покемон олдсонгүй");
      }
    } catch {
      setError("📡 Интернэтээ шалгаад оролдоорой");
    }
    setIsLoading(false);
  };
  const getRandomHero = () => {
    const randomId = Math.floor(Math.random() * 151) + 1;
    getPokemonById(randomId);
  };
  useEffect(() => {
    getPokemonById(25);
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-900 px-6 py-12 text-white">
      <h1 className="text-3xl font-bold">⚡ Покемон карт</h1>

      <div className="flex h-[440px] w-80 flex-col items-center justify-center rounded-3xl bg-white p-6 text-slate-900 shadow-xl">
        {isLoading === true && <div className="text-3xl">⏳ Loading </div>}
        {!isLoading && error !== "" && (
          <p className="text-xl text-red-500">{error}</p>
        )}
        {hero !== null && isLoading === false && error === "" && (
          <div>
            <h1 className="text-2xl text-center font-bold ">{hero.name}</h1>
            <img
              className="w-[200px] h-[300px]"
              src={hero.sprites.other["official-artwork"].front_default}
            />
          </div>
        )}
      </div>

      <button
        onClick={getRandomHero}
        className="rounded-xl bg-yellow-400 px-8 py-3 text-lg font-bold text-slate-900 hover:bg-yellow-300 disabled:opacity-50"
      >
        🎲 Санамсаргүй
      </button>
    </main>
  );
}
