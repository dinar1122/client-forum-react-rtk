import { Button, Card as CardNextUI, CardBody, Input, Switch, CardHeader, Spinner, Pagination } from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useLazyGetAllPostsQuery } from '../../app/services/postsApi';
import { Card } from '../../components/card';
import { useLazyGetAllTagsQuery } from '../../app/services/tagsApi';
import TagItem from '../../components/tag-item';
import SearchList from '../../components/search-list';
import useTags from '../../features/useTags';
import { subscribedData } from '../../utils/subscribed-data';

const SearchPage = () => {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const [getPostsByQuery, { data, isFetching }] = useLazyGetAllPostsQuery()
  const { selectionTags, error, handleAddTag, handleRemoveTag, setSelectionTags } = useTags()
  const { subscribedTagIds } = subscribedData()

  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = searchParams.get("page")
  const page = pageParam ? parseInt(pageParam, 10) : 1

  const [getTags] = useLazyGetAllTagsQuery()
  const [tagList, setTagList] = useState([])
  const [tagsSearchMode, setTagsSearchMode] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const queryParam = searchParams.get('q')
        const tagsParam = searchParams.get('tags')

        const { data: tagsData } = await getTags()
        setTagList(tagsData);

        if (queryParam) {
          setQuery(queryParam);
        }

        if (tagsParam) {
          const tagsArray = tagsParam.split(',').map(tagId => {
            const tag = tagsData.find((t: any) => t.id === tagId)
            return tag ? { id: tag.id, name: tag.name } : null
          }).filter(tag => tag !== null);
          setSelectionTags(tagsArray);
        }
      } catch (error) {
        console.error('Ошибка при получении тегов:', error)
      }
    };

    fetchTags();
  }, [searchParams, getTags, setSelectionTags]);

  useEffect(() => {
    const tagsQuery = selectionTags.map((tag: any) => tag.id).join(',')
    const newQuery = `${encodeURIComponent(query)}&tags=${encodeURIComponent(tagsQuery)}&page=${page}`
    navigate(`/search?q=${newQuery}`)
  }, [query, navigate, selectionTags, page])

  useEffect(() => {
    handleSearchSubmit()
  }, [page, tagsSearchMode])

  const handleSearchChange = (event: any) => {
    setQuery(event.target.value);
  };

  const handleSelectPage = (selectedPage: any) => {
    setSearchParams({ page: selectedPage })
  };

  const handleSearchSubmit = () => {
    if (query.trim() || selectionTags.length) {
      if (!tagsSearchMode) {
        getPostsByQuery({ q: query, page })
      } else {
        getPostsByQuery({ q: query, tags: selectionTags.map((tag: any) => tag.id), page })
      }
    }
  };

  return (
    <div className="gap-3">
      <CardNextUI className="flex flex-row gap-2 mb-3 w-full rounded-2xl p-0 shadow-sm">
        <CardHeader className='gap-3 '>
          <Input
            type="text"
            placeholder="введите поисковой запрос"
            value={query}
            onChange={handleSearchChange}
            className=""
          />
          <Button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 my-auto font-semibold"
            onClick={handleSearchSubmit}
          >
            Искать
          </Button>
          <Switch
            className='w-full h-full bg-gray-100 rounded-xl px-2 font-semibold'
            isSelected={tagsSearchMode}
            onValueChange={() => setTagsSearchMode(!tagsSearchMode)}
          >
            поиск по тегам
          </Switch>
        </CardHeader>
      </CardNextUI>
      {error && <div className='text-red-600 mb-3'>{error}</div>}
      {tagsSearchMode && <CardNextUI className='shadow-sm mb-3'>
        <CardBody className='flex-row gap-2 flex-wrap	pb-0 '>
          {(selectionTags).map((tag: any) => {
            return <TagItem key={tag.name} tag={tag} deleteMethod={handleRemoveTag}></TagItem>
          })}
        </CardBody>
        <CardBody className='gap-2 '>
          {tagList && <SearchList list={tagList} onSearchResult={handleAddTag}></SearchList>}
        </CardBody>
      </CardNextUI>}
      <CardNextUI className='flex-row shadow-sm justify-between p-3'>
        <div>
          <Pagination onChange={handleSelectPage} size='lg' variant='flat' showControls total={data?.totalPages || 1} initialPage={1} />
        </div>
        <div className='my-auto text-xl my-auto font-semibold bg-gray-100 p-1 px-3 rounded-xl'>Найдено записей: {data?.totalPosts}</div>
      </CardNextUI>
      <div className="mt-3 w-full ">
        {isFetching && <Spinner size='lg' />}
        {data?.posts.map((postData) => (
          <Card
            key={postData.id}
            avatarUrl={postData.author.avatarUrl}
            name={postData.author.username}
            authorId={postData.authorId}
            content={postData.content}
            cardFor={'post'}
            id={postData.id}
            likedByUser={postData.likedByUser}
            dislikedByUser={postData.dislikedByUser}
            createdAt={postData.createdAt}
            commentsCount={postData._count.comments}
            likesCount={postData._count.likes}
            dislikesCount={postData._count.dislikes}
            topicData={postData.topic}
            categoryData={postData.category}
            tagsData={postData.postTags}
            subscribedTagIds={subscribedTagIds}
          />
        ))}
        {!isFetching && data && data.posts && data.posts.length === 0 && <p>Нет данных</p>}
      </div>
    </div>
  );
};

export default SearchPage;
