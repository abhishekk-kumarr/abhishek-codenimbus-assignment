import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, X, ZoomIn, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { weddingData } from '../data/weddingData';

interface GalleryItem {
  id: string;
  url: string;
  caption?: string;
  isVideo?: boolean;
}

export const GallerySection: React.FC = () => {
  const { assets } = weddingData;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Persistent photos state with localStorage (defaults to empty [] to match live video recording)
  const [items, setItems] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem('wed010_gallery_items');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Fallback
    }
    return [];
  });

  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadToast, setUploadToast] = useState<string | null>(null);

  const itemsPerPage = 4;
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('wed010_gallery_items', JSON.stringify(items));
    } catch {
      // Ignore quota errors
    }
  }, [items]);

  // Adjust page if items shrink
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // Handle uploaded files
  const processFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    if (!files.length) return;

    const newItems: GalleryItem[] = [];

    files.forEach((file, index) => {
      const isVideo = file.type.startsWith('video/');
      const objectUrl = URL.createObjectURL(file);
      newItems.push({
        id: `upload-${Date.now()}-${index}-${Math.random().toString(36).substring(2, 6)}`,
        url: objectUrl,
        caption: file.name.replace(/\.[^/.]+$/, ''),
        isVideo,
      });
    });

    setItems((prev) => [...newItems, ...prev]);
    setCurrentPage(1);
    setUploadToast(`${newItems.length} new ${newItems.length === 1 ? 'photo' : 'memories'} added!`);
    setTimeout(() => setUploadToast(null), 3000);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Lightbox keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') setActiveLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev !== null ? (prev + 1) % items.length : 0));
      }
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) =>
          prev !== null ? (prev === 0 ? items.length - 1 : prev - 1) : 0
        );
      }
    },
    [activeLightboxIndex, items.length]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const displayedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section
      className={`wed010-gallery-wrapper ${isDragging ? 'ring-4 ring-[#931711]/30 bg-rose-50/20' : ''}`}
      id="gallery"
      aria-label="Wedding Gallery"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Corner Floral Decorations matching reference template */}
      <img
        src={assets.flowerTopLeft}
        alt=""
        className="wed010-design-top-gal"
        aria-hidden="true"
        loading="eager"
      />
      <img
        src={assets.flowerBottomRight}
        alt=""
        className="wed010-design-bottom-gal"
        aria-hidden="true"
        loading="eager"
      />

      {/* Gallery Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="wed010-gallery-heading"
      >
        Gallery
      </motion.h2>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
      />

      {/* Gallery Header with Upload Button */}
      <div className="gallery-header flex items-center justify-center mb-6">
        <button
          type="button"
          id="gallery-upload-btn"
          onClick={() => fileInputRef.current?.click()}
          className="upload-btn"
          title="Upload your wedding photos"
        >
          Upload
        </button>
      </div>

      {/* Upload confirmation toast */}
      <AnimatePresence>
        {uploadToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 px-5 py-2 bg-[#931711] text-white rounded-full font-kameron text-lg shadow-lg z-10"
          >
            {uploadToast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination Controls - directly under Upload button matching live video */}
      <div className="pagination">
        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          className="pagination-previous-btn"
          aria-label="Previous Page"
          title="Previous Page"
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
        </button>

        <span className="pagination-text">Page {currentPage}</span>

        <button
          type="button"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
          className="pagination-next-btn"
          aria-label="Next Page"
          title="Next Page"
        >
          <ArrowRight size={18} strokeWidth={2.4} />
        </button>
      </div>

      {/* Photos Grid when items exist */}
      {items.length > 0 && (
        <div className="gallery mt-8">
          {displayedItems.map((item, index) => {
            const overallIndex = (currentPage - 1) * itemsPerPage + index;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="gallery-item group"
                onClick={() => setActiveLightboxIndex(overallIndex)}
              >
                {item.isVideo ? (
                  <video src={item.url} className="w-full h-full object-contain" />
                ) : (
                  <img
                    src={item.url}
                    alt={item.caption || `Wedding moment ${overallIndex + 1}`}
                    loading="lazy"
                    className="w-full h-full object-contain"
                  />
                )}

                {/* Elegant Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="w-12 h-12 rounded-full bg-white/90 text-[#931711] flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-transform"
                      aria-label="Zoom Photo"
                    >
                      <ZoomIn size={22} />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteItem(e, item.id)}
                      className="w-12 h-12 rounded-full bg-white/90 text-gray-700 hover:text-red-600 flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-transform"
                      aria-label="Remove Photo"
                      title="Remove this photo"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {item.caption && (
                    <div className="absolute bottom-3 left-4 right-4 text-center">
                      <p className="font-kameron text-white text-lg font-medium drop-shadow-md truncate">
                        {item.caption}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && items[activeLightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 select-none"
            onClick={() => setActiveLightboxIndex(null)}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveLightboxIndex(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-colors z-20"
              aria-label="Close photo preview"
            >
              <X size={26} />
            </button>

            {/* Counter Badge */}
            <div className="absolute top-6 left-6 font-kameron text-white/80 text-xl tracking-wide z-20">
              {activeLightboxIndex + 1} / {items.length}
            </div>

            {/* Previous Arrow */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) =>
                    prev !== null ? (prev === 0 ? items.length - 1 : prev - 1) : 0
                  );
                }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-all hover:scale-105 z-20"
                aria-label="Previous photo"
              >
                <ArrowLeft size={28} />
              </button>
            )}

            {/* Image Preview Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {items[activeLightboxIndex].isVideo ? (
                <video
                  src={items[activeLightboxIndex].url}
                  controls
                  autoPlay
                  className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl"
                />
              ) : (
                <img
                  src={items[activeLightboxIndex].url}
                  alt={items[activeLightboxIndex].caption || 'Wedding moment enlarged'}
                  className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain"
                />
              )}

              {items[activeLightboxIndex].caption && (
                <p className="mt-4 font-kameron text-white text-2xl font-normal drop-shadow-md text-center max-w-2xl">
                  {items[activeLightboxIndex].caption}
                </p>
              )}
            </motion.div>

            {/* Next Arrow */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveLightboxIndex((prev) =>
                    prev !== null ? (prev + 1) % items.length : 0
                  );
                }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-all hover:scale-105 z-20"
                aria-label="Next photo"
              >
                <ArrowRight size={28} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

