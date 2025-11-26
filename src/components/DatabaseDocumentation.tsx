import React, { useState } from 'react';
import { FileText, Database, GitBranch, Table, Download, CheckCircle } from './icons';
import { IDEF0Diagram } from './IDEF0Diagram';
import { ERDiagram } from './ERDiagram';
import { SQLScript } from './SQLScript';
import { TablesDescription } from './TablesDescription';
import { Normalization } from './Normalization';

type TabType = 'idef0' | 'er-diagram' | 'sql-script' | 'tables' | 'normalization';

export function DatabaseDocumentation() {
  const [activeTab, setActiveTab] = useState<TabType>('idef0');

  const tabs = [
    { id: 'idef0' as TabType, label: 'IDEF0 Диаграмма', icon: GitBranch },
    { id: 'er-diagram' as TabType, label: 'ER-Диаграмма', icon: Database },
    { id: 'normalization' as TabType, label: 'Нормализация', icon: CheckCircle },
    { id: 'tables' as TabType, label: 'Описание таблиц', icon: Table },
    { id: 'sql-script' as TabType, label: 'SQL Скрипт', icon: FileText },
  ];

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#2E86C1',
          marginBottom: '8px',
          fontFamily: 'Montserrat, sans-serif'
        }}>
          База данных системы управления заявками
        </h1>
        <p style={{ color: '#666', fontSize: '16px' }}>
          Полная документация по структуре базы данных для IT-отдела колледжа
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden'
      }}>
        {/* Tab Headers */}
        <div style={{
          display: 'flex',
          borderBottom: '2px solid #f0f0f0',
          overflowX: 'auto',
          background: '#f8f9fa'
        }}>
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: '1',
                  minWidth: '200px',
                  padding: '16px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  border: 'none',
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  color: activeTab === tab.id ? '#2E86C1' : '#666',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  borderBottom: activeTab === tab.id ? '3px solid #2E86C1' : '3px solid transparent',
                  fontFamily: 'Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: activeTab === tab.id ? '600' : '400'
                }}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div style={{ padding: '32px' }}>
          {activeTab === 'idef0' && <IDEF0Diagram />}
          {activeTab === 'er-diagram' && <ERDiagram />}
          {activeTab === 'sql-script' && <SQLScript />}
          {activeTab === 'tables' && <TablesDescription />}
          {activeTab === 'normalization' && <Normalization />}
        </div>
      </div>
    </div>
  );
}