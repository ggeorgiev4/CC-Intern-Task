import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { AppContext } from '../../App';
import { ModalWrapper } from '../../components/Modal/Modal';
import { PaginationWrapper } from '../../components/Pagination/Pagination';
import { BackendService } from '../../helpers/Backend-Service';
import { SITE_CONFIG } from '../../helpers/site-config';
import { ModalProps } from '../../models/modal-props';
import { User } from '../../models/user-model';
import { useQuery } from './users.hook';
import './styles.scss';
import { infiniteScroll } from '../../helpers/intersection-observer';

export const Users = ({ pagination }: { pagination: boolean }) => {
    const [users, setUsers] = useState<Array<User>>([]);
    const [modalProps, setModalProps] = useState<ModalProps>({
        title: '',
        body: <></>,
        actions: [],
        show: false,
        modalProperties: {},
    });

    const { usersFiltered, setCurrentPage, setQuery, currentPage, totalItems } = useQuery(
        SITE_CONFIG.PAGE_SIZE,
        users,
        pagination
    );

    const [entries, setEntries] = useState<IntersectionObserverEntry[]>();

    const infiniteScrollCallback = (
        entriesData: Array<IntersectionObserverEntry>,
        observer: IntersectionObserver
    ) => {
        console.log('asdasd');
        setEntries(entriesData);
    };

    const infiniteScrollSubscribe = () => {
        const infiniteScrollConfig = {
            configurationOptions: {
                root: '.results-wrapper',
                margin: '20px',
                threshold: [0, 0.25, 0.5, 0.75, 1],
            },
            callbackFn: infiniteScrollCallback,
        };

        infiniteScroll(infiniteScrollConfig);
    };

    const backendService = new BackendService();
    const props = useContext(AppContext);

    useEffect(() => {
        console.log('here');
        updateUsersData();
        // .then(() => {
        //     infiniteScrollSubscribe();
        // });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log('here scroll');
        if (usersFiltered.length > 0) {
            infiniteScrollSubscribe();
        }
    }, [usersFiltered]);

    const updateUsersData = async () => {
        await backendService.call('/users', 'GET').then((data: Array<User>) => setUsers(data));
    };

    const onUserSearch = (query: string) => {
        setQuery(query);
    };

    const createEditUser = (user?: User) => {
        const title = 'Create user';
        const body = (
            <>
                <div className="create-user-wrapper">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter user name"
                                onChange={($event) => onUserNameChange($event, user)}
                                defaultValue={user?.name}
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
                    saveUser(e);
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
                user,
            },
        });

        const onUserNameChange = ($event: any, user?: User) => {
            setModalProps({
                title,
                body,
                actions,
                show: true,
                modalProperties: {
                    user: {
                        name: $event.target.value,
                        ...(user && { id: user.id }),
                    },
                },
            });
        };
    };

    const saveUser = async (event: any) => {
        const params = {
            ...event,
        };
        if (event.user.id) {
            // edit
            await backendService.call(`/users/${event.user.id}`, 'PUT', params).then(
                (data) => {
                    setModalProps({ ...modalProps, show: false });
                    // fake update -> should be updateUsersData()
                    const userToUpdate = users.findIndex((user) => user.id === event.user.id);
                    if (userToUpdate) {
                        users[userToUpdate].name = data.user.name;
                    }
                    setUsers(users);
                },
                (err) => {
                    alert(err);
                }
            );
        } else {
            // create
            await backendService.call('/users', 'POST', params).then(
                (data) => {
                    setModalProps({ ...modalProps, show: false });
                    setUsers([...users, { name: data.user.name, id: data.id }]);
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

    const PropertyCheckboxes = () => {
        return (
            <div className="d-flex">
                {Object.keys(props.data).map((k, index) => (
                    <Form.Check
                        key={index}
                        className="me-3"
                        type="checkbox"
                        defaultChecked={props.data[k as keyof typeof props.data]}
                        onChange={(e) => updateContext(e, k as any)}
                        id={`default-${k}`}
                        label={k}
                    />
                ))}
            </div>
        );
    };

    const updateContext = (event: any, k: keyof typeof props) => {
        props.setPropsVisibility({
            data: {
                ...props.data,
                [k]: event.target.checked,
            },
        });
    };

    return (
        <div className="users-wrapper">
            <h1>Users</h1>
            <Row className="mb-5">
                <Col className="align-items-center col d-flex justify-content-between w-100">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            createEditUser();
                        }}
                    >
                        Create user
                    </button>
                    <input
                        className="w-50 px-2 py-1"
                        placeholder="Search users"
                        type="text"
                        onChange={(e) => {
                            onUserSearch(e.target.value);
                        }}
                    />
                </Col>
            </Row>

            {usersFiltered.length > 0 && (
                <Row>
                    <Col>
                        <PropertyCheckboxes />
                    </Col>
                </Row>
            )}

            <div className={`results-wrapper ${pagination ? 'has-pagination' : ''}`}>
                {usersFiltered.map((user: User, key) => (
                    <Row
                        key={key}
                        className={`mx-1 user-row ${key % 2 === 0 ? `bg-primary text-white` : ''}`}
                    >
                        <p className="mb-0 py-3">
                            <img
                                // src={
                                //     entries && entries.length && entries[key].isIntersecting
                                //         ? 'https://picsum.photos/200'
                                //         : ''
                                // }
                                alt=""
                                key={key}
                            />
                            {props.data.id && <>#{user.id} - </>} {props.data.name && user.name}
                            {props.data.actions && (
                                <button
                                    onClick={() => {
                                        createEditUser(user);
                                    }}
                                    className={`btn btn-outline btn-outline-${
                                        key % 2 === 0 ? 'warning' : 'danger'
                                    } float-end py-0`}
                                >
                                    Edit
                                </button>
                            )}
                        </p>
                    </Row>
                ))}
            </div>

            {users.length > 0 && pagination ? (
                <Row className="mt-5">
                    <PaginationWrapper
                        totalItems={totalItems}
                        pageSize={SITE_CONFIG.PAGE_SIZE}
                        page={currentPage}
                        onPaginationChange={paginationChange}
                    />
                </Row>
            ) : users.length > 0 && !pagination ? (
                ''
            ) : (
                'Loading Users'
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
