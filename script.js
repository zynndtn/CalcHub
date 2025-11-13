// Function to show/hide sections
function showSection(sectionId) {
    const sections = document.getElementsByClassName('app-section');
    const backButton = document.getElementById('backButton');
    
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    
    document.getElementById(sectionId).style.display = 'block'; 

    if (sectionId === 'home') {
        backButton.style.display = 'none';
    } else {
        backButton.style.display = 'block';
    }
}

// Payroll Manager Functions
let payrollList = [];
function addEmployee() {
    const name = document.getElementById('employeeName').value;
    const daysWorked = parseFloat(document.getElementById('daysWorked').value) || 0;
    const dailyRate = parseFloat(document.getElementById('dailyRate').value) || 0;
    const deduction = parseFloat(document.getElementById('deductionAmount').value) || 0;
    
    if (!name || daysWorked <= 0 || dailyRate <= 0) {
        alert('Please enter valid employee details (Name, Days Worked, and Daily Rate must be positive).');
        return;
    }

    const grossPay = daysWorked * dailyRate;
    const netPay = grossPay - deduction;
    payrollList.push({ name, daysWorked, dailyRate, deduction, grossPay, netPay });
    renderTable();
    
    // Clear inputs
    document.getElementById('employeeName').value = '';
    document.getElementById('daysWorked').value = '';
    document.getElementById('dailyRate').value = '';
    document.getElementById('deductionAmount').value = ''; 
}

function deleteEmployee() {
    const lineNumber = parseInt(document.getElementById('lineNumberToDelete').value);
    
    if (lineNumber >= 1 && lineNumber <= payrollList.length) {
        payrollList.splice(lineNumber - 1, 1);
        renderTable();
    } else {
        alert('Invalid line number to delete.');
    }
    document.getElementById('lineNumberToDelete').value = '';
}

function renderTable() {
    const body = document.getElementById('payrollTableBody');
    body.innerHTML = '';
    payrollList.forEach((e, i) => {
        const row = body.insertRow();
        row.insertCell().textContent = i + 1;
        row.insertCell().textContent = e.name;
        row.insertCell().textContent = e.daysWorked.toLocaleString('en-US');
        row.insertCell().textContent = e.dailyRate.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        row.insertCell().textContent = e.deduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        row.insertCell().textContent = e.grossPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        row.insertCell().textContent = e.netPay.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
}

// Looping Calculations Functions
function calculateFactorial() {
    const N = parseInt(document.getElementById('factorialInput').value) || 0;
    let result = 1;
    let i = N;
    while (i > 0) {
        result *= i;
        i--;
    }
    document.getElementById('factorialResult').textContent = (N > 0 ? result.toLocaleString('en-US') : '1');
}

function calculateSum() {
    const N = parseInt(document.getElementById('sumInput').value) || 0;
    let sum = 0;
    let i = 1;
    if (N > 0) { 
        do { sum += i; i++; } while (i <= N); 
    }
    document.getElementById('sumResult').textContent = sum.toLocaleString('en-US');
}

function calculateAverage() {
    const N = parseInt(document.getElementById('averageInput').value) || 0;
    let sum = 0;
    for (let i = 1; i <= N; i++) { sum += i; }
    const avg = N > 0 ? sum / N : 0;
    document.getElementById('averageResult').textContent = avg.toFixed(2);
}

// Income Tax Calculator Function
function calculateTax() {
    const income = parseFloat(document.getElementById('incomeInput').value) || 0;
    let tax = 0;
    
    // Simplified TRAIN Law Brackets (Annual)
    if (income <= 250000) { tax = 0; }
    else if (income <= 400000) { tax = (income - 250000) * 0.20; }
    else if (income <= 800000) { tax = 30000 + (income - 400000) * 0.25; }
    else if (income <= 2000000) { tax = 130000 + (income - 800000) * 0.30; }
    else if (income <= 8000000) { tax = 490000 + (income - 2000000) * 0.32; }
    else { tax = 2410000 + (income - 8000000) * 0.35; }

    document.getElementById('taxResult').innerHTML = 
        `Taxable Income: ${income.toLocaleString('en-US', { minimumFractionDigits: 2 })}<br>
        Income Tax: <span>${tax.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>`;
}

// Unit Conversion Functions
function celsiusToFahrenheit() {
    const c = parseFloat(document.getElementById('celsiusInput').value);
    const f = isNaN(c) ? 0 : ((c * 9/5) + 32);
    document.getElementById('fahrenheitResult').textContent = f.toFixed(2) + '°F';
}
function fahrenheitToCelsius() {
    const f = parseFloat(document.getElementById('fahrenheitInput').value);
    const c = isNaN(f) ? 0 : ((f - 32) * 5/9);
    document.getElementById('celsiusResult').textContent = c.toFixed(2) + '°C';
}
function metersToFeet() {
    const m = parseFloat(document.getElementById('metersInput').value);
    const ft = isNaN(m) || m < 0 ? 0 : (m * 3.28084);
    document.getElementById('feetResult').textContent = ft.toFixed(2) + 'ft';
}
function feetToMeters() {
    const ft = parseFloat(document.getElementById('feetInput').value);
    const m = isNaN(ft) || ft < 0 ? 0 : (ft / 3.28084);
    document.getElementById('metersResult').textContent = m.toFixed(2) + 'm';
}

// Initial state setup on load
document.addEventListener('DOMContentLoaded', () => {
    
    const sections = document.getElementsByClassName('app-section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
    document.getElementById('home').style.display = 'block';
});