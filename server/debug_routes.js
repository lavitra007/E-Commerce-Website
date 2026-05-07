const express = require("express");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use("/api/auth", authRoutes);

console.log("Routes registered:");
app._router.stack.forEach(r => {
    if (r.route && r.route.path) {
        console.log(r.route.path);
    } else if (r.name === 'router') {
        r.handle.stack.forEach(sr => {
            if (sr.route) {
                console.log(`/api/auth${sr.route.path} [${Object.keys(sr.route.methods).join(',').toUpperCase()}]`);
            }
        });
    }
});
