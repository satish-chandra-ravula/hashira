# hashira
Polynomial Secret Finder
This Node.js project reads polynomial roots from a JSON file, decodes the values from various bases, and calculates the constant term c of the polynomial using Gaussian elimination with rational number support for accuracy.

Features
Reads input roots from a JSON file.

Decodes values encoded in different bases.

Solves polynomial coefficients accurately using rational arithmetic.

Outputs the constant term c of the polynomial.

How to Use
Place your input JSON file (e.g., input.json) in the project directory.

Run the script using Node.js:

nginx
Copy
Edit
node yourScriptFileName.js
The output will display the constant term c.

Input Format
The JSON file should have the following format:

json
Copy
Edit
{
  "keys": {
    "n": <number_of_roots>,
    "k": <degree_of_polynomial_plus_one>
  },
  "1": {
    "base": "<base_of_value>",
    "value": "<encoded_value>"
  },
  ...
}
Example
json
Copy
Edit
{
  "keys": {
    "n": 4,
    "k": 3
  },
  "1": {
    "base": "10",
    "value": "4"
  },
  "2": {
    "base": "2",
    "value": "111"
  },
  "3": {
    "base": "10",
    "value": "12"
  },
  "6": {
    "base": "4",
    "value": "213"
  }
}
Requirements
Node.js installed on your system.

Notes
The code handles large numbers by using BigInt and rational arithmetic for precision.

The constant term c is output as a simplified fraction.

