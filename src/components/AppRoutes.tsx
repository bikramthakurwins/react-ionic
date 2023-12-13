import { lazy } from "react";
import { Redirect, Route } from "react-router-dom";

// Lazy load the modules
const ExploreModule = lazy(() => import("../modules/explore").then(({ Explore }) => ({ default: Explore })));
const HomeModule = lazy(() => import("../modules/home").then(({ Home }) => ({ default: Home })));

export const AppRoutes = () => {
  return (
    <>
      <Route exact path="/explore">
        <ExploreModule name="Explore" />
      </Route>
      <Route exact path="/home">
        <HomeModule name="Home" />
      </Route>
      <Route exact path="/">
        <Redirect to="/explore" />
      </Route>
    </>
  );
};
