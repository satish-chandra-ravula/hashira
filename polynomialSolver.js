const fs = require('fs');

// Class to represent a rational number
class Rational {
    constructor(numerator, denominator = 1) {
        this.numerator = BigInt(numerator);
        this.denominator = BigInt(denominator);
        this.simplify();
    }

    simplify() {
        const gcd = this.greatestCommonDivisor(this.numerator, this.denominator);
        this.numerator /= gcd;
        this.denominator /= gcd;
    }

    greatestCommonDivisor(a, b) {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    }

    multiply(other) {
        return new Rational(this.numerator * other.numerator, this.denominator * other.denominator);
    }

    divide(other) {
        return new Rational(this.numerator * other.denominator, this.denominator * other.numerator);
    }

    subtract(other) {
        return new Rational(
            this.numerator * other.denominator - other.numerator * this.denominator,
            this.denominator * other.denominator
        );
    }

    toString() {
        return `${this.numerator}/${this.denominator}`;
    }
}

// Function to decode a number from a given base
function decodeValue(base, value) {
    return BigInt(parseInt(value.toLowerCase(), parseInt(base)));
}

// Function to read JSON input from a file
function readInput(filePath) {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

// Function to solve the linear system of equations using Gaussian elimination
function solveLinearSystem(A, B) {
    const n = A.length;
    const x = new Array(n).fill(new Rational(0));

    // Gaussian elimination
    for (let i = 0; i < n; i++) {
        // Partial pivoting
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (A[k][i].numerator > A[maxRow][i].numerator) {
                maxRow = k;
            }
        }
        [A[i], A[maxRow]] = [A[maxRow], A[i]];
        [B[i], B[maxRow]] = [B[maxRow], B[i]];

        // Eliminate column entries below the pivot
        for (let k = i + 1; k < n; k++) {
            const factor = A[k][i].divide(A[i][i]); // Use Rational for factor
            for (let j = i; j < n; j++) {
                A[k][j] = A[k][j].subtract(factor.multiply(A[i][j]));
            }
            B[k] = B[k].subtract(factor.multiply(B[i]));
        }
    }

    // Back substitution
    for (let i = n - 1; i >= 0; i--) {
        x[i] = B[i];
        for (let k = i + 1; k < n; k++) {
            x[i] = x[i].subtract(A[i][k].multiply(x[k]));
        }
        x[i] = x[i].divide(A[i][i]); // Divide by the pivot element
    }

    return x;
}

// Main function to process the input and find the constant c
function findConstantC(filePath) {
    const input = readInput(filePath);
    const n = input.keys.n;
    const k = input.keys.k;

    let decodedValues = []; // Declare decodedValues
    let roots = [];

    // Decode each value and store roots
    for (let i = 1; i <= n; i++) {
        const base = input[i].base;
        const value = input[i].value;
        const decodedValue = decodeValue(base, value);
        decodedValues.push(new Rational(decodedValue)); // Keep as Rational
        roots.push(BigInt(i)); // Assuming roots are 1, 2, ..., n
    }

    // Create equations based on the polynomial y = a_m * x^m + ... + a_1 * x + a_0
    const A = [];
    const B = [];

    for (let i = 0; i < k; i++) {
        const row = [];
        for (let j = 0; j < k; j++) {
            row.push(new Rational(roots[i] ** BigInt(j))); // Use Rational for powers
        }
        A.push(row);
        B.push(decodedValues[i]);
    }

    // Solve the equations for coefficients a_0, a_1, ..., a_m
    const results = solveLinearSystem(A, B);

    // The constant term c is the first element of the results
    const c = results[0];

    console.log("Constant (c):", c.toString());
}

// Example usage
findConstantC('input.json'); // Make sure to replace 'input.json' with your actual file path
