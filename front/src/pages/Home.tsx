import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { Dropzone } from '../components/Dropzone';

export const Home: React.FC = () => {
    const [file, setFile] = useState<File|null>(null);
    const submit = () => {}
  return (
    <div className='container mx-auto'>
    <h1 className='text-center text-5xl my-8'>Hubla challenge</h1>
    <Dropzone onChangeFile={setFile} value={file} />

    <Button className='mt-5 mx-auto' onClick={submit}>
      Submeter transações
    </Button>

  </div>
  );
}