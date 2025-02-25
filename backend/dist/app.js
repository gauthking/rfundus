"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const otpRoutes_1 = __importDefault(require("./routes/otpRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
// app setup
const app = (0, express_1.default)();
//middleware
app.use((0, cors_1.default)({ credentials: true }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
//routes 
app.use("/api/otp", otpRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
exports.default = app;
