// BaseNode.js - Flexible node abstraction

import { Handle, Position } from 'reactflow';
import { useStore } from './store';

export const BaseNode = ({ id, data, config }) => {
  const updateNodeField = useStore((state) => state.updateNodeField);

  const {
    title,
    fields = [],
    handles = [],
    style = {},
    className = ''
  } = config;

  const defaultStyle = {
    minWidth: 200,
    minHeight: 80,
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '12px',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    ...style
  };

  const handleFieldChange = (fieldName, value) => {
    updateNodeField(id, fieldName, value);
  };

  const renderField = (field) => {
    const value = data[field.name] || field.defaultValue || '';

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            style={{
              width: '100%',
              padding: '4px 8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            rows={field.rows || 3}
            style={{
              width: '100%',
              padding: '4px 8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px',
              resize: 'vertical'
            }}
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            style={{
              width: '100%',
              padding: '4px 8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '12px'
            }}
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleFieldChange(field.name, e.target.checked)}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={defaultStyle} className={className}>
      {/* Render handles */}
      {handles.map((handle, index) => (
        <Handle
          key={`${handle.type}-${handle.id || index}`}
          type={handle.type}
          position={handle.position}
          id={handle.id || `${id}-${handle.type}-${index}`}
          style={handle.style || {}}
        />
      ))}

      {/* Title */}
      <div style={{
        fontWeight: 'bold',
        marginBottom: '8px',
        fontSize: '14px',
        color: '#333'
      }}>
        {title}
      </div>

      {/* Fields */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {fields.map((field) => (
          <div key={field.name}>
            {field.label && (
              <label style={{
                display: 'block',
                fontSize: '11px',
                marginBottom: '4px',
                color: '#666',
                fontWeight: '500'
              }}>
                {field.label}:
              </label>
            )}
            {renderField(field)}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to create node configurations
export const createNodeConfig = (config) => config;