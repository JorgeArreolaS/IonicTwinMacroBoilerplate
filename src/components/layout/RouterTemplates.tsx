import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';

const Default: React.FC<{ 
  title: string | JSX.Element, 
  color?: string 
}> =
  ({ children, title, color }) => (
    <>
      <IonPage>
        <IonHeader >
          <IonToolbar color={color}>
            <IonButtons slot="start">
              <IonBackButton />
            </IonButtons>
            <IonTitle>{title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          {children}
        </IonContent>
      </IonPage>
    </>
  )

const none: React.FC<{ dumb: boolean }> = ({ children }) => (
  <>{children}</>
)

export const Templates = {
  default: Default,
  none: none
}
