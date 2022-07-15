import React, { useEffect, useState } from "react";
import { UIKIT } from "components";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import * as APIs from "apis";
import * as Models from "models";

export const Profile = () => {

    const [loading, setLoading] = useState<boolean>(true);
    const [profile, setProfile] = useState<Models.User>();
    const [repositories, setRepositories] = useState<Models.Repository[]>([]);
    const params = useParams();

    useEffect(() => {
        if (params.username) {
            Promise.all([
                APIs.users().getUserInfo(params.username),
                APIs.users().getUserRepos(params.username)]).then(result => {
                    setProfile(() => result[0]);
                    setRepositories(() => result[1]);

                }).finally(() => {
                    setLoading(() => false);
                });

        }
    }, [params.username]);

    const classes = {
        root: "profile-page",
        info: {
            root: "profile-page-info",
            avatar: "profile-page-info-avatar",
            name: "profile-page-info-name",
            username: "profile-page-info-username",
        },
        repos: "profile-page-repos-list",
        repo: {
            root: "profile-page-repos-list-item",
            name: "profile-page-repos-list-item-name",
            description: "profile-page-repos-list-item-description"
        }
    }


    return (
        <div className={classes.root}>
            <div className={classes.info.root}>
                <div>
                    <UIKIT.Avatar className={classes.info.avatar} image={profile?.avatar_url} />
                </div>
                <div>
                    {loading ? <Skeleton width="10vw" count={3} /> : (
                        <h1>
                            <div className={classes.info.name}>{profile?.name}</div>
                            <div className={classes.info.username}>{profile?.login}</div>
                        </h1>
                    )}
                </div>
            </div>
            <div className={classes.repos}>
                <h2>Repositories</h2>
                <ul >
                    {loading ? <Skeleton className={classes.repo.root} count={3} /> : (
                        <>
                            {React.Children.toArray(repositories.map((repository: Models.Repository) => {
                                return (
                                    <li className={classes.repo.root}>
                                        <h3 className={classes.repo.name}>{repository.name}</h3>
                                        <p className={classes.repo.description}>{repository.description}</p>
                                    </li>
                                )
                            }))}
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
}