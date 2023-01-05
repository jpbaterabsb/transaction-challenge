import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Dropzone } from '../components/Dropzone';
import { ErrorGroup } from '../components/ErrorGroup';
import { NavigationButton } from '../components/NavigationButton';
import { registerTransactions } from '../services/transactions.service';
import { ErrorByLine } from '../types';

type TnasactionCreateResponse = {
    created: number;
    errors: ErrorByLine;
};


export const Home: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [errorMessages, setErrorMessages] = useState<ErrorByLine | null>();
    const submit = async () => {
        if (file) {
            const { data } = await registerTransactions(file);
            const {
                errors,
                created
            }: TnasactionCreateResponse = data;
            setErrorMessages(errors)
            const numberOfErrors = Object.keys(errors).length;
            if(created > 0) {
                toast(`transações registradas: ${created}`, {theme: 'colored', type: 'success'});
            }
            if(numberOfErrors > 0) {
                toast(`transações com erro: ${numberOfErrors}`, {theme: 'colored', type: 'error'});
            }
        }
    }

    return (
        <div className='container mx-auto'>
            <NavigationButton to='/transactions' label='Ver Transações' />
            <h1 className='text-center text-5xl my-8'>Hubla challenge</h1>
            <Dropzone onChangeFile={setFile} value={file} />

            <Button className='mt-5 mx-auto' onClick={submit}>
                Submeter transações
            </Button>
            <ErrorGroup errors={errorMessages} setErrors={setErrorMessages}></ErrorGroup>
        </div>
    );
}