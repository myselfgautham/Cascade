import * as Server from "./Server Definitions.ts"

Server.application.get("/", async function (_, res) {
    res.render(Server.path.join(
        Server.templatesFolder, "HomePage.pug"
    ));
})

Server.application.get("/account/create", async function (_, res) {
    res.render(Server.path.join(
        Server.templatesFolder, "CreateAccount.pug"
    ));
});