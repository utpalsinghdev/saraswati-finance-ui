export default function calculateEMI(principal, interestRate, years) {
    if (principal && interestRate && years) {
        interestRate = interestRate / 100;
        const totalMonths = years * 12;
        const totalInterest = principal * interestRate * years;
        const totalLoanAmount = principal + totalInterest;
        const emi = totalLoanAmount / totalMonths;
        return {
            emi: Math.round(emi),
            totalLoanAmount: totalLoanAmount,
            totalMonths,
        };
    } else {
        return null;
    }
}