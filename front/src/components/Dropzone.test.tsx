import { render, screen } from '@testing-library/react'
import { Dropzone } from './Dropzone'

describe('Dropzone.tsx', () => {
  it('render without value', () => {
    render(<Dropzone onChangeFile={() => {}} value={null} />)
    expect(screen.getByTestId('drag-and-drop-text')).toHaveTextContent('Click para fazer upload')
  })

  it('render with value', () => {
    const file = new File([], 'test')
    render(<Dropzone onChangeFile={() => {}} value={file} />)
    expect(screen.getByTestId('file-name')).toHaveTextContent(file.name)
  })
})
