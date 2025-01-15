import { LifeCalculator } from '@/components/LifeCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto w-full">
        <div className="text-center mb-8 space-y-3">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 px-4">
            Life in Numbers
          </h1>
          <p className="text-gray-400 text-sm sm:text-base px-6">
            Discover fascinating statistics about your life journey, from heartbeats to cosmic travels
          </p>
        </div>
        <LifeCalculator />
      </div>
    </main>
  );
}