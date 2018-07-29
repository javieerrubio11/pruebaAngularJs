/**
 * The controller for the `login` component
 *
 * The `login` method validates the credentials.
 * Then it sends the user back to the `returnTo` state, which is provided as a resolve data.
 */
class LoginController {
  constructor(AppConfig, AuthService, $state, $mdDialog) {
    this.usernames = AuthService.usernames;

    this.credentials = {
        username: AppConfig.emailAddress,
        password: 'password'
    };

    this.user = {
        email: '',
        password: ''
    }

    this.typePass = 'password';

    this.login = (credentials) => {
        this.authenticating = true;

        const returnToOriginalState = () => {
            let state = this.returnTo.state();
            let params = this.returnTo.params();
            let options = Object.assign({}, this.returnTo.options(), { reload: true });
            $state.go(state, params, options);
        };

        const showError = (errorMessage) =>
        this.errorMessage = errorMessage;

        AuthService.authenticate(credentials.username, credentials.password)
            .then(returnToOriginalState)
            .catch(showError)
            .finally(() => this.authenticating = false);
    }

    this.showDialog = function(ev) {

      this.dialog = $mdDialog.show({
        controller: function DialogController($scope, $mdDialog) {
          $scope.codigo = null;

          $scope.closeDialog = function() {
            $mdDialog.hide();
          }
        },
        template: `
          <md-dialog>
            
            <md-card style="margin: 0px;">
              <md-card-title class="pl-80 pr-80">
                <md-card-title-text>
                  <div>
                    <span class="md-headline"><b>Verificación de dos pasos</b></span>
                    <span flex></span>
                    <md-button class="md-icon-button md-primary" ng-click="closeDialog()">
                      <md-icon class="fa fa-times"></md-icon>
                    </md-button>
                  </div>
                </md-card-title-text>
              </md-card-title>
              
              <md-divider></md-divider>
              
              <md-card-content class="pl-80 pr-80">
                  
                <p>Introduce el código de verificación generado<br> por  su teléfono que termina en +XX XX XXX <br>XX86.</p>
                  
                <md-input-container class="md-block">
                  <label>Código</label>
                  <input ng-model="codigo">
                </md-input-container>
                  
              </md-card-content>
              
              <md-divider></md-divider>
              
              <md-card-action class="pl-80 pr-80">
                <div class="pb-20"></div>
                <md-button ng-disabled="codigo == null || codigo == ''" flex class="md-primary md-raised btn-login">
                 Verificar
                </md-button>
                <div class="pt-20"></div>
              </md-card-action>
            </md-card>
          </md-dialog>
        `,
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
      })
      .then(function(answer) {
          // console.log('okey');
      }, function() {
          // console.log('close');
      });
    };
  }
}
LoginController.$inject = ['AppConfig', 'AuthService', '$state', '$mdDialog'];

/**
 * This component renders a faux authentication UI
 *
 * It prompts for the username/password (and gives hints with bouncy arrows)
 * It shows errors if the authentication failed for any reason.
 */
export const login = {
    bindings: { returnTo: '<' },

    controller: LoginController,

    template:  `

    <div layout="row" layout-padding class="pb-50">
      <div flex="10" flex-xs="5" flex-lg="20"></div>
    
      <md-card flex="80" flex-xs="90" flex-lg="60">
      
        <md-card-title>
          <md-card-title-text>
            <span class="md-headline">Log in</span>
          </md-card-title-text>
        </md-card-title>
        
        <md-divider></md-divider>
        
        <md-card-content>
        
          <div layout="row" layout-wrap>
          
            <div flex="50" flex-xs="100">
              <img class="login-img" src="/assets/images/login.png" alt="Login"/>
              <p>
                Bienvenid@ al universo Blockchain.
                <br>
                Bienvenid@ a Bit2Me.
              </p>
            </div>
          
            <div flex="50" flex-xs="100">
              <p class="pb-20">Introduce tu correo electrónico y contraseña para continuar.</p>
              <md-input-container class="md-block">
                <label>Email</label>
                <input ng-model="user.email">
              </md-input-container>
              
              <md-input-container class="md-block">
                <label>Contraseña</label>
                <input type="{{$ctrl.typePass}}" ng-model="user.password">
                <md-icon ng-click="$ctrl.typePass = 'text'" ng-if="$ctrl.typePass == 'password'" class="fa fa-eye"></md-icon>
                <md-icon ng-click="$ctrl.typePass = 'password'" ng-if="$ctrl.typePass == 'text'" class="fa fa-eye-slash"></md-icon>
              </md-input-container>
              
              <div layout="row">
                <div flex></div>
                <a href="#">Recordar contraseña</a>
              </div>
              
              <div class="pt-30"></div>
              
              <md-button flex class="md-primary md-raised btn-login"
               ng-disabled="user.email == null || user.password == null"
               ng-click="$ctrl.showDialog($event)">
               Login
              </md-button>
                        
              <div layout="row">
                <div flex></div>    
                <p class="pt-30"><b>¿Todavía no tienes cuenta en Bit2Me?</b></p>
                <div flex></div>
              </div>
              
              <md-button flex class="md-primary btn-registrate" ui-sref="signup"><b>Registrate</b></md-button>
            </div>
          
          </div>
        </md-card-content>
      </md-card>
      
      <div flex="10" flex-xs="5" flex-lg="20"></div>
    </div>
    `
};
