/*
Next Steps:
- name lesson plans DONE
- make new lesson for every line DONE
- change folder name DONE
- format the lesson plan better **add Date: and Lesson Name: and stuff to template, do not mess up keys
*/

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Lesson Planning Tool')
  .addItem('Create Data Template', 'createDataTemplate')
  .addItem('Add Data to Template', 'addData')
  //.addItem('Create Custom Table','createCustomTemplate')
  .addToUi();
}

function createDataTemplate(){
  
  var ss = SpreadsheetApp.getActive();
  var template = SpreadsheetApp.openById('1I8A1Gne1_md0Wiz144ZbEh6WhlTubeK691JJoEkUxLk').getSheets();
  for(var i = 0; i<template.length; i++){
    var name = template[i].getName();
    ss.setActiveSheet(template[i].copyTo(ss));
    ss.renameActiveSheet(name);
  }
  
}

function addData(){
  
  var id = '1Xy9zobHc8o9yAHSIRYHvrY7KjRDo88__wHfbMuCe06I';
  var docFile = DriveApp.getFileById(id);
  
  var folder = DriveApp.getFoldersByName('Lesson Plan Tool');
  if(folder.hasNext() == false){
    folder = DriveApp.createFolder('Lesson Plan Tool');
  }
  else{
    folder = folder.next(); 
  }
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName('Lesson Data');
  var sheetdata = sheet.getDataRange();
  var data = sheetdata.getDisplayValues();
  for(var i = 1; i<data[0].length; i++){
    if(data[i][5] != ""){
      if(data[i][0]=="FALSE" || data[i][1] == "TRUE"){
        var template = DocumentApp.openById(docFile.makeCopy(folder).getId());
        newPlan(data[1], template, data[i][1]);
        sheet.getRange(i+1, 1).setValue("TRUE");
        sheet.getRange(i+1, 2).setValue("FALSE");
      }
    }
    else{
      break; 
    }
  }
  
}

function newPlan(lesson, template, update){
  
  var body = template.getBody();
  body.replaceText("CCCC",lesson[4]);
  body.replaceText("DDDD",lesson[5]);
  body.replaceText("BBBB",lesson[3]);
  body.replaceText("AAAA",lesson[2]);  
  body.replaceText("EEEE",lesson[6]); 
  body.replaceText("FFFF",lesson[7]);
  body.replaceText("LLLL",lesson[8]);
  body.replaceText("GGGG",assessment(lesson[9], lesson[10], lesson[11])); 
  body.replaceText("HHHH",triangulation(lesson[12], lesson[13], lesson[14])); 
  body.replaceText("IIII",skills(lesson[15],lesson[16],lesson[17],lesson[18],lesson[19],lesson[20])); 
  body.replaceText("JJJJ",lesson[21]); 
  body.replaceText("KKKK",lesson[22]); 
  
  if(update == "TRUE"){
    template.setName(lesson[5] + " - " + lesson[2] + " UPDATE "+(new Date()).toDateString());
  }else{
    template.setName(lesson[5] + " - " + lesson[2]);
  }
}
function assessment(asFor, as, of){
  var text = "";
  var comma = false;
  if(asFor=="TRUE"){
    text = text+"For";
    comma = true;
  }
  if(as=="TRUE"){
    if(comma){
      text = text+", As"; 
    }
    else{
      text = text+"As"; 
      comma = true;
    }
  }
  if(of=="TRUE"){
    if(comma){
      text = text+", Of"; 
    }
    else{
      text = text+"Of"; 
      comma = true;
    }
  }
  
  return text;
}
function triangulation(asFor, as, of){
  var text = "";
  var comma = false;
  if(asFor=="TRUE"){
    text = text+"Conversation";
    comma = true;
  }
  if(as=="TRUE"){
    if(comma){
      text = text+", Observation"; 
    }
    else{
      text = text+"Observation"; 
      comma = true;
    }
  }
  if(of=="TRUE"){
    if(comma){
      text = text+", Product"; 
    }
    else{
      text = text+"Product"; 
      comma = true;
    }
  }
  
  return text;
}
function skills(asFor, as, of, col, com, cit){
  var text = "";
  var comma = false;
  if(asFor=="TRUE"){
    text = text+"Critical Thinking";
    comma = true;
  }
  if(as=="TRUE"){
    if(comma){
      text = text+", Innovation and Creativity"; 
    }
    else{
      text = text+"Innovation and Creativity"; 
      comma = true;
    }
  }
  if(of=="TRUE"){
    if(comma){
      text = text+", Self-Directed Learning"; 
    }
    else{
      text = text+"Self-Directed Learning"; 
      comma = true;
    }
  }
  if(col=="TRUE"){
    if(comma){
      text = text+", Collaboration"; 
    }
    else{
      text = text+"Collaboration"; 
      comma = true;
    }
  }
  if(com=="TRUE"){
    if(comma){
      text = text+", Communication"; 
    }
    else{
      text = text+"Communication"; 
      comma = true;
    }
  }
  if(cit=="TRUE"){
    if(comma){
      text = text+", Citizenship"; 
    }
    else{
      text = text+"Citizenship"; 
      comma = true;
    }
  }
  
  return text;
}
function createCustomTemplate(){
  var ss = SpreadsheetApp.getActive();
  var sheet = ss.getSheetByName("Customize Table");
  var tableRange = findTableRange(sheet.getRange("A1:Z1").getDisplayValues());
  
  var sheetTable = sheet.getRange(tableRange);
  var merges = sheetTable.getMergedRanges();
  
  var doc = DocumentApp.create("Custom Table c");
  var docTable = doc.getBody().appendTable(sheetTable.getDisplayValues());
  
  for(var i = 0; i<merges.length; i++){
    console.log(merges[i].getA1Notation());
    //mergeCells(docTable, merges[i]);
  }
  //only way to do this is to create tables inside tables start with one table of the proper height but only one column, add additional tables in the rows
  //or create a seperate table for each row
  
}



function findTableRange(row){
  for(var i = 0; i< row[0].length; i++){
    if(row[0][i].indexOf("Table Range") > -1){
      return row[0][i+1]; 
    }
  }
}


/*
switch(iterator){
case 0:
set date value
case 1:
set name value
etc.

}

*/
