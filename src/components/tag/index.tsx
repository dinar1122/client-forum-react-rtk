export const TagManager = ({ tags, subscribedTags, onToggleSubscribe }) => {
    return (
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <div
            key={tag.id}
            onClick={() => onToggleSubscribe(tag.id)}
            className={`cursor-pointer p-2 rounded-md border ${subscribedTags.includes(tag.id) ? 'border-green-500' : 'border-gray-300 hover:border-gray-500'}`}
          >
            {tag.name}
          </div>
        ))}
      </div>
    )
  }