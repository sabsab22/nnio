import { useState } from 'react'
import { storeCredentials } from '../../lib/database'

export function useCredentialImport() {
  const [isImporting, setIsImporting] = useState(false)
  const [importError, setImportError] = useState<string | null>(null)
  const [importSuccess, setImportSuccess] = useState(false)

  const importCredentials = async (files: File[]) => {
    setIsImporting(true)
    setImportError(null)
    setImportSuccess(false)

    try {
      const credentials = await parseCredentialFiles(files)
      await storeCredentials(credentials)
      setImportSuccess(true)
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Failed to import credentials')
    } finally {
      setIsImporting(false)
    }
  }

  const parseCredentialFiles = async (files: File[]): Promise<Array<{ email?: string; username?: string; password: string }>> => {
    const credentials: Array<{ email?: string; username?: string; password: string }> = []

    for (const file of files) {
      if (file.type !== 'text/plain') continue

      const text = await file.text()
      const lines = text.split('\n').filter(line => line.trim())

      for (const line of lines) {
        const parts = line.split(/[:;,\t]/).map(part => part.trim())
        
        if (parts.length >= 2) {
          const credential: { email?: string; username?: string; password: string } = {
            password: parts[1]
          }

          // Check if first part is email or username
          if (parts[0].includes('@')) {
            credential.email = parts[0]
          } else {
            credential.username = parts[0]
          }

          credentials.push(credential)
        }
      }
    }

    return credentials
  }

  return {
    importCredentials,
    isImporting,
    importError,
    importSuccess,
  }
}
