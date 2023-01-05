import { fireEvent, render, screen } from '@testing-library/react'
import { SelectGroup } from './SelectGroup'

describe('SelectGroup.tsx', () => {
  it('should select afiliado group', () => {
    const mocked = jest.fn()
    render(<SelectGroup onChange={mocked} />)
    fireEvent.change(screen.getByTestId('groups'), { target: { value: 2 } })
    const options: any[] = screen.getAllByTestId('select-option')
    expect(options[0].selected).toBeTruthy()
    expect(options[1].selected).toBeFalsy()
    expect(options[2].selected).toBeFalsy()
  })
})
