import Viewer from "./components/Viewer";

export default function Home() {
  const modelUrl = "/models/sample.glb";
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        3D Viewer
      </h1>
      <Viewer modelUrl={modelUrl} />
    </main>
  );
}