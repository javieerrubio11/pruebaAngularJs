/**
 * The controller for the `app` component.
 */
class AuthedController {
  constructor(AppConfig, AuthService, $state, $transitions, LoadingIndicatorService) {
    this.AuthService = AuthService;
    this.$state = $state;

    this.emailAddress = AppConfig.emailAddress;
    this.isAuthenticated = AuthService.isAuthenticated();
 }

  logout() {
    let {AuthService, $state} = this;
    AuthService.logout();
    // Reload states after authentication change
    return $state.go('login', {}, { reload: true });
  }

  isActive(glob) {
    return this.$state.includes(glob);
  }
}
AuthedController.$inject = ['AppConfig', 'AuthService', '$state', '$transitions', 'LoadingIndicatorService'];

/**
 * This is the main app component for an authenticated user.
 * 
 * This component renders the outermost chrome (application header and tabs, the compose  and logout button)
 * It has a `ui-view` viewport for nested states to fill in.
 */
export const app = {
  controller: AuthedController,
  template: `
    <div class="navheader">
      <ul ng-if="::$ctrl.isAuthenticated" class="nav nav-tabs">
        <!--<li ui-sref-active="active"> <a ui-sref="mymessages" role="button"> Messages </a> </li>-->
        <!--<li ui-sref-active="active"> <a ui-sref="contacts" role="button"> Contacts </a> </li>-->
        <!--<li ui-sref-active="active"> <a ui-sref="prefs" role="button"> Preferences </a> </li>-->
    
        <li ui-sref-active="active" class="navbar-right"> <a role="button"> Log Out </a> </li>
        <li class="navbar-right" style="margin: 0.75em 0.5em;"><b>{{::$ctrl.emailAddress}}</b></li>
      </ul>
    </div>
    
    <div ui-view></div>
    <div ui-view="mymessages" ng-show="$ctrl.isActive('mymessages.**')"></div>
    <div ui-view="contacts" ng-show="$ctrl.isActive('contacts.**')"></div>
`
}
