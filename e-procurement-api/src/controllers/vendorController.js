class VendorController {
    constructor(Vendor) {
        this.Vendor = Vendor;
    }

    async registerVendor(req, res) {
        try {
            const { name, email, phone } = req.body;
            const newVendor = new this.Vendor({ name, email, phone });
            await newVendor.save();
            res.status(201).json({ message: 'Vendor registered successfully', vendor: newVendor });
        } catch (error) {
            res.status(500).json({ message: 'Error registering vendor', error: error.message });
        }
    }

    async getVendors(req, res) {
        try {
            const vendors = await this.Vendor.find();
            res.status(200).json(vendors);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching vendors', error: error.message });
        }
    }

    async getVendorById(req, res) {
        try {
            const vendor = await this.Vendor.findById(req.params.id);
            if (!vendor) {
                return res.status(404).json({ message: 'Vendor not found' });
            }
            res.status(200).json(vendor);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching vendor', error: error.message });
        }
    }

    async updateVendor(req, res) {
        try {
            const updatedVendor = await this.Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedVendor) {
                return res.status(404).json({ message: 'Vendor not found' });
            }
            res.status(200).json({ message: 'Vendor updated successfully', vendor: updatedVendor });
        } catch (error) {
            res.status(500).json({ message: 'Error updating vendor', error: error.message });
        }
    }

    async deleteVendor(req, res) {
        try {
            const deletedVendor = await this.Vendor.findByIdAndDelete(req.params.id);
            if (!deletedVendor) {
                return res.status(404).json({ message: 'Vendor not found' });
            }
            res.status(200).json({ message: 'Vendor deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting vendor', error: error.message });
        }
    }
}

export default VendorController;