import {
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonSkeletonText,
  IonThumbnail,
} from "@ionic/react";

export const UsersSkeleton = ({count}: {count: number}) => {
  return (
    <>
      <IonList>
        <IonListHeader title="Users">
          <IonLabel>Users</IonLabel>
        </IonListHeader>

        {[...Array(count)].map((_, index) => (
          <IonItem key={index} style={{ backgroundColor: "#fff" }}>
            <UserSkeleton />
          </IonItem>
        ))}
      </IonList>
    </>
  );
};


function UserSkeleton() {
  return (
    <>
      <IonThumbnail slot="start">
        <IonSkeletonText animated={true}></IonSkeletonText>
      </IonThumbnail>
      <IonLabel>
        <h3>
          <IonSkeletonText
            animated={true}
            style={{ width: "80%" }}
          ></IonSkeletonText>
        </h3>
        <p>
          <IonSkeletonText
            animated={true}
            style={{ width: "60%" }}
          ></IonSkeletonText>
        </p>
        <p>
          <IonSkeletonText
            animated={true}
            style={{ width: "30%" }}
          ></IonSkeletonText>
        </p>
      </IonLabel>
    </>
  );
}