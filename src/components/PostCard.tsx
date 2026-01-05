import React, { memo, useCallback, useState } from "react";

interface PostCardProps {
  id: number;
  title: string;
  content: string;
  expandable?: boolean;
  isModalViewToggle: boolean;
  onSelect: (id: number) => void;
}

export const PostCard: React.FC<PostCardProps> = memo(
  ({ id, title, content, expandable, isModalViewToggle, onSelect }) => {
    const [expanded, setExpanded] = useState<boolean>(false);

    //handles card click
    const onCardClick = useCallback(() => {
      if (expandable && !isModalViewToggle) {
        setExpanded((prev) => !prev);
      } else {
        onSelect?.(id);
      }
    }, [expandable, isModalViewToggle, onSelect, id]);

    //onkeydown handler
    const onKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onCardClick();
        }
      },
      [onCardClick]
    );

    return (
      <div
        className="card bg-base-100 shadow-xl w-full cursor-pointer hover:shadow-2xl transition-shadow focus:outline-none focus:ring-2 focus:ring-gray-400"
        role="button"
        onClick={onCardClick}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          {expanded ? (
            <p>{content}</p>
          ) : (
            <p>
              {content.slice(0, 80)}
              {content.length > 80 ? "..." : ""}
            </p>
          )}
        </div>
      </div>
    );
  }
);
