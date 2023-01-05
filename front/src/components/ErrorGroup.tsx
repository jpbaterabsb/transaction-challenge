import React, { Dispatch, SetStateAction } from 'react'
import { ErrorByLine } from '../types'

export function ErrorGroup (props: { errors: ErrorByLine | null | undefined, setErrors: Dispatch<SetStateAction<ErrorByLine | null | undefined>> }): React.ReactElement {
  return (
    <React.Fragment>
      { (props.errors && Object.keys(props.errors).length > 0) && (
            <div data-testid="error-container" className={`bg-red-600 my-5 p-5 rounded-xl transition-all duration-300 ${(props.errors != null) ? 'opacity-100' : 'opacity-0'}`}>
                <span data-testid='close-button' className="flex flex-1 justify-end cursor-pointer text-xl hover:bg-red" onClick={() => { props.setErrors(null) }}>&times;</span>
                <ul className="space-y-4 list-inside  text-gray-800">
                    {Object.entries(props.errors).map(([line, error]) => <li key={line}>
                        {`Linha ${line}`}
                        {error.flatMap(e => Object.values(e.constraints)).map(m => <ul key={m} className="pl-5 mt-2 space-y-1 list-disc list-inside">
                            <li>{m}</li>
                        </ul>)}

                    </li>)}
                </ul>
                </div>
      ) }</React.Fragment>
  )
}
