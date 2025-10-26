// Simplified compilation script that uses solc as a node module
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import solc from 'solc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to the contract source
const contractPath = path.resolve(__dirname, '..', 'contracts', 'DonationPool.sol');
const source = fs.readFileSync(contractPath, 'utf8');

// Get the OpenZeppelin library path
const nodeModulesPath = path.resolve(__dirname, '..', 'node_modules');

// Prepare compiler input
const input = {
  language: 'Solidity',
  sources: {
    'DonationPool.sol': {
      content: source
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    },
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};

// Find all imports
function findImports(importPath) {
  try {
    const fullPath = path.resolve(nodeModulesPath, importPath);
    return { contents: fs.readFileSync(fullPath, 'utf8') };
  } catch (e) {
    console.error('Error importing file:', importPath, e);
    return { error: 'File not found' };
  }
}

// Compile the contract
console.log('Compiling DonationPool.sol...');
const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

// Check for errors
if (output.errors) {
  for (const error of output.errors) {
    if (error.severity === 'error') {
      console.error('Compilation error:', error.message);
      process.exit(1);
    } else {
      console.warn('Compilation warning:', error.message);
    }
  }
}

// Output directory
const buildDir = path.resolve(__dirname, '..', 'build');
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Extract contract data
const contract = output.contracts['DonationPool.sol']['DonationPool'];

// Write ABI and bytecode to files
fs.writeFileSync(
  path.join(buildDir, 'DonationPool.abi'),
  JSON.stringify(contract.abi, null, 2)
);

fs.writeFileSync(
  path.join(buildDir, 'DonationPool.bin'),
  contract.evm.bytecode.object
);

console.log('Compilation successful! Output saved to build/ directory.');