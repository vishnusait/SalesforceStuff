({
    onblur : function(component,event,helper){
        // on mouse leave clear the listOfSeachRecords & hide the search result component 
        if(!component.get('v.mouseOverComp')){
            component.set("v.listOfSearchRecords", null );
            var forclose = component.find("searchRes");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');    
        }
    },
    onfocus : function(component,event,helper){
        // show the spinner,show child search result component and call helper function
        $A.util.addClass(component.find("mySpinner"), "slds-show");
        component.set("v.listOfSearchRecords", null ); 
        var forOpen = component.find("searchRes");
        $A.util.addClass(forOpen, 'slds-is-open');
        $A.util.removeClass(forOpen, 'slds-is-close');
        // Get Default 5 Records order by createdDate DESC 
        var getInputkeyWord = '';
        helper.searchHelper(component,event,getInputkeyWord);
    },
    
    onmouseleave : function(component,event,helper){    
        component.set('v.mouseOverComp',false);
    },
    onmouseenter : function(component,event,helper){    
        component.set('v.mouseOverComp',true);
    },

    keyPressController : function(component, event, helper) {
        $A.util.addClass(component.find("mySpinner"), "slds-show");
        // get the search Input keyword   
        var getInputkeyWord = component.get("v.SearchKeyWord");
        // check if getInputKeyWord size id more then 0 then open the lookup result List and 
        // call the helper 
        // else close the lookup result List part.   
        if(getInputkeyWord.length > 0){
            var forOpen = component.find("searchRes");
            $A.util.addClass(forOpen, 'slds-is-open');
            $A.util.removeClass(forOpen, 'slds-is-close');
            helper.searchHelper(component,event,getInputkeyWord);
        }
        else{  
            component.set("v.listOfSearchRecords", null ); 
            var forclose = component.find("searchRes");
            $A.util.addClass(forclose, 'slds-is-close');
            $A.util.removeClass(forclose, 'slds-is-open');
        }
    },
    keyCheck : function(component, event, helper){
        var getInputkeyWord = component.get("v.SearchKeyWord");
        if (event.which == 13 && getInputkeyWord.length > 0){
            component.set("v.isOpen", true);
            component.set("v.sObjects", null);
            helper.clickSearch(component, event, helper);
        }

    },
    
    // function for clear the Record Selaction 
    clear :function(component,event,helper){
        var selectedPillId = event.getSource().get("v.name");
        var AllPillsList = component.get("v.lstSelectedRecords"); 
        //debugger;
        var evt = component.getEvent("removeRecordEvent");
        evt.setParams({"recordId" : selectedPillId });  
        // fire the event  
        evt.fire();
        
        for(var i = 0; i < AllPillsList.length; i++){
            if(AllPillsList[i].Id == selectedPillId){
                AllPillsList.splice(i, 1);
                component.set("v.lstSelectedRecords", AllPillsList);
            }  
        }
        component.set("v.SearchKeyWord",null);
        component.set("v.listOfSearchRecords", null );  
        
    },
    
    // This function call when the end User Select any record from the result list.   flstSelectedRecords
    handleComponentEvent : function(component, event, helper) {
        component.set("v.SearchKeyWord",null);
        // get the selected object record from the COMPONENT event 	 
        var listSelectedItems =  component.get("v.lstSelectedRecords") == null ? [] : component.get("v.lstSelectedRecords");
        var selectedAccountGetFromEvent = event.getParam("recordByEvent");
        listSelectedItems.push(selectedAccountGetFromEvent);
        component.set("v.lstSelectedRecords" , listSelectedItems); 
        
        var forclose = component.find("lookup-pill");
        $A.util.addClass(forclose, 'slds-show');
        $A.util.removeClass(forclose, 'slds-hide');
        
        var forclose = component.find("searchRes");
        $A.util.addClass(forclose, 'slds-is-close');
        $A.util.removeClass(forclose, 'slds-is-open'); 
        console.log('---'+listSelectedItems);
    },

    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        component.set("v.isOpen", false);
    },

    select: function(component, event, helper) {
        component.set("v.isOpen", false);
        debugger;
        var listSelectedItems =  component.get("v.lstSelectedRecords") == null ? [] : component.get("v.lstSelectedRecords");
        var listSelected = listSelectedItems.concat(component.get("v.auxList"));
        component.set("v.lstSelectedRecords",listSelected);
    },

    clickSearch: function(component, event, helper){
       helper.clickSearch(component,event);
    },
    onCheck: function(component, event, helper){
        var checkCmp = component.find("checkbox");
        var sObj = component.get("v.sObjects");
        var selectedtLists = [];
        for(var i=0;i<checkCmp.length;i++){
            if(checkCmp[i].get("v.value") == true){
                selectedtLists.push(sObj[i]);
            }
        }
        //resultCmp.set("v.value", ""+checkCmp.get("v.value"));
        component.set("v.auxList",selectedtLists);
    }
})