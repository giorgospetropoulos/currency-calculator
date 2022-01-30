import express from "express";
import { getCurrencies, getCurrency, createCurrency, deleteCurrency, updateCurrency } from "../controllers/currencies.controller.js";

const router = express.Router();

// all routes here start with /currencies
router.get("/", getCurrencies);

router.get("/:code", getCurrency);

router.post("/", createCurrency);

router.delete("/:code", deleteCurrency);

router.patch("/:code", updateCurrency);



export default router;