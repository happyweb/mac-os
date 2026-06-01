import { useState } from 'react';

interface MindMapNode {
  id: string;
  text: string;
  children: MindMapNode[];
}

const createNode = (text: string): MindMapNode => ({
  id: Math.random().toString(36).slice(2),
  text,
  children: [],
});

export const XmindDemo = () => {
  const [root, setRoot] = useState<MindMapNode>({
    id: 'root',
    text: '中心主题',
    children: [
      { id: '1', text: '分支主题 1', children: [] },
      { id: '2', text: '分支主题 2', children: [] },
      { id: '3', text: '分支主题 3', children: [] },
    ],
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addChild = (parentId: string) => {
    const addToNode = (node: MindMapNode): MindMapNode => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...node.children, createNode(`新主题 ${node.children.length + 1}`)],
        };
      }
      return {
        ...node,
        children: node.children.map(addToNode),
      };
    };
    setRoot(addToNode(root));
  };

  const deleteNode = (nodeId: string) => {
    if (nodeId === 'root') return;
    const deleteFromNode = (node: MindMapNode): MindMapNode => ({
      ...node,
      children: node.children.filter((c) => c.id !== nodeId).map(deleteFromNode),
    });
    setRoot(deleteFromNode(root));
    setSelectedId(null);
  };

  const renderNode = (node: MindMapNode, level: number = 0) => {
    const isSelected = selectedId === node.id;
    const hasChildren = node.children.length > 0;

    return (
      <div key={node.id} className="flex flex-col items-center">
        <div
          className={`px-4 py-2 rounded-lg cursor-pointer transition-all ${
            isSelected
              ? 'bg-orange-500 text-white shadow-lg scale-105'
              : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
          }`}
          onClick={() => setSelectedId(node.id)}
        >
          {node.text}
        </div>
        {hasChildren && (
          <div className="flex gap-8 mt-4">
            {node.children.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="w-px h-6 bg-orange-300" />
                {renderNode(child, level + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Toolbar */}
      <div className="bg-gray-200 border-b border-gray-300 px-4 py-2 flex items-center gap-4">
        <span className="font-semibold text-gray-700">Xmind</span>
        <div className="flex-1" />
        {selectedId && selectedId !== 'root' && (
          <button
            onClick={() => deleteNode(selectedId)}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
          >
            删除
          </button>
        )}
        {selectedId && (
          <button
            onClick={() => addChild(selectedId)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            添加子主题
          </button>
        )}
      </div>

      {/* Mind Map Canvas */}
      <div className="flex-1 overflow-auto p-8">
        <div className="min-h-full flex justify-center">
          {renderNode(root)}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-200 border-t border-gray-300 px-4 py-1 flex items-center text-xs text-gray-600">
        <span>点击节点选中，双击添加子主题</span>
      </div>
    </div>
  );
};
