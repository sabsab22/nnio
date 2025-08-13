import { Upload, FileText, Info } from 'lucide-react'
import { useRef, useState } from 'react'

export function CredentialImport() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)

  const handleUpload = async (files: File[]) => {
    setIsLoading(true)
    try {
      // محاكاة عملية الاستيراد
      await new Promise(resolve => setTimeout(resolve, 1500))
      alert('تم استيراد الملفات بنجاح')
    } catch (error) {
      console.error('حدث خطأ:', error)
      alert('فشل استيراد الملفات')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div 
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
          isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setIsDragging(false)
          if (e.dataTransfer.files.length > 0) {
            handleUpload(Array.from(e.dataTransfer.files))
          }
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          {isLoading ? (
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          ) : (
            <Upload size={48} className="text-primary-500" />
          )}
          <h3 className="text-lg font-medium text-gray-700">
            {isLoading ? 'جاري معالجة الملفات...' : 'اسحب وأفلت الملفات هنا أو انقر للاختيار'}
          </h3>
          <p className="text-sm text-gray-500">
            يدعم الملفات النصية (.txt) فقط
          </p>
          <button
            type="button"
            className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
            disabled={isLoading}
          >
            اختر ملفات
          </button>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 relative">
        <button 
          className="absolute left-4 top-4 text-blue-600 hover:text-blue-800"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          <Info size={20} />
        </button>
        <h4 className="font-medium text-blue-800 mb-2 text-right">تعليمات الاستيراد:</h4>
        {showInstructions && (
          <ul className="text-sm text-blue-700 list-disc pr-5 space-y-1 text-right">
            <li>يجب أن يكون الملف بصيغة TXT (نص عادي)</li>
            <li>استخدم أي من هذه الفواصل بين البيانات: : , ; أو مسافة</li>
            <li>الصيغة المثالية: user@example.com:password123</li>
            <li>يمكنك استيراد ملفات متعددة في نفس الوقت</li>
            <li>الحد الأقصى لحجم الملف: 5MB</li>
          </ul>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => e.target.files && handleUpload(Array.from(e.target.files))}
        className="hidden"
        accept=".txt"
        multiple
      />
    </div>
  )
}
