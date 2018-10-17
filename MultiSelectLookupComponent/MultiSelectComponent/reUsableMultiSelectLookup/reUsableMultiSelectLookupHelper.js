({
    searchHelper : function(component,event,getInputkeyWord) {
        // call the apex class method 
        var action = component.get("c.fetchLookUpValues");
        // set param to method  
        action.setParams({
            'searchField' : component.get("v.SearchField"),
            'searchKeyWord': getInputkeyWord,
            'ObjectName' : component.get("v.objectAPIName"),
            'ExcludeitemsList' : component.get("v.lstSelectedRecords"),
            'filterFieldName' : component.get("v.filterFieldName"),
            'filterFieldValue' : component.get("v.filterFieldValue"),
            'otherQueryFieldName' : component.get("v.otherQueryFieldName"),
            'wildCard' : component.get("v.wildCard")
        });
        // set a callBack    
        action.setCallback(this, function(response) {
            $A.util.removeClass(component.find("mySpinner"), "slds-show");
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                // if storeResponse size is equal 0 ,display No Records Found... message on screen.                }
                if (storeResponse.length == 0) {
                    component.set("v.Message", 'No Records Found...');
                } else {
                    component.set("v.Message", '');
                    // set searchResult list with return value from server.
                }
                component.set("v.listOfSearchRecords", storeResponse); 
            }
        });
        // enqueue the Action  
        $A.enqueueAction(action);
    },
    clickSearch:function(component,event){
        var keyword = component.find("input1").get("v.value");
        var action = component.get("c.fetchValues");
        action.setParams({
            "searchField" : "Name",
            "searchKeyword" : keyword,
            "ObjectName" : component.get("v.objectAPIName"),
            'ExcludeitemsList' : component.get("v.lstSelectedRecords"),
            'filterFieldName' : component.get("v.filterFieldName"),
            'filterFieldValue' : component.get("v.filterFieldValue"),
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.sObjects", response.getReturnValue());
            }
        });
            
        $A.enqueueAction(action);
    }
})