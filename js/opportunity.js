let requestURL = "data/funding-opps.json";
let request = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    const opportunities = request.response;  
    //condition for checking if browser is Internet Explorer
    let opportunity =  ((false || !!document.documentMode))? JSON.parse(opportunities): opportunities;
    
    let content = '';
    //Iterating over grants array to generate grant content
    for(let i = 0; i < opportunity.length; i++)
    {
        let imageElement = (opportunity[i].logo == '')? '' : '<div class = "col-xl-2 col-lg-3"><img class = "agency-logo" src = "'+ opportunity[i].logo +'" /></div>';
        content = content + '<div class = "display-flex opportunity-container search-container">'+ imageElement + 
                   '<div class = "col-xl-10 col-lg-9">'+ '<h4 class = "opp-header black-content-header-no-margin">'+ opportunity[i].title +'</h4>'+'<div class = "opp-details display-flex">'+
                   
                        '<div class = "col-sm-12 col-md-12 col-lg-6 col-xl-6">'+
                            '<i class="fas fa-flag"></i> <strong>Agency Name: </strong>' + opportunity[i].agency +
                            '<br>' +
                            '<i class="fas fa-dollar-sign"></i> <strong>Estimated Funding: </strong>' + opportunity[i].fundingLevel +
                            '<br>' +
                        '</div><div class = "col-sm-12 col-md-12 col-lg-6 col-xl-6">' +
                            '<i class="fas fa-calendar-day"></i> <strong>Due Date: </strong>' + opportunity[i].dueDate +
                            '<br></div></div></div>' +
                   '<p class = "opp-description">' + opportunity[i].description + '</p>' +
                   '<button type = "button" class = "details-button" onclick = "location.href = \'' + opportunity[i].website + '\'">View Details</button></div>';
    }
    //Appending grants to main content Element  
    let contentElement = document.createElement('div');
    contentElement.innerHTML = content.trim();
    maincontentContainer.appendChild(contentElement);
}