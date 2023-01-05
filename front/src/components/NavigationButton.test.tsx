import { fireEvent, render, screen } from "@testing-library/react";
import { NavigationButton } from "./NavigationButton";
import * as router from 'react-router'

const navigate = jest.fn()


describe('LocalTable.tsx', () => {
    it("render without value", () => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
        render(<NavigationButton  label="test" to="/home"/>);
        expect(screen.getByText(/test/i)).toBeInTheDocument();
        fireEvent.click(screen.getByTestId('main-button'));
        expect(navigate).toHaveBeenCalledWith('/home');
    });
});