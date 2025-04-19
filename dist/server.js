"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const predict_1 = __importDefault(require("./src/routes/predict"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)({
    origin: 'https://c-ui.vercel.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express_1.default.json());
app.use('/predict', predict_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
