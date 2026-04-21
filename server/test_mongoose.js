const mongoose = require("mongoose");
mongoose.connect(undefined).then(() => console.log("connected")).catch(e => { console.error("Mongoose error:", e.message); process.exit(1); });
