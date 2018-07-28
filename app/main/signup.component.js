/**
 * The controller for the `signup` componen
 */
class LoginController {
  constructor(AppConfig, AuthService, $state) {
    this.usernames = AuthService.usernames;

    this.credentials = {
      username: AppConfig.emailAddress,
      password: 'password'
    };

    this.signup = (credentials) => {
      console.log('creando usuario...');
    }
  }
}
LoginController.$inject = ['AppConfig', 'AuthService', '$state'];

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
    <div class="container">
      <div class="col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
        <h3>Log In</h3>
        <p>(This login screen is for demonstration only... just pick a username, enter 'password' and click <b>"Log in"</b>)</p>
        <hr>
    
        <div>
          <label for="username">Username:</label>
          <select class="form-control" name="username" id="username"
            ng-model="$ctrl.credentials.username" ng-options="username for username in $ctrl.usernames"></select>
          <i style="position: relative; bottom: 1.8em; margin-left: 10em; height: 0" ng-hide="$ctrl.credentials.username" class="fa fa-arrow-left bounce-horizontal"> Choose </i>
        </div>
        <br>
    
        <div>
          <label for="password">Password:</label>
          <input class="form-control" type="password" name="password" ng-model="$ctrl.credentials.password">
          <i style="position: relative; bottom: 1.8em; margin-left: 5em; height: 0"
              ng-hide="!$ctrl.credentials.username || $ctrl.credentials.password == 'password'" class="fa fa-arrow-left bounce-horizontal">
            Enter '<b>password</b>' here
          </i>
        </div>
    
        <div ng-show="$ctrl.errorMessage" class="well error">{{ $ctrl.errorMessage }}</div>
    
        <hr>
        <div>
          <button class="btn btn-primary" type="button"
              ng-disabled="$ctrl.authenticating" ng-click="$ctrl.login($ctrl.credentials)">
            <i class="fa fa-spin fa-spinner" ng-show="$ctrl.authenticating"></i> <span>Log in</span>
          </button>
          <i ng-show="$ctrl.credentials.username && $ctrl.credentials.password == 'password'" style="position: relative;" class="fa fa-arrow-left bounce-horizontal"> Click Me!</i>
      </div>
    </div>
    `
};
