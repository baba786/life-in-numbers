import { LifeCalculator } from '@/components/LifeCalculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Life in Numbers
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover fascinating statistics about your life journey, from heartbeats to cosmic travels
          </p>
        </div>
        <LifeCalculator />
      </div>
    </main>
  );
}
