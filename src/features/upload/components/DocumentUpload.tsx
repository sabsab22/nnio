import { Upload, FileText } from 'lucide-react'
import { useRef, useState } from 'react'

export function DocumentUpload({
  onUpload,
}: {
  onUpload: (files: File[]) => Promise<void>
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsLoading(true)
      await onUpload(Array.from(e.target.files))
      setIsLoading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setIsLoading(true)
      await onUpload(Array.from(e.dataTransfer.files))
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
        isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        multiple
        accept=".txt,.pdf,.doc,.docx"
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <Upload size={48} className="text-primary-500" />
        <h3 className="text-lg font-medium text-gray-900">
          {isLoading ? 'Processing documents...' : 'Drag & drop files here'}
        </h3>
        <p className="text-sm text-gray-500">
          Supports TXT, PDF, DOC, DOCX files
        </p>
        <button
          type="button"
          className="mt-2 px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Select Files
        </button>
      </div>
    </div>
  )
}
