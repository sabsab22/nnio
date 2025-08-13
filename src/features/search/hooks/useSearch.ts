import { useState } from 'react'

export function useSearch(initialDocuments: any[] = []) {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const searchDocuments = (query: string) => {
    setIsSearching(true)
    setSearchQuery(query)
    
    // Simulate advanced search (would be replaced with actual search logic)
    setTimeout(() => {
      const results = initialDocuments.filter(doc => 
        doc.content.toLowerCase().includes(query.toLowerCase()) ||
        doc.name.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
      setIsSearching(false)
    }, 500)
  }

  const clearSearch = () => {
    setSearchResults([])
    setSearchQuery('')
  }

  return {
    searchResults,
    isSearching,
    searchQuery,
    searchDocuments,
    clearSearch,
  }
}
