(function (angular) {
  var app = angular.module('app');

  app.controller('addEditCtrl', ctrl);

  ctrl.$inject = [
    '$routeParams',
    '$mdToast',
    '$location',
    'recepiesService'
  ];
  function ctrl(
    $routeParams,
    $mdToast,
    $location,
    recepiesService
  ) {
    var vm = this;

    vm.categories = [
      'seea food',
      'bakery',
      'meat',
      'drinks',
      'grocery'
    ];

    if ($routeParams.id) {
      vm.title = 'Edit your recepie';

      getRecepie($routeParams.id);
      vm.save = function() {
        recepiesService.update(vm.recepie).then(function(res) {
          $location.path('/recepies');
          showToast();
        });
      }
    } else {
      vm.title = 'Add your recepie';

      vm.save = function() {
        recepiesService.add(vm.recepie).then(function(res) {
          $location.path('/recepies');
          showToast();
        });
      }
    }

    vm.back = function() {
      $location.path('/recepies');
    }


    function getRecepie(id) {
      recepiesService.getById(id).then(function(res) {
        vm.recepie = res.data;
      })
    }

    function showToast() {
      $mdToast.show(
        $mdToast.simple()
          .textContent('Saved successfully!')
          .position('bottom center')
          .hideDelay(3000)
      );
    }
  }
})(angular);