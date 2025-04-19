"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrediction = getPrediction;
const child_process_1 = require("child_process");
const path_1 = __importDefault(require("path"));
const pythonScriptPath = path_1.default.resolve(__dirname, '../../predict.py');
function getPrediction(inputs) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const pythonProcess = (0, child_process_1.spawn)('python3', [
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
                        const result = JSON.parse(output);
                        resolve(result.prediction);
                    }
                    catch (err) {
                        reject(new Error('Failed to parse prediction output: ' + output));
                    }
                }
                else {
                    reject(new Error('Python script error: ' + errorOutput));
                }
            });
        });
    });
}
