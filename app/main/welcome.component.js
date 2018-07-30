/**
 * The controller for the `welcome' component
 */
class WelcomeController {
    constructor(AppConfig, $state, $http, $log) {
        this.articles = [];
        var vm = this;

        $http({
            method: 'GET',
            url: 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=2662abc474754fffbcea7d2f4ab1552e'
        }).then(function successCallback(response) {
            angular.copy(response.data.articles, vm.articles);
        }, function errorCallback(response) {
            $log.warn(response);
        });


        // Log messages
        $log.debug("Some debug");
        $log.info("Some info");
        $log.log("Some log");
        $log.warn("Some warning");
        $log.error("Some error");
    }
}
WelcomeController.$inject = ['AppConfig', '$state', '$http', '$log'];

export const welcome = {
  bindings: { returnTo: '<' },

  controller: WelcomeController,

  template: `
  <div layout="row" layout-padding class="pb-50">
    <div flex="10" flex-xs="5" flex-lg="20"></div>
  
    <md-card flex="80" flex-xs="90" flex-lg="60">
    
      <md-card-title>
        <md-card-title-text>
          <span class="md-headline">Bienvenido</span>
        </md-card-title-text>
      </md-card-title>
      
      <md-divider></md-divider>
      
      <md-card-content>
      
        <h3>Páginas disponibles</h3>
      
        <div layout="row" class="pb-10">
          <div flex></div>
          <md-button ui-sref="login" class="md-raised md-primary">Login</md-button>
          <md-button ui-sref="signup" class="md-raised md-primary">Signup</md-button>
          <div flex></div>
        </div>
        
        <md-divider></md-divider>
      
        <h3>Artículos ({{$ctrl.articles.length}})</h3>
        
        <ul>
          <li ng-repeat="item in $ctrl.articles">
            {{item.title}} 
            <a ng-href="{{item.url}}" target="_blank"><md-icon class="fa fa-link md-primary"></md-icon></a>
          </li>
        </ul>
        
      </md-card-content>
    </md-card>
    
    <div flex="10" flex-xs="5" flex-lg="20"></div>
  </div>
  `
};
