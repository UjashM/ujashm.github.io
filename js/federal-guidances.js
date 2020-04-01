let requestURL = "data/federal-guidances.json";
let request = new XMLHttpRequest();
//getting content Element to append grants information
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
    const federalGuidances = request.response;  
    //condition for checking if browser is Internet Explorer
    let federalGuidance =  ((false || !!document.documentMode))? JSON.parse(federalGuidances): federalGuidances;
    let content = '';
    let sponsorCounter = 1;

    let distinctSponsors =  getDistinctAttributes(federalGuidance, "majorSponsor");

    distinctSponsors.forEach(function(majorSponsor){
        let sponsorGuidance = federalGuidance.filter(function(guidance){ 	
            return guidance.majorSponsor == majorSponsor;
        });
        
        let accordionContent = (sponsorGuidance[0].majorSponsor != sponsorGuidance[0].sponsor)?
        generateSubAccordionContent(getDistinctAttributes(sponsorGuidance, "sponsor"), "sponsor", sponsorGuidance, generateGuidanceContent):
        generateGuidanceAccordionContent(sponsorGuidance);

        let sponsorId = "collapse" + sponsorCounter;
        let headingId = "heading" + sponsorCounter;
        let accordionElem =  generateAccordionElem(sponsorId, headingId, majorSponsor, accordionContent);
        content = content + accordionElem;
        sponsorCounter++;
    })
    appendMainContent(maincontentContainer, content);
    //Appending grants to main content Element  
}

let generateGuidanceAccordionContent = function(guidances){
    let content = '<div><ul class = "sub-list">';
    for(let i = 0; i < guidances.length; i++)
    {
        content = content + '<li><a href = "'+ guidances[i].link +'">' + guidances[i].document + '</a></li>' ;
    }
    content = content + '</ul></div>';
    return content;
}

let generateGuidanceContent = function(guidance){
    let content = '<li><a href = "'+ guidance.link +'">' + guidance.document + '</a></li>' ;
    return content;
}