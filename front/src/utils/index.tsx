export function formatBRL(value: number): string {
    return (value/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})
}