import { useEffect } from "react";
import { useStore } from "./store/useStore";
import { Header } from "./components/Header/Header";
import { TokenInput } from "./components/TokenInput/TokenInput";
import { FilterSection } from "./components/FilterSection/FilterSection";
import { Skeleton } from "./components/Skeleton/Skeleton";
import { ErrorState } from "./components/ErrorState/ErrorState";
import { UserCard } from "./components/UserCard/UserCard";
import { RepoList } from "./components/RepoList/RepoList";
import { Footer } from "./components/Footer/Footer";
import "./App.module.css";

function App() {
  const loadRandomUser = useStore((state) => state.loadRandomUser);
  const loading = useStore((state) => state.loading);

  useEffect(() => {
    loadRandomUser();
  }, [loadRandomUser]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === "r" || e.key === "R") &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey
      ) {
        e.preventDefault();
        if (!loading) {
          loadRandomUser();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [loading, loadRandomUser]);

  return (
    <>
      <TokenInput />
      <FilterSection />
      <div className="container">
        <Header />
        <div className="card-section">
          <Skeleton />
          <ErrorState />
          <UserCard />
          <RepoList />
        </div>

        <Footer />
      </div>
    </>
  );
}

export default App;
