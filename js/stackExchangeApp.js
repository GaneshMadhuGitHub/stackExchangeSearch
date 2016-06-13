/***
 *  stackOverFlowSearchApp  js
   author : Ganesh Madhu
   Date : 05/21
   
   angular js based stack exchange app 
   deals with the retrieval of the language questioned in the search input
   and gives all the list of questions 
   and displays the number of viewers viwed , 
   number of answers , 
   is answered for that question will display in the green color text , 
   and user can view the answer by clicking on the view answer, it will takes to the stack exchnage answers site -- 
   Note ->> view answers button will be disable for the list which has no answers based on the api
 */

var stackExchangeSearchApp = angular.module('stackExchangeSearchApp',[]);
        stackExchangeSearchApp.controller('stackExchangeSearchController', ['$scope','$http', '$templateCache', function($scope,$http, $templateCache){
            var urlDomain,postObject={},questionsUrl;
            $scope.getAllQuestionsList = function(){
                if($scope.searchSring.length >0){
                        urlDomain = "http://api.stackexchange.com/2.2/questions?";
                        postObject = {
                            "order":"desc",
                            "sort":"activity",
                            "tagged":$scope.searchSring || "javascript",
                            "site":"stackoverflow"
                        };
                        serialize = function(obj) {
                              var str = [];
                              for(var key in obj)
                                if (obj.hasOwnProperty(key)) {
                                  str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
                                }
                              return str.join("&");
                        };
                        questionsUrl = urlDomain+ serialize(postObject);
                        $http({method:"GET", url: questionsUrl, cache: $templateCache}).
                             success(function(data, status) {
                                console.log(data);
                                $scope.questionsResults = data.items;
                            }).
                             error(function(data, status) {
                                //not yet displaying any where the service failure
                                $scope.questionsResults = "try again after some time";
                                console.log("System failure:"+ $scope.questionsResults);
                                $scope.fetchingStatus = status;
                        });
                }
            };
            $scope.viewAnswersPage = function(selectedQuestion){
                window.open(selectedQuestion.link, '_blank');
            };
}]);
