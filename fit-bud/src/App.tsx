import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import FriendListPage from './pages/FriendListPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './styles/styles.min.css';

/* Theme variables */
import './theme/variables.css';
import WorkoutListPage from './pages/WorkoutListPage';
import WorkoutSessionPage from './pages/WorkoutSessionPage';
import NewWorkoutPage from './pages/NewWorkoutPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/users" component={FriendListPage} exact={true} />
        <Route path="/users/:id/workouts" component={WorkoutListPage} exact={true} />
        <Route path="/users/:id/new-workout" component={NewWorkoutPage} exact={true} />
        <Route path="/users/:id/workouts/:workoutId" component={WorkoutSessionPage} exact={true} />
        <Redirect exact from="/" to="/users" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
