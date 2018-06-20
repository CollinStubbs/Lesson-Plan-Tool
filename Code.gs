/*
Next Steps:
- name lesson plans
- make new lesson for every line
- change folder name
- format the lesson plan better **add Date: and Lesson Name: and stuff to template, do not mess up keys
*/

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Lesson Planning Tool')
  .addItem('Create Data Template', 'createDataTemplate')
  .addItem('Add Data to Template', 'addData')
  .addItem('Create Custom Table','createCustomTemplate')
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
  
  var folder = DriveApp.createFolder('Lesson Plan Test');
  
  var template = DocumentApp.openById(docFile.makeCopy(folder).getId());
  var data = SpreadsheetApp.getActive().getSheetByName('Lesson Data').getDataRange().getDisplayValues();
 // for(var i = 1; i<data[0].length; i++){
  //if(data[i][0]=="FALSE" || data[i][1] == "TRUE")
    newPlan(data[1], template);
 // }
 // template.getBody().replaceText("##NAME##", "John Doe");

}
function newPlan(lesson, template){
  var body = template.getBody();
  body.replaceText("LESSONNUM",lesson[4]);
  body.replaceText("LESSONTITLE",lesson[5]);
  body.replaceText("UNIT",lesson[3]);
  body.replaceText("DATE",lesson[2]);  
  body.replaceText("SUCCESS",lesson[6]); 
  body.replaceText("LEARNING",lesson[7]); 
  body.replaceText("ASSESSMENT",assessment(lesson[8], lesson[9], lesson[10])); 
  body.replaceText("TRIANGULATION",triangulation(lesson[11], lesson[12], lesson[13])); 
  body.replaceText("SKILLS",skills(lesson[14],lesson[15],lesson[16],lesson[17],lesson[18],lesson[19])); 
  body.replaceText("LESSON",lesson[20]); 
  body.replaceText("ACCOMMODATIONS",lesson[21]); 
}
function assessment(asFor, as, of){
  var text = "Assessment: ";
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
  var text = "Triangulation: ";
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
  var text = "Skills: ";
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
