import { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { ModalWrapper } from '../../components/Modal/Modal';
import { PaginationWrapper } from '../../components/Pagination/Pagination';
import { BackendService } from '../../helpers/Backend-Service';
import { Post } from '../../models/post-model';
import { BsSortAlphaDown, BsSortAlphaDownAlt } from 'react-icons/bs';
import './styles.scss';
import { SITE_CONFIG } from '../../helpers/site-config';
import { ModalProps } from '../../models/modal-props';
import { useQuery } from './posts.hook';

export const Posts = () => {
    const [posts, setPosts] = useState<Array<Post>>([]);
    const [modalProps, setModalProps] = useState<ModalProps>({
        title: '',
        body: <></>,
        actions: [],
        show: false,
        modalProperties: {},
    });

    const { postsFiltered, setCurrentPage, setQuery, setSort, currentPage, totalItems, sort } =
        useQuery(SITE_CONFIG.PAGE_SIZE, posts);

    useEffect(() => {
        const getData = async () => {
            await updatePostsData();
        };

        getData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const updatePostsData = async () => {
        await backendService.call('/posts', 'GET').then((data: Array<Post>) => setPosts(data));
    };

    const backendService = new BackendService();

    const createEditPost = (post?: Post) => {
        const title = 'Create post';
        const body = (
            <>
                <div className="create-post-wrapper">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter post name"
                                onChange={($event) => onPostTitleChange($event, post)}
                                defaultValue={post?.title}
                            />
                        </Form.Group>
                    </Form>
                </div>
            </>
        );

        const actions = [
            {
                text: 'Save',
                onClick: (e: any) => {
                    savePost(e);
                },
                type: 'primary',
                submit: () => {},
            },
            {
                text: 'Cancel',
                onClick: () => {
                    setModalProps({ ...modalProps, show: false });
                },
                type: 'secondary',
            },
        ];

        setModalProps({
            title,
            body,
            actions,
            show: true,
            modalProperties: {
                post,
            },
        });

        const onPostTitleChange = ($event: any, post?: Post) => {
            setModalProps({
                title,
                body,
                actions,
                show: true,
                modalProperties: {
                    post: {
                        name: $event.target.value,
                        ...(post && { id: post.id }),
                    },
                },
            });
        };
    };

    const savePost = async (event: any) => {
        const params = {
            ...event,
        };
        if (event.post.id) {
            // edit
            await backendService.call(`/posts/${event.post.id}`, 'PUT', params).then(
                (data) => {
                    setModalProps({ ...modalProps, show: false });

                    // false update -> should be updatePostsData()
                    const postToUpdate = posts.findIndex((post) => post.id === event.post.id);
                    if (postToUpdate) {
                        posts[postToUpdate].title = data.post.title;
                    }
                    setPosts(posts);
                },
                (err) => {
                    alert(err);
                }
            );
        } else {
            // create
            await backendService.call('/posts', 'POST', params).then(
                (data) => {
                    setModalProps({ ...modalProps, show: false });
                    setPosts([...posts, { title: data.post.title, id: data.id }]);
                },
                (err) => {
                    alert(err);
                }
            );
        }
    };

    const paginationChange = (currentPage: number) => {
        setCurrentPage(currentPage);
    };

    const onPostSearch = (query: string) => {
        setQuery(query);
    };

    return (
        <div className="posts-wrapper">
            <h1>Posts</h1>
            <Row className="mb-5">
                <Col className="align-items-center col d-flex justify-content-between w-100">
                    <button
                        className="btn btn-warning text-white"
                        onClick={() => {
                            createEditPost();
                        }}
                    >
                        Create Post
                    </button>

                    <div className="w-50 d-flex justify-content-end">
                        <div className="sort">
                            {sort === 'desc' ? (
                                <BsSortAlphaDownAlt />
                            ) : sort === 'asc' ? (
                                <BsSortAlphaDown />
                            ) : (
                                <></>
                            )}

                            <button
                                className="ms-1 btn btn-outline-primary"
                                onClick={() => {
                                    setSort(
                                        sort.length === 0 || sort === 'desc'
                                            ? 'asc'
                                            : sort === 'asc'
                                            ? 'desc'
                                            : ''
                                    );
                                }}
                            >
                                Sort
                            </button>
                        </div>
                        <input
                            className="ms-1 px-2 py-1"
                            placeholder="Search posts"
                            type="text"
                            onChange={(e) => {
                                onPostSearch(e.target.value);
                            }}
                        />
                    </div>
                </Col>
            </Row>

            {postsFiltered.map((post: Post, key) => (
                <Row key={key} className={`mx-1 ${key % 2 === 0 ? `bg-warning` : ''}`}>
                    <p className="mb-0 py-3">
                        #{post.id} - {post.title}
                        <button
                            onClick={() => {
                                createEditPost(post);
                            }}
                            className={`btn btn-outline btn-outline-${
                                key % 2 === 0 ? 'danger' : 'secondary'
                            } float-end py-0`}
                        >
                            Edit
                        </button>
                    </p>
                </Row>
            ))}

            {posts.length > 0 ? (
                <Row className="mt-5">
                    <PaginationWrapper
                        totalItems={totalItems}
                        pageSize={SITE_CONFIG.PAGE_SIZE}
                        page={currentPage}
                        onPaginationChange={paginationChange}
                    />
                </Row>
            ) : (
                'Loading posts'
            )}

            <ModalWrapper
                title={modalProps.title}
                body={modalProps.body}
                actions={modalProps.actions}
                show={modalProps.show}
                modalProperties={modalProps.modalProperties}
            />
        </div>
    );
};
