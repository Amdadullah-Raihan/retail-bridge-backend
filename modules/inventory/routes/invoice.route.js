const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice.controller");

// Create a new invoice
router.post("/", invoiceController.createInvoice);

// Get all invoices
router.get("/", invoiceController.getAllInvoices);

// Get a single invoice by ID
router.get("/:id", invoiceController.getInvoiceById);

// Update an invoice
router.put("/:id", invoiceController.updateInvoice);

// Delete an invoice
router.delete("/:id", invoiceController.deleteInvoice);

module.exports = router;
