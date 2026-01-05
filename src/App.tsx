import { useEffect, useState } from "react";
import { SearchBar } from "./components/SearchBar";
import { PostList } from "./components/PostList";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [isModalViewToggle, setIsModalViewToggle] = useState(false);

  //handles the debounce, will prefer to use debounce library in real projects
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  return (
    <div className="flex flex-col items-center min-w-screen bg-base-200">
      <div className="min-h-screen lg:w-3xl lg:max-w-3xl sm:w-full bg-base-200 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold mb-8">Posts List</h1>
        <SearchBar
          onSearch={setSearchQuery}
          isChecked={isModalViewToggle}
          onToggleModal={setIsModalViewToggle}
        />
        <PostList
          searchTerm={debouncedSearchQuery}
          isModalViewToggle={isModalViewToggle}
        />
      </div>
    </div>
  );
}

export default App;
