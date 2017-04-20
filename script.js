var fs = require('fs');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

var source = fs.readFileSync(__dirname + '/source/customizations.xml', 'utf8')
var target = fs.readFileSync(__dirname + '/target/customizations.xml', 'utf8')

var sourceAttributes = [];
var targetAttributes = [];

var LoadAttributes = function(file, resultArray){
    parser.parseString(file, function(err,result){
    extractedData = result['ImportExportXml']['Entities'];
    extractedData.forEach(function(entities) {
        entities.Entity.forEach(function(entity) {
            if(entity.EntityInfo){
                if(entity.EntityInfo[0].entity){
                    var attributes = entity.EntityInfo[0].entity[0].attributes[0].attribute;
                    attributes.forEach(function(attribute) {
                    resultArray.push(attribute['$'].PhysicalName);
                    }, this);
                }
            }
        }, this);
    }, this);
    });
}

LoadAttributes(source, sourceAttributes);
LoadAttributes(target, targetAttributes);

sourceAttributes.forEach(function(attribute) {
    var match = targetAttributes.find(t => t.toUpperCase() == attribute.toUpperCase())
    if(match){
        var misMatch = targetAttributes.find(t => t == attribute)
        if(!misMatch)
        console.log(match);
    }
}, this);
