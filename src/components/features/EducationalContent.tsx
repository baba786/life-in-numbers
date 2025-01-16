'use client';

import * as Tabs from '@radix-ui/react-tabs';
import * as Tooltip from '@radix-ui/react-tooltip';

interface Fact {
  title: string;
  description: string;
  source?: string;
}

const facts: Record<string, Fact[]> = {
  heartbeat: [
    {
      title: 'Heart Rate Variability',
      description: 'Your heart rate naturally varies throughout the day. This variation is a sign of good health!',
      source: 'American Heart Association',
    },
    {
      title: 'Daily Beats',
      description: 'Your heart beats about 100,000 times every day, pumping about 2,000 gallons of blood.',
      source: 'Cleveland Clinic',
    },
  ],
  breathing: [
    {
      title: 'Respiratory Rate',
      description: 'A normal respiratory rate for adults is 12 to 20 breaths per minute while resting.',
      source: 'Mayo Clinic',
    },
    {
      title: 'Oxygen Usage',
      description: 'Your body uses about 550 liters of pure oxygen per day through breathing.',
      source: 'National Geographic',
    },
  ],
  earth: [
    {
      title: 'Earth\'s Rotation',
      description: 'The Earth rotates at about 1,037 mph (1,670 km/h) at the equator.',
      source: 'NASA',
    },
    {
      title: 'Solar Orbit',
      description: 'Earth travels through space at an average speed of 67,000 mph (107,826 km/h).',
      source: 'Space.com',
    },
  ],
];

export function EducationalContent() {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Learn More</h2>

      <Tabs.Root defaultValue="heartbeat">
        <Tabs.List className="flex space-x-2 border-b mb-4">
          <Tabs.Trigger
            value="heartbeat"
            className="px-4 py-2 hover:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
          >
            Heartbeat
          </Tabs.Trigger>
          <Tabs.Trigger
            value="breathing"
            className="px-4 py-2 hover:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
          >
            Breathing
          </Tabs.Trigger>
          <Tabs.Trigger
            value="earth"
            className="px-4 py-2 hover:bg-gray-100 data-[state=active]:border-b-2 data-[state=active]:border-blue-500"
          >
            Earth & Space
          </Tabs.Trigger>
        </Tabs.List>

        {Object.entries(facts).map(([category, categoryFacts]) => (
          <Tabs.Content key={category} value={category} className="space-y-4">
            {categoryFacts.map((fact, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <Tooltip.Provider>
                  <Tooltip.Root>
                    <Tooltip.Trigger asChild>
                      <h3 className="text-lg font-semibold cursor-help">
                        {fact.title}
                      </h3>
                    </Tooltip.Trigger>
                    {fact.source && (
                      <Tooltip.Portal>
                        <Tooltip.Content
                          className="bg-black text-white p-2 rounded text-sm"
                          sideOffset={5}
                        >
                          Source: {fact.source}
                          <Tooltip.Arrow className="fill-black" />
                        </Tooltip.Content>
                      </Tooltip.Portal>
                    )}
                  </Tooltip.Root>
                </Tooltip.Provider>
                <p className="mt-2 text-gray-600">{fact.description}</p>
              </div>
            ))}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}