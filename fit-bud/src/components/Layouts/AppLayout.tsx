import React from 'react'
import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { chevronBackOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';

interface Props {
  children: React.ReactNode,
  title?: string | React.ReactNode,
  showNavigation?: boolean,
  subTitle?: string | React.ReactElement,
}

function AppLayout(props: Props) {
  const {
    children,
    title,
    showNavigation = true,
    subTitle
  } = props
  // const router = useRouter()

  const routesWithoutBack = ['/', '/workouts'];
  const history = useHistory();

  return (
    <IonPage>
        {/* <IonToolbar>
          <IonTitle>{title || 'Welcome back,'}</IonTitle>
        </IonToolbar> */}
      <div className="z-10 bg-white">
        <div className='px-4 z-10'>
          {title && 
            <div className='flex items-center justify-between'>
              <div className="bg-neutral-10 w-8 h-8 flex justify-center items-center rounded" onClick={history.goBack}>
                <IonIcon icon={chevronBackOutline} />
              </div>
              <h5 className='font-bold'>{title}</h5>
              <div></div>
            </div>
            }
          {!title && 
            <>
              <p className='pb-0 mb-0 text-neutral-70 text-sm'>Welcome back,</p>
              <h5 className='mt-1'>Shreyans</h5>
            </>
          }
        </div>
      </div>
      <IonContent fullscreen>
        {children}
      </IonContent>
    </IonPage>
  )
}

export default AppLayout
