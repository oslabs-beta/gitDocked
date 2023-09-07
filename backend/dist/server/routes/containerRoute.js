"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const containerController_1 = require("../controllers/containerController");
const router = (0, express_1.Router)();
router.get('/metrics', containerController_1.container.getMetrics, (req, res, next) => {
});
