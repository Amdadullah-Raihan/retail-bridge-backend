const Invoice = require("../models/invoice.model");

// Create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const { invoiceNumber, customer, items, totalAmount } = req.body;
    const newInvoice = new Invoice({
      invoiceNumber,
      customer,
      items,
      totalAmount,
    });
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating invoice", error: error.message });
  }
};

// Get all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("customer items.product");
    res.status(200).json(invoices);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving invoices", error: error.message });
  }
};

// Get a single invoice by ID
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate(
      "customer items.product"
    );
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving invoice", error: error.message });
  }
};

// Update an invoice
exports.updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json(updatedInvoice);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating invoice", error: error.message });
  }
};

// Delete an invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting invoice", error: error.message });
  }
};
