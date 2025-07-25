"use client";

import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const VideoModal = ({ open, onClose, videoUrl }) => {
  return (
    <Dialog open={open} onClose={onClose} className="fixed inset-0 z-50">
      <div className="flex items-center justify-center min-h-screen bg-black/70 p-4">
        <Dialog.Panel
          as={motion.div}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="relative w-full max-w-4xl rounded-lg overflow-hidden bg-black"
        >
          <button
            onClick={onClose}
            className="absolute top-2 right-2 z-10 p-1 rounded-full bg-white/20 hover:bg-white/40"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="w-full aspect-video">
            <iframe
              src={videoUrl}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; encrypted-media"
              title="Video Preview"
            />
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default VideoModal;
