import { Lock, Mail, User } from 'lucide-react'

export function CredentialList({ credentials }: { credentials: any[] }) {
  return (
    <div className="space-y-4">
      {credentials.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">لا توجد بيانات مخزنة حالياً</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  النوع
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  المعرف
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  كلمة المرور
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {credentials.map((cred, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-end">
                      {cred.email ? (
                        <Mail className="h-5 w-5 text-blue-500" />
                      ) : (
                        <User className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    {cred.email || cred.username}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                    <div className="flex items-center justify-end">
                      <Lock className="h-5 w-5 text-red-500 mr-2" />
                      ••••••••
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
