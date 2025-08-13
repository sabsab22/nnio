import { Search, X } from 'lucide-react'
import { useState } from 'react'

export function SearchBar({
  onSearch,
  onClear,
}: {
  onSearch: (query: string) => void
  onClear: () => void
}) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query)
    }
  }

  return (
    <div className="relative w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Search documents..."
        className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
      {query && (
        <button
          onClick={() => {
            setQuery('')
            onClear()
          }}
          className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      )}
      <button
        onClick={handleSearch}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary-500 hover:text-primary-700"
      >
        <Search size={20} />
      </button>
    </div>
  )
}
