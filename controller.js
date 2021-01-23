const { google } = require("googleapis");
const keys = require("assets/client_secret.json");

const client = new google.auth.JWT(keys.client_email, null, keys.private_key, [
    "https://www.googleapis.com/auth/spreadsheets",
  ]);

  client.authorize((err, tokens) => {
    if (err) {
      console.error(err);
      return;
    } else {
      console.log("connected!");
    }
  });


  async function getSheetFromGoogle(spreadId, sheetTitle) {
    const gsapi = google.sheets({
      version: "v4",
      auth: client,
    });
  
    let data = await gsapi.spreadsheets.values.get({
      spreadsheetId: spreadId,
      range: sheetTitle,
      majorDimension: "ROWS",
      valueRenderOption: "FORMULA",
      dateTimeRenderOption: "FORMATTED_STRING", //'SERIAL_NUMBER',
      alt: JSON,
      prettyPrint: true,
    });
  
    return data;
  }

exports.FormCreate=(req,res)=>{
<<<<<<< HEAD
    var patt = new RegExp("d/(.*)/");
    var ress = patt.exec(req.body.spreadsheetUrl);
    var spreadId = ress ? ress[1] : req.body.spreadsheetUrl;
    var data=getSheetFromGoogle(spreadId,req.body.sheetName).then((data)=>{
      console.log(typeof(data.data.values[0]))
        res.send(data.data.values);
        // res.end('')
=======
  
    getSheetFromGoogle(req.params.spreadsheetUrl,req.params.sheetName).then((data)=>{
        res.json(data.data.values[0]);
>>>>>>> 5b9f0f42212c06d29bc24a661153ab0790ac1763
    })
    
}

exports.demofunc=(req,res)=>{
  
console.log("aa rha hai");
res.json({yash:"yash"});
}