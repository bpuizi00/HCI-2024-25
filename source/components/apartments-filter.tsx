"use client"
import { useState } from "react"

export function ApartmentsFilter({ onApply }: { onApply?: (filter: { text: string; available: boolean }) => void }) {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState("")
  const [available, setAvailable] = useState(false)

  const handleApply = () => {
    onApply?.({ text, available })
    setOpen(false)
  }

  return (
    <div className="relative mb-8">
      <button
        className="px-6 py-2 rounded border border-blue-500 text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-colors flex items-center gap-2"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0013 13.414V19a1 1 0 01-1.447.894l-4-2A1 1 0 017 17v-3.586a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
        </svg>
        Filters
      </button>
      {open && (
        <div className="absolute left-0 mt-2 w-72 bg-white border border-gray-200 rounded shadow-lg p-4 z-10">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-1 mb-4"
            placeholder="Search apartments..."
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={available}
              onChange={e => setAvailable(e.target.checked)}
            />
            <span className="ml-2 text-sm text-gray-700">Available</span>
          </label>
          <button
            className="w-full px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
            onClick={handleApply}
            type="button"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  )
}