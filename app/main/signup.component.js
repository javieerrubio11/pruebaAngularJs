/**
 * The controller for the `signup` component
 *
 * The `signup` method create new user.
 * Then it sends the user back to the `returnTo` state, which is provided as a resolve data.
 */
class SignupController {
    constructor(AppConfig, AuthService, $state) {
        this.user = {
            email: '',
            password: '',
            terms: false
        }

        this.typePass = 'password';

        this.signup = (credentials) => {
            console.log('signup user', user);
        }
    }
}
SignupController.$inject = ['AppConfig', 'AuthService', '$state'];

/**
 * This component renders a faux authentication UI
 *
 * It prompts for the username/password (and gives hints with bouncy arrows)
 * It shows errors if the authentication failed for any reason.
 */
export const signup = {
    bindings: { returnTo: '<' },

    controller: SignupController,

    template:  `

    <div layout="row" layout-padding class="pb-50">
      <div flex="10" flex-xs="5" flex-lg="20"></div>
    
      <md-card flex="80" flex-xs="90" flex-lg="60">
      
        <md-card-title>
          <md-card-title-text>
            <span class="md-headline">Registrate GRATIS en 10 segundos</span>
          </md-card-title-text>
        </md-card-title>
        
        <md-divider></md-divider>
        
        <md-card-content>
        
          <div layout="row" layout-wrap>
          
            <div flex="50" flex-xs="100">
              <img class="signup-img" src="/assets/images/signup.png" alt="Signup"/>
              <p>
                Únete a la revolución Blockchain.
                <br>
                Un universo por explorar.
              </p>
            </div>
          
            <div flex="50" flex-xs="100">
              <p class="pb-20">Aceptamos cuentas de particulares, empresas y organizaciones.</p>
              <md-input-container class="md-block">
                <label>Email</label>
                <input ng-model="user.email">
              </md-input-container>
              
              <md-input-container class="md-block">
                <label>Contraseña</label>
                <input type="{{$ctrl.typePass}}" ng-model="user.password">
                <md-icon ng-click="$ctrl.typePass = 'text'" ng-if="$ctrl.typePass == 'password'" class="fa fa-eye click-pointer"></md-icon>
                <md-icon ng-click="$ctrl.typePass = 'password'" ng-if="$ctrl.typePass == 'text'" class="fa fa-eye-slash click-pointer"></md-icon>
              </md-input-container>
              
              <md-radio-group ng-model="user.terms">
                <md-radio-button value="true" class="md-primary">Aceptar <a href="#">términos y condiciones</a></md-radio-button>
              </md-radio-group>
              
              <div class="pt-20"></div>

              <md-button flex class="md-primary md-raised btn-login"
               ng-disabled="user.email == null || user.password == null || user.terms == null">
               Crear Cuenta
              </md-button>
                        
              <div layout="row">
                <div flex></div>    
                <p class="pt-30"><b>¿Ya tienes cuenta en Bit2Me?</b></p>
                <div flex></div>
              </div>
              
              <md-button flex class="md-primary btn-registrate" ui-sref="login"><b>Login</b></md-button>
            </div>
          
          </div>
        </md-card-content>
      </md-card>
      
      <div flex="10" flex-xs="5" flex-lg="20"></div>
    </div>

    `
};
