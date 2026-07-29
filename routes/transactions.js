// Import packages
const express = require("express");
const jwt = require("jsonwebtoken");

// Import Transaction model
const Transaction = require("../models/Transaction");

// Create router
const router = express.Router();


// ===========================
// Authentication Middleware
// ===========================
function authenticate(req, res, next) {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid token"
        });

    }

}



// ===========================
// GET ALL TRANSACTIONS
// ===========================
router.get("/", authenticate, async (req, res) => {

    try {

        const transactions = await Transaction.find({

            user: req.user.id

        }).sort({

            date: -1

        });

        res.json(transactions);

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});



// ===========================
// ADD TRANSACTION
// ===========================
router.post("/", authenticate, async (req, res) => {

    try {

        const {
            category,
            description,
            amount
        } = req.body;

        const transaction = new Transaction({

            user: req.user.id,

            category,

            description,

            amount

        });

        await transaction.save();

        res.json(transaction);

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }

});



// ===========================
// DELETE TRANSACTION
// ===========================
router.delete("/:id", authenticate, async (req, res) => {

    try {

        const transaction =
        await Transaction.findById(req.params.id);

        if (!transaction) {

            return res.status(404).json({

                message: "Transaction not found"

            });

        }

        if (
            transaction.user.toString() !==
            req.user.id
        ) {

            return res.status(403).json({

                message: "Unauthorized"

            });

        }

        await transaction.deleteOne();

        res.json({

            message: "Transaction deleted"

        });

    } catch (error) {

        res.status(500).json({

            message: "Server error"

        });

    }

});


// Export router
module.exports = router;