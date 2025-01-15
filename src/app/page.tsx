'use client';

import { LifeCalculator } from '@/components/LifeCalculator';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Life in Numbers</h1>
        <LifeCalculator />
      </div>
    </main>
  );
}