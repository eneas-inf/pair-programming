import {calculatePayslip, Payslip} from "./payroll";

test("test calculate payslip is 16 and earns 700.-/month", () => {
    //Arrange 
    const salery = {
        born: new Date("2009-01-01T00:00"),
        payday: new Date("2025-05-25"),
        gross: 700
    };

    const expectedDeductions = new Map([["ALV", 700 / 100 * 1.1], ["NBU", 700 / 100 * 0.73]])
    const expectedTotalDeductions = expectedDeductions.get("ALV") + expectedDeductions.get("NBU")

    const expected: Payslip = {
        salary: salery,
        deductions: expectedDeductions,
        totalDeductions: expectedTotalDeductions,
        net: 700 - expectedTotalDeductions
    }

    //Act 
    const actual = calculatePayslip(salery);

    //Assert
    expect(actual.deductions).toEqual(expected.deductions);
})

test("test calculate payslip is 18 and earns 1200.-/month", () => {
    //Arrange 
    const salery = {
        born: new Date("2007-01-01T00:00"),
        payday: new Date("2025-05-25"),
        gross: 1200
    };

    const expectedDeductions = new Map([
        ["ALV", 1200 / 100 * 1.1],
        ["NBU", 1200 / 100 * 0.73],
        ["AHV", 1200 / 100 * 8.7],
        ["EO", 1200 / 100 * 0.5],
        ["IV", 1200 / 100 * 1.4]
    ])

    const expectedTotalDeductions = [...expectedDeductions.values()].reduce((a, b) => a + b, 0);

    const expected: Payslip = {
        salary: salery,
        deductions: expectedDeductions,
        totalDeductions: expectedTotalDeductions,
        net: 1200 - expectedTotalDeductions
    }

    //Act 
    const actual = calculatePayslip(salery);

    //Assert
    expect(actual.net).toBeCloseTo(expected.net, 2);
})

test("test calculate payslip is 21 and earns 5900.-/month", () => {
    //Arrange 
    const salery = {
        born: new Date("2004-01-01T00:00"),
        payday: new Date("2025-05-25"),
        gross: 5900
    };

    const expectedDeductions = new Map([
        ["AHV", 5900 / 100 * 8.7],
        ["IV", 5900 / 100 * 1.4],
        ["EO", 5900 / 100 * 0.5],
        ["ALV", 5900 / 100 * 1.1],
        ["NBU", 5900 / 100 * 0.73],
        ["PK", 5900 / 100 * 8.9]
    ])

    const expectedTotalDeductions = [...expectedDeductions.values()].reduce((a, b) => a + b, 0);

    const expected: Payslip = {
        salary: salery,
        deductions: expectedDeductions,
        totalDeductions: expectedTotalDeductions,
        net: 5900 - expectedTotalDeductions
    }

    //Act 
    const actual = calculatePayslip(salery);

    //Assert
    expect(actual.totalDeductions).toBeCloseTo(expected.totalDeductions);
})