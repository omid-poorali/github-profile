import React, { useEffect, useState } from "react";
import { UIKIT } from "components";
import { useParams } from "react-router-dom";
import * as APIs from "apis";
import Skeleton from "react-loading-skeleton";


export const Profile = () => {

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<any>({});
    const [repositories, setRepositories] = useState<any>([]);
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
        <div className="gui-profile">
            <div className="info">
                <div>
                    <UIKIT.Avatar className="avatar" image={profile?.avatar_url} />
                </div>
                <div>
                    {loading ? <Skeleton width="10vw" count={3} /> : (
                        <h1>
                            <div className="title">{profile.name}</div>
                            <div className="subtitle">{profile.login}</div>
                        </h1>
                    )}
                </div>
            </div>
            <div className="repos">
                <div className="list">
                    {loading ? <Skeleton className="list-item" count={3} /> : (
                        <>
                            {React.Children.toArray(repositories.map((repository: any) => {
                                return (
                                    <div className="list-item">
                                        <div className="name">{repository.name}</div>
                                        <div className="description">{repository.description}</div>
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