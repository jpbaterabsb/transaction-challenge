import { fireEvent, render, screen } from '@testing-library/react'
import { ErrorByLine } from '../types'
import { ErrorGroup } from './ErrorGroup'

const errorByLine: ErrorByLine = {
  1: [
    {
      constraints: {
        isDate: 'data inválida'
      }
    },
    {

      constraints: {
        isNumber: 'valor inválido'
      }
    }
  ]
}

describe('ErrorGroup.tsx', () => {
  it('render without errors', () => {
    render(<ErrorGroup errors={null} setErrors={() => { }} />)
    expect(screen.getByTestId('error-container')).toHaveClass('opacity-0')
  })

  it('render with errors', () => {
    render(<ErrorGroup errors={errorByLine} setErrors={() => { }} />)
    expect(screen.getByTestId('error-container')).toHaveClass('opacity-100')
    expect(screen.getByText(/Linha 1/i)).toBeInTheDocument()
    expect(screen.getByText(/data inválida/i)).toBeInTheDocument()
    expect(screen.getByText(/valor inválido/i)).toBeInTheDocument()
  })

  it('test close button', () => {
    const closeRightSectionSpy = jest.fn()
    render(<ErrorGroup errors={errorByLine} setErrors={closeRightSectionSpy} />)
    expect(screen.getByTestId('error-container')).toHaveClass('opacity-100')
    fireEvent.click(screen.getByTestId('close-button'))
    expect(closeRightSectionSpy).toHaveBeenCalled()
  })
})
