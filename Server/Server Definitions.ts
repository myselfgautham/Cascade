// Module Imports
import express from "express";
import compression from "compression";

// Exported Module
export const path = require("path");

// Server Global Scope Definitions
const PORT = 3000;
const staticFolder = path.join(__dirname, "..", "Client")
export const templatesFolder = path.join(staticFolder, "Templates")
const DEBUG = true;

// Server Application Definition
export const application = express();
if (DEBUG) {
    let morgan = require("morgan");
    application.use(morgan("tiny"));
}
application.set("view engine", "pug");
application.use(express.static(staticFolder))
application.use(compression())

// Create Server Instance On Given Port
application.listen(PORT, () => {
    console.log(`\n\u001b[32mServer Instance Opened At Port ${PORT}\u001b[0m`);
    console.log(`Mode => \u001b[34m${!DEBUG ? "Non Verbose" : "Verbose"}\u001b[0m\n\n`)
});