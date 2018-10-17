public class reUsableMultiSelectLookupCtrl {
    @AuraEnabled
    public static List < sObject > fetchLookUpValues(String searchField, String searchKeyWord, String ObjectName, List<sObject> ExcludeitemsList,String filterFieldName, String filterFieldValue, String otherQueryFieldName, String wildCard) {
        String searchKey = '%' + searchKeyWord + '%';
        List < sObject > returnList = new List < sObject > ();
        String filter = '';
        String sQuery = '';
        List<string> lstExcludeitems = new List<string>();
        for(sObject item : ExcludeitemsList ){
            lstExcludeitems.add(item.id);
        }
        
        // Create a Dynamic SOQL Query For Fetch Record List with LIMIT 5 and exclude already selected records  
        if(!String.isEmpty(filterFieldName)) {
            filter = filterFieldName +' = \''+filterFieldValue+'\' AND ';
        }
        if (String.isEmpty(wildCard)) {
            sQuery =  'select id, Name'+(String.isNotEmpty(otherQueryFieldName)?','+otherQueryFieldName:'')+' from ' +ObjectName + ' where '+filter+searchField+' LIKE: searchKey AND Id NOT IN : lstExcludeitems order by createdDate DESC limit 5';
        } else {
            sQuery =  'select id, Name'+(String.isNotEmpty(otherQueryFieldName)?','+otherQueryFieldName:'')+' from ' +ObjectName + ' where '+filter+' ('+wildCard+' LIKE: searchKey  OR '+searchField+' LIKE: searchKey) AND Id NOT IN : lstExcludeitems order by '+wildCard+' DESC NULLS LAST limit 5';
        }

        System.debug('query :'+sQuery);
        List < sObject > lstOfRecords = Database.query(sQuery);
        
        for (sObject obj: lstOfRecords) {
            returnList.add(obj);
        }
        return returnList;
    }

    @AuraEnabled
    public static List < sObject > fetchValues(String searchField, String searchKeyword, String ObjectName, List<sObject> ExcludeitemsList, String filterFieldName, String filterFieldValue) {
        System.debug('searchKeyword: '+searchKeyword);
        String searchKey = '%' + searchKeyword + '%';
        List < sObject > returnList = new List < sObject > ();
        String filter = '';
        String sQuery = '';
        List<string> lstExcludeitems = new List<string>();
        for(sObject item : ExcludeitemsList ){
            lstExcludeitems.add(item.id);
        }
        
        // Create a Dynamic SOQL Query For Fetch Record List with LIMIT 5 and exclude already selected records  
        
        
        sQuery =  'select id, Name from ' +ObjectName + ' where '+searchField+' LIKE: searchKey AND Id NOT IN : lstExcludeitems Limit 100';
        System.debug('query :'+sQuery);
        List < sObject > lstOfRecords = Database.query(sQuery);
        
        for (sObject obj: lstOfRecords) {
            returnList.add(obj);
        }
        System.debug('return list :'+returnList);
        return returnList;
    }
}