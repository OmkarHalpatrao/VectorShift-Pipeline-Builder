// EnhancedTextNode.js - Text node with dynamic sizing and variable handles

import { useState, useEffect, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from './store';

export const EnhancedTextNode = ({ id, data }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);
  const [text, setText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textareaRef = useRef(null);

  // Extract variables from text (matches {{variableName}})
  useEffect(() => {
    const variablePattern = /\{\{(\s*[a-zA-Z_$][a-zA-Z0-9_$]*\s*)\}\}/g;
    const matches = [...text.matchAll(variablePattern)];
    const extractedVars = matches.map(match => match[1].trim());
    const uniqueVars = [...new Set(extractedVars)];
    setVariables(uniqueVars);
  }, [text]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    updateNodeField(id, 'text', newText);
  };

  // Calculate node dimensions based on content
  const minWidth = 200;
  const minHeight = 100;
  const width = Math.max(minWidth, text.length > 50 ? 300 : 200);
  const height = Math.max(minHeight, 100 + (text.split('\n').length * 20));

  return (
    <div style={{
      width: `${width}px`,
      minHeight: `${height}px`,
      border: '2px solid #fbc02d',
      borderRadius: '8px',
      padding: '12px',
      background: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      position: 'relative'
    }}>
      {/* Variable handles on the left */}
      {variables.map((variable, index) => (
        <Handle
          key={`var-${variable}`}
          type="target"
          position={Position.Left}
          id={`${id}-${variable}`}
          style={{
            top: `${30 + (index * 30)}px`,
            background: '#fbc02d',
            width: '12px',
            height: '12px'
          }}
        >
          <div style={{
            position: 'absolute',
            right: '15px',
            top: '-5px',
            background: '#fbc02d',
            padding: '2px 6px',
            borderRadius: '3px',
            fontSize: '10px',
            fontWeight: 'bold',
            color: '#333',
            whiteSpace: 'nowrap'
          }}>
            {variable}
          </div>
        </Handle>
      ))}

      {/* Title */}
      <div style={{
        fontWeight: 'bold',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#333',
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}>
        <span>📝</span>
        <span>Text</span>
      </div>

      {/* Text input with auto-resize */}
      <div>
        <label style={{
          display: 'block',
          fontSize: '11px',
          marginBottom: '4px',
          color: '#666',
          fontWeight: '500'
        }}>
          Content:
        </label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleTextChange}
          placeholder="Enter text with {{variables}}"
          style={{
            width: '100%',
            minHeight: '60px',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '12px',
            resize: 'none',
            overflow: 'hidden',
            fontFamily: 'monospace',
            background: 'white'
          }}
        />
        {variables.length > 0 && (
          <div style={{
            marginTop: '6px',
            fontSize: '10px',
            color: '#666'
          }}>
            Variables: {variables.join(', ')}
          </div>
        )}
      </div>

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        id={`${id}-output`}
        style={{
          background: '#fbc02d',
          width: '12px',
          height: '12px'
        }}
      />
    </div>
  );
};