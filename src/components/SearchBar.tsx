import React, { memo, useCallback } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  isChecked: boolean;
  onToggleModal: (isOpen: boolean) => void;
}

export const SearchBar: React.FC<SearchBarProps> = memo(
  ({ onSearch, isChecked, onToggleModal }) => {
    //handle search input change
    const onSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
      },
      [onSearch]
    );

    //handle modal toggle change
    const onModalToggleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onToggleModal(e.target.checked);
      },
      [onToggleModal]
    );

    return (
      <div className="w-full max-w-3xl mx-auto p-4 flex gap-4 items-center">
        <div className="form-control w-full">
          <input
            type="text"
            placeholder="Search posts..."
            className="input input-bordered w-full"
            onChange={onSearchChange}
          />
        </div>
        <label>Modal:</label>
        <input
          type="checkbox"
          checked={isChecked}
          className="toggle"
          onChange={onModalToggleChange}
        />
      </div>
    );
  }
);
