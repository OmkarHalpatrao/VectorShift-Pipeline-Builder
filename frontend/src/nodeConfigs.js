// nodeConfigs.js - Configuration for all nodes using the abstraction

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

// Input Node
export const InputNode = ({ id, data }) => {
  const config = {
    title: 'Input',
    fields: [
      {
        name: 'inputName',
        label: 'Name',
        type: 'text',
        defaultValue: id.replace('customInput-', 'input_'),
        placeholder: 'Enter input name'
      },
      {
        name: 'inputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'File', label: 'File' }
        ]
      }
    ],
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-value`
      }
    ],
    style: {
      background: '#e8f5e9',
      borderColor: '#4caf50'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};

// Output Node
export const OutputNode = ({ id, data }) => {
  const config = {
    title: 'Output',
    fields: [
      {
        name: 'outputName',
        label: 'Name',
        type: 'text',
        defaultValue: id.replace('customOutput-', 'output_'),
        placeholder: 'Enter output name'
      },
      {
        name: 'outputType',
        label: 'Type',
        type: 'select',
        defaultValue: 'Text',
        options: [
          { value: 'Text', label: 'Text' },
          { value: 'Image', label: 'Image' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-value`
      }
    ],
    style: {
      background: '#ffebee',
      borderColor: '#f44336'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};

// LLM Node
export const LLMNode = ({ id, data }) => {
  const config = {
    title: 'LLM',
    fields: [
      {
        name: 'model',
        label: 'Model',
        type: 'select',
        defaultValue: 'GPT-4',
        options: [
          { value: 'GPT-4', label: 'GPT-4' },
          { value: 'GPT-3.5', label: 'GPT-3.5' },
          { value: 'Claude', label: 'Claude' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-system`,
        style: { top: '33%' }
      },
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-prompt`,
        style: { top: '67%' }
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-response`
      }
    ],
    style: {
      background: '#e3f2fd',
      borderColor: '#2196f3'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};

// Text Node (will be enhanced in Part 3)
export const TextNode = ({ id, data }) => {
  const config = {
    title: 'Text',
    fields: [
      {
        name: 'text',
        label: 'Text',
        type: 'textarea',
        defaultValue: '{{input}}',
        placeholder: 'Enter text with {{variables}}'
      }
    ],
    handles: [
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-output`
      }
    ],
    style: {
      background: '#fff9c4',
      borderColor: '#fbc02d'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};

// NEW NODE 1: Filter Node
export const FilterNode = ({ id, data }) => {
  const config = {
    title: 'Filter',
    fields: [
      {
        name: 'condition',
        label: 'Condition',
        type: 'select',
        defaultValue: 'contains',
        options: [
          { value: 'contains', label: 'Contains' },
          { value: 'equals', label: 'Equals' },
          { value: 'greater', label: 'Greater Than' },
          { value: 'less', label: 'Less Than' }
        ]
      },
      {
        name: 'value',
        label: 'Value',
        type: 'text',
        placeholder: 'Enter value'
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-input`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-true`,
        style: { top: '40%' }
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-false`,
        style: { top: '60%' }
      }
    ],
    style: {
      background: '#f3e5f5',
      borderColor: '#9c27b0'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};

// NEW NODE 2: Transform Node
export const TransformNode = ({ id, data }) => {
  const config = {
    title: 'Transform',
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'uppercase',
        options: [
          { value: 'uppercase', label: 'Uppercase' },
          { value: 'lowercase', label: 'Lowercase' },
          { value: 'trim', label: 'Trim' },
          { value: 'replace', label: 'Replace' }
        ]
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-input`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-output`
      }
    ],
    style: {
      background: '#e0f2f1',
      borderColor: '#009688'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};

// NEW NODE 3: API Node
export const APINode = ({ id, data }) => {
  const config = {
    title: 'API Call',
    fields: [
      {
        name: 'method',
        label: 'Method',
        type: 'select',
        defaultValue: 'GET',
        options: [
          { value: 'GET', label: 'GET' },
          { value: 'POST', label: 'POST' },
          { value: 'PUT', label: 'PUT' },
          { value: 'DELETE', label: 'DELETE' }
        ]
      },
      {
        name: 'url',
        label: 'URL',
        type: 'text',
        placeholder: 'https://api.example.com'
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-body`
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-response`
      }
    ],
    style: {
      background: '#fce4ec',
      borderColor: '#e91e63'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};

// NEW NODE 4: Database Node
export const DatabaseNode = ({ id, data }) => {
  const config = {
    title: 'Database',
    fields: [
      {
        name: 'operation',
        label: 'Operation',
        type: 'select',
        defaultValue: 'read',
        options: [
          { value: 'read', label: 'Read' },
          { value: 'write', label: 'Write' },
          { value: 'update', label: 'Update' },
          { value: 'delete', label: 'Delete' }
        ]
      },
      {
        name: 'table',
        label: 'Table',
        type: 'text',
        placeholder: 'Enter table name'
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-query`,
        style: { top: '40%' }
      },
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-data`,
        style: { top: '60%' }
      },
      {
        type: 'source',
        position: Position.Right,
        id: `${id}-result`
      }
    ],
    style: {
      background: '#fff3e0',
      borderColor: '#ff9800'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};

// NEW NODE 5: Notification Node
export const NotificationNode = ({ id, data }) => {
  const config = {
    title: 'Notification',
    fields: [
      {
        name: 'channel',
        label: 'Channel',
        type: 'select',
        defaultValue: 'email',
        options: [
          { value: 'email', label: 'Email' },
          { value: 'sms', label: 'SMS' },
          { value: 'slack', label: 'Slack' },
          { value: 'webhook', label: 'Webhook' }
        ]
      },
      {
        name: 'recipient',
        label: 'Recipient',
        type: 'text',
        placeholder: 'Enter recipient'
      }
    ],
    handles: [
      {
        type: 'target',
        position: Position.Left,
        id: `${id}-message`
      }
    ],
    style: {
      background: '#ede7f6',
      borderColor: '#673ab7'
    }
  };

  return <BaseNode id={id} data={data} config={config} />;
};