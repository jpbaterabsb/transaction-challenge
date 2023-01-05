import { render, screen } from "@testing-library/react";
import { LocalTable } from "./LocalTable";


const transactions = [
    {
      "id": 1,
      "type": 2,
      "date": "2022-01-16T17:13:54.000Z",
      "product": "CURSO DE BEM-ESTAR",
      "amount": 12750,
      "seller": "THIAGO OLIVEIRA",
      "transactionType": {
        "id": 2,
        "description": "Venda afiliado",
        "type": "IN"
      }  
    }
];

describe('LocalTable.tsx', () => {
    it("render without value", () => {
        render(<LocalTable  transactions={[]}/>);
        expect(screen.getByText(/Não há transações para serem apresentadas/i)).toBeInTheDocument();
    });

    it("render with value", () => {
        render(<LocalTable transactions={transactions} />);
        expect(screen.getByTestId('row1')).toBeInTheDocument();
        expect(screen.queryByTestId('row2')).not.toBeInTheDocument();
    });
});