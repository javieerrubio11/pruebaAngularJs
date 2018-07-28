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
  template:
  `
    <div ui-view></div>
    
    <md-toolbar class="grey">
      <div class="md-toolbar-tools">


        <span md-truncate>Privacidad | Legal | Términos y condiciones</span>
        
        <div flex></div>
        
        <span md-truncate>@ 2018 bit2me.com</span>
        
        <span>
          <md-icon class="fa fa-twitter"></md-icon>
          <md-icon class="fa fa-google"></md-icon>
          <md-icon class="fa fa-linkedin"></md-icon>
          <md-icon class="fa fa-facebook"></md-icon>
        </span>
        
        <span>translate..</span>

      </div>
    </md-toolbar>
  `
}
