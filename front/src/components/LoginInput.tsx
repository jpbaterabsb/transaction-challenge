import React from 'react'

interface Props {
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  label: string
  name: string
  type: 'text' | 'password'
  testid?: string
}

export const LoginInput: React.FC<Props> = ({ label, testid, ...rest }) => {
  return <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            {`${label}:`}
        </label>
        <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...rest}
            data-testid={testid}
        />
    </div>
}
