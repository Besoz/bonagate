(function() {
	"use strict";

	angular
	.module("app")
	.controller("ShowPropertyController", ShowPropertyController);

	function ShowPropertyController($scope, decoratorService, GeneralDataServices, $window) {
		var vm = this;
		vm.isLiked =false;
		vm.btnTxts = ['Add to Favorites' , 'Remove from Favorites'];


		$scope.$watch('ShwPropCtrl.isLiked', function () {
			vm.isLiked = $scope.ShwPropCtrl.isLiked;
			if(vm.isLiked) $scope.btnTxt  = vm.btnTxts[1];
			else  $scope.btnTxt  = vm.btnTxts[0];
		});
		
		vm.addToFavorite = function (id) {

			GeneralDataServices
			.post('/user_favorite_properties', {property_id: id})
			.then(function(res) {
				console.log(res);
				if(res.status=='ok')
					vm.isLiked = true;
				$scope.btnTxt  = vm.btnTxts[1];			

			}).catch(function(res) {
			})
		}
		vm.removeFromFavorite = function (id) {


			GeneralDataServices
			.delete('/user_favorite_properties/'+id)
			.then(function(res) {
				console.log(res);
				if(res.status=='ok')
					vm.isLiked = false;
				$scope.btnTxt  = vm.btnTxts[0];			
			}).catch(function(res) {
			})
		}

		vm.ToggleFavorite = function (id) {
			if (vm.isLiked) vm.removeFromFavorite(id);
			else vm.addToFavorite(id);
		}
	}
})();