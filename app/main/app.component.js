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
    
    <md-toolbar class="gray" style="position: fixed; bottom: 0px;">
      <div class="md-toolbar-tools">


        <span md-truncate>Privacidad | Legal | Términos y condiciones</span>
        
        <div flex></div>
        
        <span md-truncate>@ 2018 bit2me.com</span>
        
        <div class="pl-10">
          <md-icon class="pt-5 fa fa-twitter"></md-icon>
          <md-icon class="pt-5 fa fa-google"></md-icon>
          <md-icon class="pt-5 fa fa-linkedin"></md-icon>
          <md-icon class="pt-5 fa fa-facebook"></md-icon>
        </div>
        
        <div id="google_translate_element"></div>

      </div>
    </md-toolbar>
    
    <md-button class="md-fab md-primary" aria-label="Support" style="position: fixed; bottom: 40px; right: 20px;">
      <md-icon md-svg-src="/assets/icons/support-icon.svg"></md-icon>
    </md-button>
  `
}
