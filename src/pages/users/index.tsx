import { useEffect, useState } from "react";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
} from "@ionic/react";
import axios from "axios";

import { API_END_POINTS } from "../../utils";
import { User } from "../../types";
import { UserCard, UsersSkeleton } from "../../components";

import styles from "./style.module.scss";

// Constants and Interfaces
const USER_LIMIT = 100;
interface InfiniteScrollCustomEvent extends CustomEvent {
  target: HTMLIonInfiniteScrollElement;
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchDataAsync = async (event: InfiniteScrollCustomEvent | null) => {
    try {
      const response = await axios.get(API_END_POINTS.getUsers + "?results=10");
      setUsers((oldUsers) => [...oldUsers, ...response.data.results]);

      if (event) {
        event.target.complete();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchDataAsync(null);
  }, []);

  return (
    <IonPage className={styles.page}>
      <IonContent fullscreen>
        {users && users.length ? (
          <IonList>
            <IonListHeader title="Users">
              <IonLabel>Users</IonLabel>
            </IonListHeader>

            <div className={styles.users}>
              {users.map((user, i) => (
                <UserCard user={user} key={user.id.value} />
              ))}
            </div>

            {/* Infinite Scroll */}
            <IonInfiniteScroll
              onIonInfinite={async (event) => {
                if (users.length >= USER_LIMIT) {
                  event.target.complete();
                  return;
                }

                await fetchDataAsync(event);
              }}
            >
              <IonInfiniteScrollContent
                loadingSpinner="bubbles"
                loadingText="Getting more users..."
              ></IonInfiniteScrollContent>
            </IonInfiniteScroll>
          </IonList>
        ) : (
          <UsersSkeleton count={8} />
        )}
      </IonContent>
    </IonPage>
  );
};
