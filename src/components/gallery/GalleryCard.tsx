'use client'
import { useState } from 'react'
import Image from 'next/image'
import { X, ZoomIn } from 'lucide-react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function GalleryCard({ item }: { item: any }) {
  const [showModal, setShowModal] = useState(false)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <>
      {/* Gallery Card */}
      <div
        onClick={openModal}
        className="group cursor-pointer flex flex-col rounded-lg overflow-hidden bg-white border-2 border-blue-900 hover:shadow-xl transition-all duration-300 h-full transform hover:-translate-y-1"
      >
        <div className="relative h-64 w-full overflow-hidden">
          {item.image && (
            <Image
              src={item.image.url}
              alt={item.title || 'Gallery image'}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-yellow-500 rounded-full p-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <ZoomIn className="text-blue-900" size={20} />
            </div>
          </div>
        </div>

        <div className="flex flex-col p-4 bg-white">
          <h3 className="text-xl font-bold text-blue-900 group-hover:text-yellow-500 transition-colors duration-300">
            {item.title}
          </h3>

          <div className="mt-3 flex items-center">
            <div className="h-1 w-12 bg-yellow-500 rounded-full transition-all duration-300 group-hover:w-16" />
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/90 p-4">
          <div className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-blue-900/10">
              <h3 className="text-2xl font-bold text-blue-900">{item.title}</h3>
              <button
                onClick={closeModal}
                className="rounded-full p-2 hover:bg-gray-100 transition-colors duration-200"
              >
                <X size={24} className="text-blue-900" />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative h-[70vh] w-full">
              {item.image && (
                <Image
                  src={item.image.url}
                  alt={item.title || 'Gallery image'}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-white border-t border-blue-900/10">
              <div className="h-1 w-24 bg-yellow-500 rounded-full" />
            </div>
          </div>

          {/* Backdrop Click to Close */}
          <div className="absolute inset-0 z-[-1]" onClick={closeModal} />
        </div>
      )}
    </>
  )
}
