import { useState, useRef, useEffect } from 'react';

const COLS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const ROWS = 20;

export const ExcelDemo = () => {
  const [data, setData] = useState<Record<string, string>>({});
  const [selectedCell, setSelectedCell] = useState<string | null>(null);
  const [editingCell, setEditingCell] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const getCellId = (col: string, row: number) => `${col}${row}`;

  const handleCellClick = (cellId: string) => {
    setSelectedCell(cellId);
    if (editingCell !== cellId) {
      setEditingCell(null);
    }
  };

  const handleCellDoubleClick = (cellId: string) => {
    setEditingCell(cellId);
    setEditValue(data[cellId] || '');
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleInputChange = (value: string) => {
    setEditValue(value);
    if (selectedCell) {
      setData((prev) => ({ ...prev, [selectedCell]: value }));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, cellId: string) => {
    if (e.key === 'Enter') {
      setEditingCell(null);
      // Move to next row
      const col = cellId.charAt(0);
      const row = parseInt(cellId.slice(1));
      const nextCell = getCellId(col, row + 1);
      setSelectedCell(nextCell);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      setEditingCell(null);
      // Move to next column
      const colIndex = COLS.indexOf(cellId.charAt(0));
      const row = parseInt(cellId.slice(1));
      if (colIndex < COLS.length - 1) {
        setSelectedCell(getCellId(COLS[colIndex + 1], row));
      }
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  const handleFormulaChange = (value: string) => {
    setEditValue(value);
    if (selectedCell) {
      setData((prev) => ({ ...prev, [selectedCell]: value }));
    }
  };

  useEffect(() => {
    if (editingCell && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingCell]);

  return (
    <div className="h-full flex flex-col bg-gray-100" onClick={() => setEditingCell(null)}>
      {/* Toolbar */}
      <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 flex items-center gap-4">
        <span className="font-semibold text-gray-700">Microsoft Excel</span>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
            保存
          </button>
        </div>
      </div>

      {/* Formula Bar */}
      <div className="bg-white border-b border-gray-300 px-4 py-2 flex items-center gap-2">
        <div className="w-16 text-center font-medium text-gray-600 border border-gray-300 rounded px-2 py-1 bg-gray-50">
          {selectedCell || ''}
        </div>
        <span className="text-gray-400">fx</span>
        <input
          type="text"
          value={editingCell ? editValue : (selectedCell ? data[selectedCell] || '' : '')}
          onChange={(e) => handleFormulaChange(e.target.value)}
          className="flex-1 border border-gray-300 rounded px-3 py-1 focus:outline-none focus:border-blue-500"
          placeholder="输入内容..."
          onFocus={() => {
            if (selectedCell) {
              setEditingCell(selectedCell);
              setEditValue(data[selectedCell] || '');
            }
          }}
        />
      </div>

      {/* Spreadsheet */}
      <div className="flex-1 overflow-auto p-4">
        <div className="bg-white border border-gray-300 rounded shadow-sm inline-block">
          {/* Header Row */}
          <div className="flex">
            <div className="w-12 h-8 bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 sticky left-0 z-10" />
            {COLS.map((col) => (
              <div
                key={col}
                className="w-24 h-8 bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-medium text-gray-600"
              >
                {col}
              </div>
            ))}
          </div>

          {/* Data Rows */}
          {Array.from({ length: ROWS }, (_, rowIndex) => (
            <div key={rowIndex} className="flex">
              <div className="w-12 h-10 bg-gray-200 border border-gray-300 flex items-center justify-center text-xs font-medium text-gray-600 sticky left-0 z-10">
                {rowIndex + 1}
              </div>
              {COLS.map((col) => {
                const cellId = getCellId(col, rowIndex + 1);
                const isSelected = selectedCell === cellId;
                const isEditing = editingCell === cellId;
                return (
                  <div
                    key={cellId}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCellClick(cellId);
                    }}
                    onDoubleClick={() => handleCellDoubleClick(cellId)}
                    className={`w-24 h-10 border border-gray-300 text-sm relative ${
                      isSelected
                        ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {isEditing ? (
                      <input
                        ref={inputRef}
                        type="text"
                        value={editValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, cellId)}
                        onBlur={() => setEditingCell(null)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full h-full px-2 border-none outline-none bg-white"
                        autoFocus
                      />
                    ) : (
                      <div className="w-full h-full px-2 flex items-center truncate">
                        {data[cellId] || ''}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 border-t border-gray-300 px-4 py-1 flex items-center text-xs text-gray-600">
        <span>就绪</span>
      </div>
    </div>
  );
};
