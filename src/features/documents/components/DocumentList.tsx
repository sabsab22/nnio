import { FileText, Search } from 'lucide-react'

export function DocumentList({
  documents,
  onDocumentSelect,
}: {
  documents: any[]
  onDocumentSelect: (doc: any) => void
}) {
  return (
    <div className="space-y-4">
      {documents.length === 0 ? (
        <div className="text-center py-12">
          <Search size={48} className="mx-auto text-gray-300" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            No documents found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload documents to get started
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="py-4 px-4 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              onClick={() => onDocumentSelect(doc)}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <FileText size={24} className="text-primary-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.name}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {doc.size} • {doc.type}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
