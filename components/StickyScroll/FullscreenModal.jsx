import { motion } from "framer-motion";

const FullscreenModal = ({ src, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 px-4 py-2 text-white bg-white/10 hover:bg-white/20 rounded-md text-sm !font-sans"
      >
        X
      </button>
      <motion.img
        key={src + "-fullscreen"}
        src={src}
        alt="Fullscreen View"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-h-[90vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
        loading="eager"
      />
    </div>
  );
};

export default FullscreenModal;