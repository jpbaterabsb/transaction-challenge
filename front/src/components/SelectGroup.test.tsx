import { fireEvent, render, screen } from "@testing-library/react";
import { SelectGroup } from "./SelectGroup";


describe('SelectGroup.tsx', () => {
    it("render without value", () => {
        const mocked = jest.fn();
        render(<SelectGroup  onChange={mocked} />);
        fireEvent.change(screen.getByTestId('groups'), { target: { value: 2 } });
        let options: any[] = screen.getAllByTestId('select-option')
        expect(options[0].selected).toBeFalsy();
        expect(options[1].selected).toBeTruthy();
        expect(options[2].selected).toBeFalsy();
    });
});