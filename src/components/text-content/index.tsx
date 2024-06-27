import React from "react";
import { Link } from "react-router-dom";
import BlockCode from "../UI/block-code";

type Props = {
  children: string;
  size?: string;
};

const parseMentions = (text: string) => {
  const codePattern = /!code\[(.*?)\]!code/gs;
  const parts: any = [];

  let lastIndex = 0;
  let match;

  while ((match = codePattern.exec(text)) !== null) {
    if (lastIndex < match.index) {
      const beforeCode = text.slice(lastIndex, match.index);
      parts.push(...parseText(beforeCode));
    }
    parts.push({
      type: "code",
      display: match[1],
    });
    lastIndex = codePattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(...parseText(text.slice(lastIndex)));
  }

  return parts;
};

const parseText = (text: string) => {
  const mentionPattern = /@\[(.*?)\]\((.*?)\)/g;
  const quotePattern = /^>\s*(.*)$/gm;
  const linkPattern = /!link:\[(.*?)\]\((.*?)\)/g;
  const parts: any = [];
  let lastIndex = 0;
  let match;

  while ((match = mentionPattern.exec(text)) !== null) {
    if (lastIndex < match.index) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({
      type: "mention",
      display: match[1],
      id: match[2],
    });
    lastIndex = mentionPattern.lastIndex;
  }

  const quoteMatches = [...text.matchAll(quotePattern)];
  quoteMatches.forEach((quoteMatch) => {
    if (lastIndex < quoteMatch.index) {
      parts.push(text.slice(lastIndex, quoteMatch.index));
    }
    parts.push({
      type: "quote",
      display: quoteMatch[1],
      id: null,
    });
    lastIndex = quotePattern.lastIndex;
  });

  while ((match = linkPattern.exec(text)) !== null) {
    if (lastIndex < match.index) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push({
      type: "link",
      display: match[1],
      url: match[2],
    });
    lastIndex = linkPattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
};

export const TextContent: React.FC<Props> = ({ children, size = "text-xl myTextClass" }) => {
  const parsedText = parseMentions(children);

  const renderPart = (part: any, index: number) => {
    if (typeof part === "string") {
      return <span key={index}>{part}</span>;
    }

    if (part.type === "mention") {
      return (
        <Link key={index} to={`/users/${part.id}`}>
          <span className="text-blue-600 bg-blue-100 px-2 rounded-2xl pb-1">
            @{part.display}
          </span>
        </Link>
      );
    }

    if (part.type === "quote") {
      return (
        <blockquote key={index} className="border-l-4 border-blue-500 pl-4 italic my-2 bg-gray-200 rounded-md">
          {part.display}
        </blockquote>
      );
    }

    if (part.type === "link") {
      return (
        <a key={index} href={part.url} className="text-blue-600 underline">
          {part.display}
        </a>
      );
    }

    if (part.type === "code") {

      return <BlockCode key={index} textContent={part.display} />;
    }

    if (part.type === "newline") {
      return <br key={index} />;
    }
  };

  return <div className={`${size} my-auto`}>{parsedText.map(renderPart)}</div>;
};
