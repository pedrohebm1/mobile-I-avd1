export default function calculateTax(
  codTax: string,
  state: string,
  invoiceValue: number
): number {
    console.log(codTax, state, invoiceValue)
  if ((codTax === "1234" || codTax === "6789") && state === "RJ") {
    return (invoiceValue * 1) / 100;
  }
  if ((codTax === "1234" || codTax === "6789") && state === "SP") {
    return (invoiceValue * 2) / 100;
  }
  if ((codTax === "1234" || codTax === "6789") && state === "MG") {
    return (invoiceValue * 3) / 100;
  }
  return 0;
}
