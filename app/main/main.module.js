import {app} from "./app.component";
import {welcome} from "./welcome.component";
import {login} from "./login.component";
import {signup} from "./signup.component";
import {appState, loginState, signupState, welcomeState, contactsFutureState, prefsFutureState, mymessagesFutureState} from "./app.states";

export const MAIN_MODULE = angular.module('main', []);

MAIN_MODULE.config(['$uiRouterProvider', function($uiRouter) {
  // Enable tracing of each TRANSITION... (check the javascript console)
  // This syntax `$trace.enable(1)` is an alternative to `$trace.enable("TRANSITION")`.
  // Besides "TRANSITION", you can also enable tracing for : "RESOLVE", "HOOK", "INVOKE", "UIVIEW", "VIEWCONFIG"
  $uiRouter.trace.enable(1);

  // If the user enters a URL that doesn't match any known URL (state), send them to `/login`
  const $urlService = $uiRouter.urlService;
  $urlService.rules.otherwise({ state: 'login' });

  const $stateRegistry = $uiRouter.stateRegistry;
  $stateRegistry.register(appState);
  $stateRegistry.register(loginState);
  $stateRegistry.register(signupState);
  $stateRegistry.register(welcomeState);

  $stateRegistry.register(contactsFutureState);
  $stateRegistry.register(prefsFutureState);
  $stateRegistry.register(mymessagesFutureState);
}]);

MAIN_MODULE.component('app', app);
MAIN_MODULE.component('welcome', welcome);
MAIN_MODULE.component('login', login);
MAIN_MODULE.component('signup', signup);
