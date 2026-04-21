const mongoose = require("mongoose");

const adminStatSchema = new mongoose.Schema(
  {
    activeOrders: {
      type: Number,
      required: true,
      default: 0,
    },
    revenue: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const AdminStat = mongoose.model("AdminStat", adminStatSchema);

module.exports = AdminStat;
