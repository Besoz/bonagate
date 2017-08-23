(function() {
	"use strict";

	angular
	.module("app")
	.controller("ShowPropertyController", ShowPropertyController);

	function ShowPropertyController($scope, decoratorService, GeneralDataServices, $window) {
		var vm = this;
		vm.btnTxts = ['fa fa-fw fa-star-o text-yellow-800 fa-5x' , 'fa fa-fw fa-star text-yellow-800 fa-5x'];
		
		vm.addToFavorite = function (id) {

			GeneralDataServices
			.post('/user_favorite_properties', {property_id: id})
			.then(function(res) {
				console.log(res);
				if(res.status=='ok')
					vm.property.is_favourite =true;
			}).catch(function(res) {
			})
		}
		vm.removeFromFavorite = function (id) {


			GeneralDataServices
			.delete('/user_favorite_properties/'+id)
			.then(function(res) {
				console.log(res);
				if(res.status=='ok')
					vm.property.is_favourite =false;
		
			}).catch(function(res) {
			})
		}

		vm.ToggleFavorite = function (id) {
			if (vm.property.is_favourite) vm.removeFromFavorite(id);
			else vm.addToFavorite(id);
		}
	}
})();