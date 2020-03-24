let requestURL = "data/questions.json";
let request = new XMLHttpRequest();
let maincontentContainer = document.getElementsByClassName('main-content')[0];
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function(){
const questions = request.response;  
//console.log(courses);
    
if(false || !!document.documentMode)
{
       
}

        else
        {   
            let content = '';
            //Department-counter for unique id generation
            let questionCounter = 1;
            //finding list of distinct departments
            let distinctQuestionTypes = getDistinctAttributes(questions, "questionType");

            //Iterating over list of departments
            distinctQuestionTypes.forEach(function(questionType){

                let categoryQuestions = questions.filter(function(question){ 	
                    return question.questionType == questionType;
                });
                //getting list of distint degrees within department
                let uniqueQuestions = getDistinctAttributes(categoryQuestions, "question");
                let accordionContent = generateSubAccordionContent(uniqueQuestions, "question", categoryQuestions, generateQuestionContent);
                
                //generating Id for bootstrap accordion
                let questId = "collapse" + questionCounter;
                let headingId = "heading" + questionCounter;
                let accordionElem =  generateAccordionElem(questId, headingId, questionType, accordionContent);
                content = content + accordionElem;
                questionCounter++;
            });
            //Appending content to DOM
            appendMainContent(maincontentContainer, content);
        }
    }

    let generateQuestionContent = function(question){
        let questionContent =  '<div class = "FAQ-container"><p class = "answer">'+  question.answer + '</p></div>'; 
        return questionContent;
    }