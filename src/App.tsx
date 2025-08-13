import { useState, useEffect } from 'react'
import { CredentialImport } from './features/upload/components/CredentialImport'
import { CredentialList } from './features/credentials/components/CredentialList'
import { getCredentials } from './lib/database'
import './App.css'

function App() {
  const [credentials, setCredentials] = useState<any[]>([])

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const data = await getCredentials()
        setCredentials(data || [])
      } catch (error) {
        console.error('فشل تحميل البيانات:', error)
      }
    }
    fetchCredentials()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <header className="bg-gradient-to-r from-primary-600 to-primary-800 text-white shadow-lg">
        <div className="container mx-auto py-8 px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center">
            نظام إدارة بيانات الاعتماد
          </h1>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* بطاقة الاستيراد */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-xl">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                استيراد بيانات الاعتماد
              </h2>
              <CredentialImport />
            </div>
          </div>

          {/* بطاقة عرض البيانات */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
                البيانات المخزنة
              </h2>
              <CredentialList credentials={credentials} />
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 نظام إدارة البيانات. جميع الحقوق محفوظة</p>
        </div>
      </footer>
    </div>
  )
}

export default App
