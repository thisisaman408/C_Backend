import { spawn } from 'child_process';
import path from 'path';

export async function getPrediction(inputs: any): Promise<number> {
  return new Promise((resolve, reject) => {
    const pythonScriptPath = path.resolve(__dirname, '../../dist/predict.py'); // Updated path

    console.log("Using Python script at:", pythonScriptPath); // Add loggi
    const pythonProcess = spawn('python3', [
      pythonScriptPath,
      JSON.stringify(inputs)
    ]);

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        try {
          const result = JSON.parse(output)
          resolve(result.prediction);
        } catch (err) {
          reject(new Error('Failed to parse prediction output: ' + output));
        }
      } else {
        reject(new Error('Python script error: ' + errorOutput));
      }
    });
  });
}