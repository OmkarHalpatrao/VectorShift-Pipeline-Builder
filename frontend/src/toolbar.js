// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ 
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '8px',
      margin: '10px'
    }}>
      <h2 style={{ 
        color: 'white', 
        marginBottom: '15px',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Node Palette
      </h2>
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: '12px'
      }}>
        {/* Original Nodes */}
        <DraggableNode type='customInput' label='Input' />
        <DraggableNode type='llm' label='LLM' />
        <DraggableNode type='customOutput' label='Output' />
        <DraggableNode type='text' label='Text' />
        
        {/* New Nodes */}
        <DraggableNode type='filter' label='Filter' />
        <DraggableNode type='transform' label='Transform' />
        <DraggableNode type='api' label='API Call' />
        <DraggableNode type='database' label='Database' />
        <DraggableNode type='notification' label='Notification' />
      </div>
    </div>
  );
};