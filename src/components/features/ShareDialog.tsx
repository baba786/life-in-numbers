'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { toPng } from 'html-to-image';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share';

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    age: string;
    heartbeats: number;
    breaths: number;
    earthRotations: number;
    solarOrbits: number;
  };
}

export function ShareDialog({ isOpen, onClose, stats }: ShareDialogProps) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = `My Life in Numbers: ${stats.age}`;

  const handleImageShare = async () => {
    const element = document.getElementById('stats-container');
    if (element) {
      try {
        const dataUrl = await toPng(element);
        const link = document.createElement('a');
        link.download = 'life-in-numbers.png';
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating image:', error);
      }
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 animate-fade-in" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-[90vw] max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4">
            Share Your Journey
          </Dialog.Title>
          
          <div className="space-y-4">
            <div className="flex justify-center space-x-4">
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              
              <TwitterShareButton url={shareUrl}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>

            <button
              onClick={handleImageShare}
              className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Download as Image
            </button>

            <div className="mt-4">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => navigator.clipboard.writeText(shareUrl)}
                className="mt-2 w-full py-2 px-4 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>

          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100"
              aria-label="Close"
            >
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}