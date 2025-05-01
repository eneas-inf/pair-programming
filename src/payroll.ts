export type Salary = {
  born: Date;
  payday: Date;
  gross: number;
};

export type Deductions = Map<string, number>;

export const DEDUCTION_RATES: Deductions = new Map([
  ["AHV", 8.7],
  ["IV", 1.4],
  ["EO", 0.5],
  ["ALV", 1.1],
  ["NBU", 0.73],
  ["PK", 8.9],
]);

export type Payslip = {
  salary: Salary;
  deductions: Deductions;
  totalDeductions: number;
  net: number;
};

export function calculatePayslip(salary: Salary): Payslip {
  const yearlyGross = salary.gross * 12;
  const deductions = new Map();

  if (salary.payday.getFullYear() > salary.born.getFullYear() + 17) {
    addDeductions(["AHV", "IV", "EO"], salary, deductions);
  }
  if (yearlyGross > 2500) {
    addDeductions(["ALV", "NBU"], salary, deductions);
  }
  if (yearlyGross > 22680) {
    addDeductions(["PK"], salary, deductions);
  }

  const totalDeductions = [...deductions.values()].reduce((acc, current) => acc + current, 0)

  return {
    salary: salary,
    deductions: deductions,
    totalDeductions: totalDeductions,
    net: salary.gross - totalDeductions,
  };
}

function addDeductions(deductionNames: string[], salary: Salary, deductions: Deductions): void {
  for (const deductionName of deductionNames) {
    deductions.set(deductionName, salary.gross / 100 * DEDUCTION_RATES.get(deductionName));
  }
}