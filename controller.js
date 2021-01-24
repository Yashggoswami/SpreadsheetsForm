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

  async function updateSheetFromGoogle(spreadId, sheetTitle,data) {
    const gsapi = google.sheets({
      version: "v4",
      auth: client,
    });
    await gsapi.spreadsheets.values.batchUpdate({
      spreadsheetId: "1EXv02bhTmTAqWRfPKz1Qbz4kf2BqFyPgrkJ4WijI7eg",
      {
        "requests": [
          {
            "appendCells": {
              "fields": "*",
              "sheetId": 0,
              "rows": [
                {
                  "values": [
                    {
                      "userEnteredValue": {
                        "stringValue": "z"
                      }
                    },
                    {
                      "userEnteredValue": {
                        "stringValue": "y"
                      }
                    },
                    {
                      "userEnteredValue": {
                        "stringValue": "ooooo"
                      }
                    }
                  ]
                }
              ]
            }
          }
        ]
      }
    })


    // [{"appendCells":[{
    //   sheetId: 0,
    //   rows: [
    //     {
    //       values: [
              
    //                       "ys",
    //                       "roll",
    //                       25,
    //                       "yas"
                        
    //                   ]
    //     }
    //   ],
    //   fields:[{
    //     valueRenderOption: "RAW",
    //   }]
    // }]}]
  //   await gsapi.spreadsheets.values.batchUpdate({
  //     spreadsheetId: "1EXv02bhTmTAqWRfPKz1Qbz4kf2BqFyPgrkJ4WijI7eg",
  //     appendCells:[{
  //       sheetId:0,
  //       // title: "Sheet1",
  //       rows: [
  //         {
  //           values: [
              
  //               "ys",
  //               "roll",
  //               25,
  //               "yas"
              
  //           ]
  //         }
  //       ],
  //       fields:"*"
  //     }]
  //   }
  //  ).then((data)=>{
  //    res.send(data)
  //  })
    // let data = await gsapi.spreadsheets.values.get({
    //   spreadsheetId: spreadId,
    //   range: sheetTitle,
    //   majorDimension: "ROWS",
    //   valueRenderOption: "FORMULA",
    //   dateTimeRenderOption: "FORMATTED_STRING", //'SERIAL_NUMBER',
    //   alt: JSON,
    //   prettyPrint: true,
    // });
  
    // return data;
  }
exports.addData=(req,res)=>{
  console.log("yash goswami")
  updateSheetFromGoogle("", "","") 
}
  
exports.FormCreate=(req,res)=>{
  
    getSheetFromGoogle(req.params.spreadsheetUrl,req.params.sheetName).then((data)=>{
      console.log(data);
        res.json(data.data);
    })

}

exports.demofunc=(req,res)=>{

console.log("aa rha hai");
res.json({yash:"yash"});
}