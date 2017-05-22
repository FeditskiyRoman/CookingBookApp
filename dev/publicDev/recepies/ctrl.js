(function (angular) {
  var app = angular.module('app');

  app.controller('recepiesCtrl', ctrl);

  ctrl.$inject = [
    '$mdDialog',
    '$mdToast',
    '$location',
    'recepiesService'
  ];
  function ctrl(
    $mdDialog,
    $mdToast,
    $location,
    recepiesService
  ) {
    var vm = this;

    getRecepies();

    var confirmDeletePopup = $mdDialog.confirm({
      title: 'Are you shure?',
      textContent: 'This action can`t be undone',
      ok: 'Delete',
      cancel: 'Cancel'
    });

    vm.recepies = [];

    vm.openRecepie = function(id) {
      $location.path('/recepie/' + id);
    };

    vm.onDelete = function(id) {
      $mdDialog
        .show( confirmDeletePopup ).then(function() {
          recepiesService.delete(id).then(function() {
            getRecepies();
            $mdToast.show(
              $mdToast.simple()
                .textContent('Recepie deleted!')
                .position('bottom center')
                .hideDelay(3000)
            );
          });
        })
    };

    vm.onAdd = function() {
      $location.path('/recepie');
    };

    function getRecepies() {
      recepiesService.getAll().then(function(res) {
        vm.recepies = res.data;
      });
    }
  }
})(angular);