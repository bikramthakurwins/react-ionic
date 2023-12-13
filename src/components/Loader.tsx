import { IonSpinner } from "@ionic/react";

const styles = {
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
};

export const Loading = () => {
  return (
    <div style={styles.loading}>
      <IonSpinner name="crescent" />
    </div>
  );
};
