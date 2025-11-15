// ui.js
// Displays the drag-and-drop UI with enhanced styling

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { 
  InputNode, 
  LLMNode, 
  OutputNode,
  FilterNode,
  TransformNode,
  APINode,
  DatabaseNode,
  NotificationNode
} from './nodeConfigs';
import { EnhancedTextNode } from './EnhancedTextNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: EnhancedTextNode,
  filter: FilterNode,
  transform: TransformNode,
  api: APINode,
  database: DatabaseNode,
  notification: NotificationNode
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes,
    edges,
    getNodeID,
    addNode,
    onNodesChange,
    onEdgesChange,
    onConnect
  } = useStore(selector, shallow);

  const getInitNodeData = (nodeID, type) => {
    let nodeData = { id: nodeID, nodeType: `${type}` };
    return nodeData;
  }

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (event?.dataTransfer?.getData('application/reactflow')) {
        const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
        const type = appData?.nodeType;
  
        if (typeof type === 'undefined' || !type) {
          return;
        }
  
        const position = reactFlowInstance.project({
          x: event.clientX - reactFlowBounds.left,
          y: event.clientY - reactFlowBounds.top,
        });

        const nodeID = getNodeID(type);
        const newNode = {
          id: nodeID,
          type,
          position,
          data: getInitNodeData(nodeID, type),
        };
  
        addNode(newNode);
      }
    },
    [reactFlowInstance, getNodeID, addNode]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    <div style={{ margin: '10px' }}>
      <div 
        ref={reactFlowWrapper} 
        style={{
          width: '100%', 
          height: '70vh',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          snapGrid={[gridSize, gridSize]}
          connectionLineType='smoothstep'
          fitView
        >
          <Background 
            color="#aaa" 
            gap={gridSize} 
            style={{ background: '#f8f9fa' }}
          />
          <Controls style={{ button: { background: 'white' }}} />
          <MiniMap 
            style={{ 
              background: 'white',
              borderRadius: '4px'
            }}
            nodeColor={(node) => {
              const colors = {
                customInput: '#4caf50',
                customOutput: '#f44336',
                llm: '#2196f3',
                text: '#fbc02d',
                filter: '#9c27b0',
                transform: '#009688',
                api: '#e91e63',
                database: '#ff9800',
                notification: '#673ab7'
              };
              return colors[node.type] || '#999';
            }}
          />
        </ReactFlow>
      </div>
    </div>
  );
}