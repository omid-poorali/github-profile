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

    return (
        <div className="profile-page">
            <div className="profile-page-info">
                <div>
                    <UIKIT.Avatar className="profile-page-info-avatar" image={profile?.avatar_url} />
                </div>
                <div>
                    {loading ? <Skeleton width="10vw" count={3} /> : (
                        <h1>
                            <div className="profile-page-info-title">{profile?.name}</div>
                            <div className="profile-page-info-subtitle">{profile?.login}</div>
                        </h1>
                    )}
                </div>
            </div>
            <div>
                <div className="profile-page-repos-list">
                    {loading ? <Skeleton className="profile-page-repos-list-item" count={3} /> : (
                        <>
                            {React.Children.toArray(repositories.map((repository: Models.Repository) => {
                                return (
                                    <div className="profile-page-repos-list-item">
                                        <div className="profile-page-repos-name">{repository.name}</div>
                                        <div className="profile-page-repos-description">{repository.description}</div>
                                    </div>
                                )
                            }))}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}