import { IonIcon, IonLabel, IonTabButton } from "@ionic/react";

interface BottomTabsProps {
  tabs: {
    tab: string;
    href: string;
    icon: string;
    label: string;
  }[];
}

export const BottomTabs = ({ tabs }: BottomTabsProps) => {
  return (
    <>
      {tabs.map(({ tab, href, icon, label }) => (
        <IonTabButton tab={tab} href={href} key={tab}>
          <IonIcon icon={icon} />
          <IonLabel>{label}</IonLabel>
        </IonTabButton>
      ))}
    </>
  );
};
