let requestURL = "data/summary-guidances.json";
let request = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    const summaryGuidances = request.response;  
    //condition for checking if browser is Internet Explorer
    let summaryGuidance =  ((false || !!document.documentMode))? JSON.parse(summaryGuidances): summaryGuidances;
    let agencies = [ 'National Science Foundation (NSF)',
     'National Institutes of Health (NIH)',
     'National Aeronautics and Space Administration (NASA)',
     'Department of Defense (DOD)',
     'United States Army Medical Research Acquisition Activity (USAMRAA)',
     'Air Force - Office of Scientific Research (AFOSR)', 
     'Defense Advanced Research Projects Agency (DARPA)',
     'United States Agency for International Development (USAID)', 
     'Department of Energy (DOE), Office of Science',
     'Office of Naval Research (ONR)',
     'OMB M-20-17'
    ]
    let agencyAcronym = ['NSF', 'NIH', 'NASA', 'DOD', 'AMRAA', 'AFOSR', 'DARPA', 'USAID', 'DOE', 'ONR', 'OMB'];
    let GuidanceProperties = ['Late Proposal Acceptance Guidance', 'Allowability of salaries and other project activities', 'Late SAM Registration',
'Other Program Costs', 'Trainees', 'Non Refundable Travel Charges Allowable?', 'No Cost Extensions', 'Progress & Financial Reporting',
'Pre Award & Other Expenses', 'Prior Approval', 'PPE Donations/Re-budgeting'];

    let navigationContent = '<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">';
    let mainContent = '<div class="tab-content" id="pills-tabContent">';

    for(let i = 0; i< agencies.length; i++)
    {
        let agencySummaryGuidance = summaryGuidance.filter(function(guidance){
            return guidance.agency == agencies[i];
        });
        navigationContent = appendAgencytoNavigation(agencyAcronym, agencySummaryGuidance, i, navigationContent);
        mainContent = appendContentforSummaryGuidance(GuidanceProperties, agencySummaryGuidance, i, mainContent);

    }
    mainContent = mainContent + '</div>';
    navigationContent = navigationContent + '</ul>';
    appendMainContent(maincontentContainer, navigationContent + mainContent); 
}

let appendAgencytoNavigation = function(agencyAcronym, agencySummaryGuidance, index, navigationContent){
    let buttonContent = '';
    let agencyId = "agency" + index.toString();
    if(index == 0)
    {
        buttonContent = '<a class="nav-link active" id="pills-'+ agencyId +'-tab" data-toggle="pill" href="#pills-'+ agencyId +'" role="tab" aria-controls="pills-'+ agencyId +'" aria-selected="true">'+ agencyAcronym[index] +'</a>';
    }
    else
    {
        buttonContent = '<a class="nav-link" id="pills-'+ agencyId +'-tab" data-toggle="pill" href="#pills-'+ agencyId +'" role="tab" aria-controls="pills-'+ agencyId +'" aria-selected="true">'+ agencyAcronym[index] +'</a>';
    }
    let linkElement = '<li class="nav-item">' + buttonContent + '</li>';
    navigationContent = navigationContent + linkElement;
    return navigationContent;
}

let appendContentforSummaryGuidance = function(GuidanceProperties, agencySummaryGuidance, index, mainContent){
    let divContent = '';
    let agencyId = "agency" + index.toString();
    let tableContent = generateTableContent(GuidanceProperties, agencySummaryGuidance);
    if(index > 0)
    {
        divContent = '<div class="tab-pane fade" id="pills-'+ agencyId +'" role="tabpanel" aria-labelledby="pills-'+ agencyId +'-tab">' 
        + generateFOA(agencySummaryGuidance) + generateLinkContent(agencySummaryGuidance) + tableContent  + generateComment(agencySummaryGuidance)+'</div>';
    }
    else
    {
        divContent = '<div class="tab-pane fade show active" id="pills-'+ agencyId +'" role="tabpanel" aria-labelledby="pills-'+ agencyId +'-tab">' 
        + generateFOA(agencySummaryGuidance) + generateLinkContent(agencySummaryGuidance)+ tableContent   + generateComment(agencySummaryGuidance)+'</div>';
    }
    mainContent = mainContent + divContent;
    return mainContent;
}

let generateTableContent = function(GuidanceProperties, agencySummaryGuidance, tableContent)
{
    tableContent = '<table><thead><tr><th>Information</th><th>Answer</th><th>Description</th></tr></thead><tbody>';
    let tbodyContent = '';
    for(let i = 0; i < GuidanceProperties.length; i++){
        let rowElem = '<tr><td class = "first-column-cell">' + GuidanceProperties[i] + 
        '</td><td>'+ agencySummaryGuidance[0].guidanceAnswers[i] +'</td><td>'+ agencySummaryGuidance[0].guidanceAnswerDescription[i] +'</td></tr>';
        tbodyContent = tbodyContent + rowElem;
    }
    tableContent = tableContent + tbodyContent + '</tbody></table>'+ '<br>';
    return tableContent;
}

let generateLinkContent = function(agencySummaryGuidance){
    let linkContent = '<b class = "purple-font">Links</b><ul class = "sub-list">';
    for(let i = 0; i < agencySummaryGuidance[0].guidanceLinks.length; i++)
    {
      if(null!= agencySummaryGuidance[0].guidanceLinks[i])
      {
        linkContent = linkContent + '<li><a href = "'+ agencySummaryGuidance[0].guidanceLinks[i]+'">'+
        agencySummaryGuidance[0].guidanceDocuments[i] + '</a></li>';
      }
    }
    return linkContent + '</ul>';
}

let generateComment = function(agencySummaryGuidance){
    let CommentElement = '';
    if(agencySummaryGuidance[0].guidanceComments.trim() != '')
    {
        CommentElement = '<p><b class = "purple-font">Comments</b><br>'+ agencySummaryGuidance[0].guidanceComments +'</p>';
    }
    return CommentElement;
}

let generateFOA = function(agencySummaryGuidance){
    let FOAElement = '<p><b class = "purple-font">COVID-19 FOA Site</b><br>'+ agencySummaryGuidance[0].FOASiteLink +'</p>';;
    return FOAElement;
}