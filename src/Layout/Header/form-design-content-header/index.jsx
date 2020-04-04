import React from 'react';
import { Layout } from 'antd';
import RedoButton from '@/components/Button/redo';
import CodeButton from '@/components/Button/code';
import EyeButton from '@/components/Button/eye';
import ImportButton from '@/components/Button/import';
import FileButton from '@/components/Button/file';
import UndoButton from '@/components/Button/undo';
import SyncButton from '@/components/Button/sync';

const { Header } = Layout;

const FormDesignContentHeader = () => {
  return (
    <Header>
      <RedoButton />
      <UndoButton />
      <SyncButton />
      <ImportButton />
      <EyeButton />
      <FileButton />
      <CodeButton />
    </Header>
  );
};

export default FormDesignContentHeader;
