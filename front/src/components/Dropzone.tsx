import { ReactComponent as CheckSVG } from '../assets/check.svg'
type Props = {
    onChangeFile: (file: File | null) => void;
    value: File | null;
}

export const Dropzone: React.FC<Props> = ({ value, onChangeFile }) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files) {
            onChangeFile(e.target.files[0]);
        }
    }

    const clear = () => {
        onChangeFile(null);
    }

    return value ?
        (
            <>
                <div className="flex justify-center items-center w-6/12 mx-auto">
                    <div className='flex flex-col w-48 h-48 rounded border-dashed border-2 bg-white'>
                        <div className='flex justify-end pr-2 pt-1 cursor-pointer' onClick={clear}>
                            &times;
                        </div>
                        <div className='flex flex-1 flex-col justify-center items-center'>
                            <CheckSVG className='w-8 h-8 mb-8' />
                            <span data-testid='file-name' className='text-gray-400 text-sm'>{value?.name}</span>
                        </div>
                    </div>
                </div>
            </>
        ) :
        (
            <>
                <div className="flex justify-center items-center w-6/12 mx-auto">
                    <label htmlFor="dropzone-file" className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col justify-center items-center pt-5 pb-6">
                            <svg aria-hidden="true" className="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                            <p data-testid='drag-and-drop-text' className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click para fazer upload</span></p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">.TXT</p>
                            <input accept=".txt" id="dropzone-file" onChange={onChange} type="file" className="hidden" />
                        </div>
                    </label>
                </div>
            </>
        )


}