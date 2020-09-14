var token  = "1318816622:AAHeAfpaHr19Q9lGTu5gnMvHM6No6rTtRhU";
var url  = "https://api.telegram.org/bot" + token;
var webAppUrl = "https://script.google.com/macros/s/AKfycby3b7hcArEsIorFiaqj8GnsuxoqNKQA4538CCOgjApkiD8jWA/exec"
var ssId = "1bnEJG7KHnhWehUDEnFxlnxsQDSK9NdicjhbRu6GzUXk"

function getMe() {
  var response = UrlFetchApp.fetch(url+ "/getMe");
  Logger.log(response.getContentText());
}

function setWebhook() {
  var response = UrlFetchApp.fetch(url+ "/setWebhook?url="+ webAppUrl);
  Logger.log(response.getContentText());
}

function sendText(id, text) {
  var response = UrlFetchApp.fetch(url+ "/sendMessage?chat_id="+ id + "&text=" + text);
  Logger.log(response.getContentText());
}

function getUpdates() {
  var response = UrlFetchApp.fetch(url+ "/getUpdates");
  Logger.log(response.getContentText());
}

function doGet(e) {
  return HtmlService.createHtmlOutput("Hello" + JSON.stringify(e));
}

function doPost(e) {
//  GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), "Telegram Bot Update", JSON.stringify(e, null, 4));
  var contents = JSON.parse(e.postData.contents);
  GmailApp.sendEmail(Session.getEffectiveUser().getEmail(), "Telegram Bot Update", JSON.stringify(contents, null, 4));
  var text = contents.message.text;
  var id = contents.message.from.id;
  var lastname = contents.message.from.last_name;
  if (lastname == undefined) {
    var name = contents.message.from.first_name;
    } else {
      var name = contents.message.from.first_name + " " + lastname;
    }
  
  //var key = InlineKeyboardMarkup.
  //sendText(id, "Hi " + name);
  if (text == 'Добавить запись') {
    sendNoteKeyboard(id, name);
  }
  if (text == "/start"){
   sendMainKeyboard(id, name);

//   {
//     inline_keyboard: [
//       [
//         {text:'Sandwich',callback_data:'sandwich'},
//         {text:'A juicy steak',callback_data:'steak'}
//       ],
//       [
//         {text:'Sandwich2',callback_data:'sandwich2'},
//         {text:'A juicy steak2',callback_data:'steak2'}
//       ]
//     ]
//   } 
  
  }
  //SpreadsheetApp.openById(ssId).appendRow([new Date(),id,name,text, contents]);
}

function sendMainKeyboard(id,name) {
  
    var keyboard =  
        {
     keyboard:
      [[ "Добавить запись","Баланс"],
       ["Сальдо","Расходы"]],
     resize_keyboard:true,
     one_time_keyboard:true
   }
    
  sendText(id,"Привет " + name + "! Что вы хотите сделать", keyboard);
}

function sendNoteKeyboard(id,name) {
  
    var keyboard =  
        {
     keyboard:
      [[ "Расход","Доход"],
       ["Новая категория","Новый магазин"]],
     resize_keyboard:true,
     one_time_keyboard:true
   }
    
  sendText(id,"Что вы хотите записать", keyboard);
}

function sendText(chatId,text,keyBoard){

   //keyBoard = keyBoard || 0;

  //if(keyBoard.inline_keyboard || keyBoard.keyboard){
     var data = {
      method: "post",
      payload: {
         method: "sendMessage",
         chat_id: String(chatId),
         text: text,
         parse_mode: "HTML",
        reply_markup: JSON.stringify(keyBoard)
       }
     }
//    }else{
//      var data = {
//        method: "post",
//        payload: {
//          method: "sendMessage",
//          chat_id: String(chatId),
//          text: text,
//          parse_mode: "HTML"
//        }
//      }
//    }

   UrlFetchApp.fetch('https://api.telegram.org/bot' + token + '/', data);

 }

//function test() {
//  SpreadsheetApp.openById(ssId).appendRow([new Date(),id,name,text]);
//}


//{
//    "parameter": {},
//    "contextPath": "",
//    "postData": {
//        "contents": "{\"update_id\":1100933,\n\"message\":{\"message_id\":405,\"from\":{\"id\":292403977,\"is_bot\":false,\"first_name\":\"Maxim\",\"username\":\"Jest831\",\"language_code\":\"ru\"},\"chat\":{\"id\":292403977,\"first_name\":\"Maxim\",\"username\":\"Jest831\",\"type\":\"private\"},\"date\":1597347953,\"text\":\"salam\"}}",
//        "length": 269,
//        "name": "postData",
//        "type": "application/json"
//    },
//    "queryString": "",
//    "parameters": {},
//    "contentLength": 269
//}