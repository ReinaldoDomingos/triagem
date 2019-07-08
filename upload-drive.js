const auth = require("./gdrive-auth");
const gdrive = require("./gdrive");
 
gdrive.dbUpload("db.json", "./db.json", (id) => { 
    console.log(id);
});
