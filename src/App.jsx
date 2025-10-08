import { Route, Routes } from "react-router";
import "./App.css";
import Layout from "./Layout";
import Articles from "./components/article/Articles";
import NewPost from "./components/NewPost";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/httpReq";
import ArticlesCategoryPage from "./components/ArticlesCategoryPage";
import ArticleDetails from "./components/articleDetails/ArticleDetails";
import Login from "./components/Login";
import { Provider } from "react-redux";
import { store } from "./store/Store";
import AuthorList from "./components/author/AuthorList";
import AuthorPage from "./components/author/AuthorPage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path="/" element={<Articles />} />
            <Route
              path="/react"
              element={<ArticlesCategoryPage filter="react" />}
            />
            <Route
              path="/next"
              element={<ArticlesCategoryPage filter="next" />}
            />
            <Route
              path="/javascript"
              element={<ArticlesCategoryPage filter="javascript" />}
            />
            <Route path="/authors" element={<AuthorList />} />
            <Route path="/newPost" element={<NewPost />} />
            <Route path="/articles/:slug/:id" element={<ArticleDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/author/:id" element={<AuthorPage />} />
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Layout>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
