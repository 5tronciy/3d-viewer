import ModelGalleryDynamic from "./components/ModelGalleryDynamic";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        3D Viewer
      </h1>
      <ModelGalleryDynamic />
    </main>
  );
}