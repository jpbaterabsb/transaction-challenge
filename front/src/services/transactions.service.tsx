import { rest } from "../configurations/rest";

export const registerTransactions = (file: File) => {
    const formData = new FormData();
      formData.append('file', file);
      return rest.post('/transactions', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      });
}


export const listTransactions = (group: number) => {
    const query = group < 3 ? `?group=${group}` : '';
      return rest.get(`/transactions${query}`);
}