import { css } from '@emotion/react';
import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Layout from 'components/layout';
import { home } from 'ionicons/icons'
import { Page } from 'utils/RouterUtils';

export const SubPages = Page<'/mylist/:id'>({
  path: '/mylist/:id',
  route: {
    exact: false,
  },
}, ({ match }) => {

  return (
    <Layout 
      template="default"
      options={{
        title: <>Hola: <span tw=" text-blue-500 ">{match.params.id}</span></>,
      }}
    >
      <div tw=" m-5 ">
        <h1 tw=" text-green-300 ">Testing Content</h1>
        <pre>{
          JSON.stringify(match, null, 2)
        }</pre>
      </div>
    </Layout>
  );
});

const List = Page<'/list'>({
  path: '/list',
  route: {
    exact: true,
  },
  sub: {
    subpage: SubPages
  }
}, ({ history }) => {

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={() => { history.replace('/') }}>
              <IonIcon slot="icon-only" icon={home} />
            </IonButton>
          </IonButtons>
          <IonTitle>List <span tw="text-blue-500">of anything</span></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank2</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div tw=" p-5 grid grid-cols-3 gap-5 flex-wrap ">
          {Array(9).fill(0).map((_, i) => i + 1).map(i => (
            <div
              onClick={() => {
                history.push(SubPages.getPath({ id: i }))
              }}
              tw=" p-3 bg-red-900 text-4xl flex justify-center items-center flex-col w-full "
              css={css`
                aspect-ratio: 1/1;
              `}
            >
              <h3>{i}</h3>
            </div>
          ))}
        </div>

      </IonContent>
    </IonPage>
  );
});

console.log(List)

export default List
