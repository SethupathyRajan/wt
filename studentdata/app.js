var app = angular.module('marksApp', []);

// Service to provide initial student data
app.service('StudentService', function() {
  this.getStudents = function() {
    return [];
  };
});

// Filter to calculate grade
app.filter('grade', function() {
  return function(marks) {
    if (marks >= 85) return 'Distinction';
    else if (marks >= 50) return 'Pass';
    else return 'Fail';
  };
});


app.controller('MarksController', ['StudentService', function(StudentService) {
  var self = this;
  self.students = StudentService.getStudents();

  self.newStudentName = '';
  self.newStudentMarks = '';


  self.addStudent = function() {
    if (!self.newStudentName || self.newStudentMarks === '') {
      alert('Enter both name and marks!');
      return;
    }
    self.students.push({
      name: self.newStudentName,
      marks: parseInt(self.newStudentMarks)
    });
    
    self.newStudentName = '';
    self.newStudentMarks = '';
  };
}]);

app.directive('studentRow', function() {
  return {
    restrict: 'A',
    scope: { student: '=' },
    replace: true,
    template: `
      <tr>
        <td>{{student.name}}</td>
        <td>{{student.marks}}</td>
        <td ng-class="{
              'distinction': student.marks >= 85,
              'pass': student.marks >= 50 && student.marks < 85,
              'fail': student.marks < 50
            }">{{student.marks | grade}}</td>
      </tr>
    `
  };
});
