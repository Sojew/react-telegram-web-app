import React from 'react';
import { Button, Typography, Row, Col } from 'antd';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import useIncomeSourcesStore from './stores/storage'; // Make sure the path is correct
import './index.css';

const IncomeSources = () => {
  const { incomeSourcesJson, addOption, removeOption } = useIncomeSourcesStore();
  const { sourcesEnabled, sourcesDisabled } = incomeSourcesJson || { sourcesEnabled: {}, sourcesDisabled: {} };
  const [isEditing, setIsEditing] = React.useState(false);

  const toggleEditMode = () => {
    setIsEditing(prev => !prev);
  };

  const TextBar = ({ id, sourceHeader, sourceBodyText }: { id: string; sourceHeader: string; sourceBodyText: string }) => {
    const isEnabled = sourcesEnabled.hasOwnProperty(id);
  
    return (
      <div className="textBar">
        <Row justify="space-between" align="middle" style={{ width: '100%' }}>
          <Col>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {isEditing ? (
                <Typography.Text>{sourceHeader}</Typography.Text>
              ) : (
                <Typography.Title level={5}>{sourceHeader}</Typography.Title>
              )}
              <Typography.Text>{sourceBodyText}</Typography.Text>
            </div>
          </Col>
          {isEditing && (
            <Col>
              {isEnabled ? (
                <Button icon={<MinusOutlined />} onClick={() => removeOption(id)} />
              ) : (
                <Button icon={<PlusOutlined />} onClick={() => addOption(id)} />
              )}
            </Col>
          )}
        </Row>
      </div>
    );
  };

  return (
    <div>
      <Row justify="space-between" align="middle">
        <Col>
          <Typography.Text className="hint-color">Источники дохода</Typography.Text>
        </Col>
        <Col>
          <Button type="link" onClick={toggleEditMode}>
            <Typography.Text className="hint-color">
              {isEditing ? 'Готово' : 'Редактировать'}
            </Typography.Text>
          </Button>
        </Col>
      </Row>
      <div className="contentWrapper">
        {Object.keys(sourcesEnabled).length === 0 && !isEditing ? (
          <Typography.Text className="hint-color">
            Для добавления источников дохода используйте кнопку "Редактировать"
          </Typography.Text>
        ) : (
          <>
            {/* Render only enabled sources when not in editing mode */}
            {Object.entries(sourcesEnabled).map(([id, option]) => (
              <TextBar key={id} id={id} sourceHeader={option.sourceHeader} sourceBodyText={option.sourceBodyText} />
            ))}
            {isEditing && Object.keys(sourcesDisabled).length > 0 && (
              <Typography.Text className="hint-color" style={{ marginTop: '20px' }}>
                Можно добавить:
              </Typography.Text>
            )}
            {/* Render disabled sources when in editing mode */}
            {isEditing && Object.entries(sourcesDisabled).map(([id, option]) => (
              <TextBar key={id} id={id} sourceHeader={option.sourceHeader} sourceBodyText={option.sourceBodyText} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default IncomeSources;
