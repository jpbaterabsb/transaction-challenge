import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

type NavigationButtonProps = {
    to: string;
    label: string;
}

export function NavigationButton({to, label}: NavigationButtonProps) {
    const navigate  = useNavigate();
    return (<div className='flex justify-end pr-5 py-5'>
        <Button data-testid="main-button" onClick={() => navigate(to)}>
            {label}
        </Button>
    </div>);
}
