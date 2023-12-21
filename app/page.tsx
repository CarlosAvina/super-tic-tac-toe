import Link from "next/link";
export default function Home() {
  return (
    <main className="w-full flex flex-col justify-center items-center text-center h-screen gap-5">
      <h1 className="text-4xl font-bold">Super tic tac toe</h1>
      <Link className="p-3 bg-green-300 rounded-lg" href="/play">
        Local
      </Link>
      <Link className="p-3 bg-green-300 rounded-lg" href="/play/asdjk">
        Online
      </Link>
    </main>
  );
}
