({
    doInit : function(component, event, helper){    
        component.set("v.fieldToDisplayValue",component.get("v.oRecord")[component.get("v.fieldToDisplay")]);
		component.set("v.otherFieldToDisplayValue",component.get("v.oRecord")[component.get("v.otherQueryFieldName")]);
    },    
    selectRecord : function(component, event, helper){      
        // get the selected record from list  
        var getSelectRecord = component.get("v.oRecord");
        //component.set("v.otherFieldToDisplayValue",component.get("v.oRecord")[component.get("v.otherQueryFieldName")]);
        // call the event   
        var compEvent = component.getEvent("oSelectedRecordEvent");
        // set the Selected sObject Record to the event attribute.  
        compEvent.setParams({"recordByEvent" : getSelectRecord });  
        // fire the event  
        compEvent.fire();
    },
})