export function calculateTotal(amounts: string): number {
    // Split the amounts by either newlines or comas, then clean up the results
    const amountArray = amounts
        .split(/[\n,]+/)
        .map(amount => amount.trim()) // Remove whitespace around each amount
        .filter(amount => amount !== "") // Remove empty strings
        .map(amount => parseFloat(amount)); // Convert each amount to a float

    // Sum all valid numbers (filter out NaN values)
    return amountArray
        .filter(num => !isNaN(num)) // filter out any NaN(Not A Number) values
        .reduce((sum, num) => sum + num, 0); // reduce the array to a single value by summing all numbers
}