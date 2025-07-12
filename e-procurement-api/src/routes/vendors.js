import express from "express";
import Vendor from "../models/Vendor.js";
import auth from "../middleware/auth.js";
import { validateVendor } from "../middleware/validation.js";

const router = express.Router();

router.post("/", auth, validateVendor, async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const existingVendor = await Vendor.findOne({ email });
    if (existingVendor) {
      return res.status(400).json({ message: "Vendor already exists" });
    }

    const vendor = new Vendor({
      name,
      email,
      phone,
      address,
      user: req.user._id,
    });

    await vendor.save();

    res.status(201).json({
      message: "Vendor registered successfully",
      vendor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("user", "username email");
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate(
      "user",
      "username email"
    );
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json({
      message: `vendor with ${vendor.name} found on database`,
      vendor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.put("/:id", auth, validateVendor, async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (
      vendor.user.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address },
      { new: true }
    ).populate("user", "username email");

    res.json({
      message: "Vendor updated successfully",
      vendor: updatedVendor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id).populate(
      "user",
      "username email"
    );

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    if (
      vendor.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    await Vendor.findByIdAndDelete(req.params.id);

    res.json({
      message: "Vendor deleted successfully",
      vendor: vendor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
