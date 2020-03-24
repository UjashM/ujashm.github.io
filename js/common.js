let getDistinctAttributes = function(objects, attribute){
    let mappedAttributes = objects.map(function(object){
        return object[attribute];
    });
    let distinctAttributes = mappedAttributes.filter(function(v, i, a){
        return a.indexOf(v) === i;
     });

    distinctAttributes.sort();
    return distinctAttributes;
}

let customSort = function(sortOrder, objects){
       return objects.sort(function(a,b){
            sortOrder.indexOf(a) < sortOrder.indexOf(b) ? 1 : -1;
        })
}

let generateSubAccordionContent = function(attributes, filterAttribute, objects, generateObjectContent){
    let accordionContent = '';

    attributes.forEach(function(attribute){
        //filtering objects based on each subaccordion grouping
        sub_objects = objects.filter(function(object){ 	
            return object[filterAttribute] == attribute;
        });

        let objectContent = '';
        sub_objects.forEach(function(object){
            objectContent = objectContent + generateObjectContent(object);
        });

        accordionContent += '<div class = "accordion-container"><div class = "accordion-header"><p class = "paragraph-question">'+ attribute + '</p></div><div class = "accordion-content">'+ objectContent +'</div></div>';
    });
    return accordionContent;
}

let generateAccordionElem = function(divId, bootlabelId, accordionHeader, accordionContent){
    let accordionElem =  '<div class = "card"><div class="card-header" id="'+ bootlabelId + '">' +
                          '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#'+ divId + '" aria-expanded="true" aria-controls="' + divId + '">'+
                            '<h2 class = "content-header-no-margin">' + accordionHeader + '</h2></button></div>'
                        + '<div id="'+ divId + '" class = "collapse" aria-labelledby= "'+ bootlabelId + '"> <div class = "card-body">'
                        + accordionContent +'</div></div></div>';  
    return accordionElem;
}

let appendMainContent = function(maincontentContainer, content){
    let mainContentElement = document.createElement('div');
    mainContentElement.classList.add('accordion');
    mainContentElement.id = 'accordionExample';
    mainContentElement.innerHTML = content.trim();
    maincontentContainer.appendChild(mainContentElement);
}