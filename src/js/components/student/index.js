var app = angular.module('app')
    .component('student', {
        templateUrl: './src/js/components/student/index.html',
        controller: function ($state, $element, getRecordService, getIndividualRecordService, getIndividualRecordFactory) {
            console.log($element.find('div')[2].childNodes)
            var $this = this;
            $this.studcheck = [];
            $this.i = 0;
            getRecordService.getStudentRecord().then(function (res) {
                $this.records = res.data;
            });
            $this.perform = function () {
                $this.perRecord = $this.records;
                if ($this.action == "1") {
                    for (var i = 0; i < $this.studcheck.length; i++) {
                        
                        for (var j = 0; j < $this.perRecord.length; j++) {

                            console.log($this.studcheck)
                            console.log(i)
                            var ele = document.getElementById('panel-color' + $this.studcheck[i].id);
                            ele.classList.remove("panel-danger")
                            ele.classList.remove("panel-success")
                            if ($this.perRecord[j] == $this.studcheck[i]) {
                                $this.perRecord.splice(j, 1);
                            }
                        }
                    }
                }
                else if ($this.action == "2") {
                    for (var i = 0; i < $this.studcheck.length; i++) {
                        for (var j = 0; j < $this.perRecord.length; j++) {
                            if ($this.perRecord[j] == $this.studcheck[i]) {
                                var ele = document.getElementById('panel-color' + $this.studcheck[i].id);
                                ele.classList.remove("panel-danger")
                                ele.classList.add("panel-success")
                                break;
                            }
                        }
                    }
                }
                else if ($this.action == "3") {
                    for (var i = 0; i < $this.studcheck.length; i++) {
                        for (var j = 0; j < $this.perRecord.length; j++) {
                            if ($this.perRecord[j] == $this.studcheck[i]) {
                                console.log("in")
                                var ele = document.getElementById('panel-color' + $this.studcheck[i].id);
                                ele.classList.remove("panel-success")
                                ele.classList.add("panel-danger")
                                break;
                            }
                        }
                    }
                }
                $this.studcheck = [];
                console.log($this.studcheck)
            }
            $this.toggleSelection = function (id) {
                var idx = $this.studcheck.indexOf(id);
                if (idx > -1) {
                    $this.studcheck.splice(idx, 1);
                }
                else {
                    $this.studcheck.push(id);
                    
                }
            }
            $this.openForm = function (item) {
                $this.fullname = item.fullname;
                $this.id = parseInt(item.id);
                $this.email = item.email;
                $this.marks = parseInt(item.marks);
                $this.result = item.result;
            }
            $this.getDetailsService = function (fullname, index) {
                getIndividualRecordService.getRecord($this, fullname, index);
            }
            $this.getDetailsFactory = function (fullname, index) {
                getIndividualRecordFactory.getRecord($this, fullname, index);
                $this.records[index] = $this.singleRecord;
            }
            $this.edit = function (index) {
                $this.records[index] = {
                    fullname: $this.fullname,
                    id: $this.id,
                    email: $this.email,
                    marks: $this.marks,
                    result: $this.result
                }
            }
            $this.delete = function (index) {
                $this.records.splice(index - 1, 1);
            }

        }
    })

    .service('getRecordService', ['$http', function ($http) {
        this.getStudentRecord = function () {
            return $http.get('src/data/studentName.json');
        }
    }])

    .service('getIndividualRecordService', ['$http', function ($http) {
        this.getRecord = function ($this, fullname, index) {
            $http.get('src/data/studentDetails.json').then(function (res) {
                res.data.map(function (item) {
                    if (item.fullname === fullname) {
                        $this.records[index] = res.data[item.id - 1];
                    }
                })
                $this.records[index].method = "Service";
            });
        }
    }])

    .factory('getIndividualRecordFactory', ['$http', function ($http) {
        return {
            getRecord: function ($this, fullname, index) {
                $http.get('src/data/studentDetails.json').then(function (res) {
                    res.data.map(function (item) {
                        if (item.fullname === fullname) {
                            $this.records[index] = res.data[item.id - 1];
                        }
                    })
                    $this.records[index].method = "Factory";
                });
            }
        }
    }])

// .directive('ngMydirective', function () {
//     return {
//         replace: true,
//         controller: function ($scope) {

//         },
//         link: function (scope, element, attrs) {
//             console.log(scope.gradeclass)
//             attrs.$observe('ngMydirective', function (value) {
//                 console.log(value)
//                 if (value == "P") {
//                     element.addClass('panel-success')

//                 }
//                 if (value == "F") {
//                     element.addClass('panel-danger')
//                 }
//             });
//         }
//     };
// });

app.directive('ngMydirective2', function () {
    return {
        replace: true,
        template: '<input class="form-control" ng-model = "gradeclass" placeholder="Enter Grade">',
        link: function (scope, element, attrs) {
            scope.$watch('gradeclass', function (newvalue, oldvalue) {
                if (newvalue == "P") {
                    var p = element.parent();
                    var allParents = [];
                    while (p.length > 0) {
                        allParents.push(p[0]);
                        if (typeof p[0].className != undefined && p[0].className.includes("panel-color")) {
                            scope.ele = p[0];
                            break;
                        }
                        p = p.parent();
                    }
                    scope.ele.className = 'panel panel-success panel-color';
                }
                else if (newvalue == "F") {
                    var p = element.parent();
                    var allParents = [];
                    while (p.length > 0) {
                        console.log(p[0])
                        if (typeof p[0].className != undefined && p[0].className.includes("panel-color")) {
                            scope.ele = p[0];
                            break;
                        }
                        p = p.parent();
                    }
                    scope.ele.className = 'panel panel-danger panel-color';
                }
            });
        }
    };
});
