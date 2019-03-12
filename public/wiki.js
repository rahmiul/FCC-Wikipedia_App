var app = angular.module('wikiApp', []);

app.controller('myCtrl', function ($scope, $http) {

    $('.door').on('click', function () {
        $('form').toggleClass('open');
        if (!$('form').hasClass('open') && $scope.searchTxt !== '') {
            $('#search').toggleClass('fullheight');
            $('.help').toggleClass('hide');
            $scope.searchTxt = '';
        }
        $scope.results = [];
        $scope.$apply();
    });

    $scope.search = function () {
        var inputTxt = $scope.searchTxt;
        $('p').addClass('hide');
        $('#search').toggleClass('fullheight');
        $scope.results = [];
        var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
        var cb = '&callback=JSON_CALLBACK';
        var page = 'https://en.wikipedia.org/?curid=';
        $http.jsonp(api + inputTxt + cb)
            .success(function (data) {
                var results = data.query.pages;
                angular.forEach(results, function (value, key) {
                    $scope.results.push({
                        title: value.title,
                        content: value.extract,
                        pageId: page + value.pageid
                    });
                });
            })
    };




});