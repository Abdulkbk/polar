import React from 'react';
import styled from '@emotion/styled';
import { usePrefixedTranslation } from 'hooks';
import { Button, Empty } from 'antd';
import { Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useStoreActions } from 'store';

const Styled = {
  Title: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    font-weight: bold;
  `,
};

const SimulationDesignerTab: React.FC = () => {
  const { l } = usePrefixedTranslation(
    'cmps.designer.default.DefaultSidebar.SimulationDesignerTab',
  );

  const { showAddSimulation } = useStoreActions(s => s.modals);

  return (
    <div>
      <Styled.Title>
        <span>{l('title')}</span>
        <Tooltip overlay={l('createBtn')} placement="topLeft">
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={() => showAddSimulation({})}
          />
        </Tooltip>
      </Styled.Title>
      <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={l('emptyMsg')}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showAddSimulation({})}
        >
          {l('createBtn')}
        </Button>
      </Empty>
    </div>
  );
};

export default SimulationDesignerTab;
