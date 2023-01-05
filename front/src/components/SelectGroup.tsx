import { Label, Select } from 'flowbite-react';
import React from 'react';
import { GROUPS } from '../types';

// import { Container } from './styles';


type SelectGroupProps = {
    onChange: (group: number) => void;
}

export function SelectGroup({ onChange }: SelectGroupProps) {
    return (

        <div id="select">
            <div className="block">
                <Label
                    htmlFor="countries"
                    value="Select your country"
                />
            </div>
            <div className="w-4/12 mb-8 mt-2">

                <Select id="groups" data-testid="groups" required={true} onChange={e => onChange(Number(e.target.value))}>
                    <option data-testid="select-option" value={GROUPS.PRODUTOR}>
                        Produtor
                    </option>
                    <option data-testid="select-option" value={GROUPS.AFILIADO}>
                        Afiliado
                    </option>
                    <option data-testid="select-option" value={GROUPS.NENHUM}>
                        Nenhum
                    </option>
                </Select>
            </div>
        </div>
    );
}