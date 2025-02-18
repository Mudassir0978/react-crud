import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Create from "./Components/Create";
import Read from "./Components/Read";
import Update from "./Components/Update";
import Layout from "./Components/Layout";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Create />} />
            <Route path="create" element={<Create />} />
            <Route path="read" element={<Read />} />
            <Route path="update" element={<Update />} />
          </Route>
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
