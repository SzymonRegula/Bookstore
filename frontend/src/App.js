import "./App.css";
import BookSection from "./components/BookSection/BookSection";
import BooksContextProvider from "./store/books-context";
import AuthContextProvider from "./store/auth-context";
import Header from "./components/Header/Header";

function App() {
  return (
    <AuthContextProvider>
      <BooksContextProvider>
        <Header />
        <BookSection />
      </BooksContextProvider>
    </AuthContextProvider>
  );
}

export default App;
