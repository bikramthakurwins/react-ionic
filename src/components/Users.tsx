import { useEffect, useState } from "react";
import {
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
} from "@ionic/react";
import axios from "axios";
import Bottleneck from "bottleneck";
import styles from "./Users.module.scss";

const API_URL = "https://randomuser.me/api/";

const limiter = new Bottleneck({
  maxConcurrent: 5, // as per api limit
  minTime: 100, // Minimum time(ms) to wait between requests
});

const fetchUsersInBatches = async (totalUsers, batchSize) => {
  const totalPages = Math.ceil(totalUsers / batchSize);

  const allUsers = [];

  // Create an array of promises for each batch
  const batchPromises = Array.from({ length: totalPages }, (_, page) => {
    const start = page * batchSize;
    const end = Math.min((page + 1) * batchSize, totalUsers);

    const batchPromise = Array.from({ length: end - start }, (_, index) => {
      const userId = start + index + 1; // Adjust the index to start from 1 or 0 based on your API

      return limiter
        .schedule(() => axios.get(API_URL))
        .then((response) => response.data)
        .catch((error) => {
          console.error(`Error fetching user ${userId}:`, error);
          return null; // Handle errors gracefully
        });
    });

    return Promise.all(batchPromise).then((batchUsers) => {
      // Add the users from the current batch to the overall array
      allUsers.push(...batchUsers.filter((user) => user !== null));
    });
  });

  // Wait for all batches to complete
  await Promise.all(batchPromises);

  return allUsers;
};

// Usage per batch
const usersPerBatch = 10; // per batch users
const concurrentCalls = 2;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const response = await fetchUsersInBatches(
          usersPerBatch,
          concurrentCalls
        );

        const formattedUsers = response.map((user) => ({ ...user.results[0] }));
        console.log(formattedUsers, "formattedUsers");
        setUsers((oldUsers) => [...oldUsers, formattedUsers]);
      } catch (error) {}
    };

    if (currentPage < 10) {
      fetchDataAsync();
    }
  }, [currentPage]);

  useEffect(() => {
    console.log(users, "users");
  }, [users]);

  return (
    <IonPage className={styles.page}>
      <IonContent fullscreen className={styles.content}>
        <IonList>
          {users.map((user, index) => {
            return (
              <IonItem
                id={`userItem_${user.id.value}`}
                className={` ${styles.userItem} animate__animated animate__fadeIn`}
                key={user.id.value}
                lines="none"
              >
                <img src={user.picture.thumbnail} alt="employee avatar" />

                <IonLabel>
                  <h2>{user.name.first}</h2>
                  <p>{user.gender}</p>
                </IonLabel>
              </IonItem>
            );
          })}

          <IonInfiniteScroll
            threshold="200px"
            onIonInfinite={() => setCurrentPage((oldPage) => oldPage + 1)}
          >
            <IonInfiniteScrollContent
              loadingSpinner="bubbles"
              loadingText="Getting more users..."
            ></IonInfiniteScrollContent>
          </IonInfiniteScroll>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Users;
