import React, { useEffect, useState } from "react";
import { UIKIT } from "components";
import { useParams } from "react-router-dom";
import * as APIs from "apis";


export const Profile = () => {

    const [profile, setProfile] = useState<any>({});
    const [repositories, setRepositories] = useState<any>([]);
    const params = useParams();

    useEffect(() => {
        if (params.username) {
            APIs.users().getUserInfo(params.username).then((result) => {
                console.log(result);
                setProfile(result);
            }).catch(err => {
                console.log(err);
            })

            APIs.users().getUserRepos(params.username).then((result) => {
                console.log(result);
                setRepositories(result);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [params.username]);

    return (
        <div className="gui-profile">
            <div className="info">
                <div>
                   <UIKIT.Avatar className="avatar"  image={profile?.avatar_url}/>
                </div>
                <div>
                    <h1>
                        <div className="title">{profile.name}</div>
                        <div className="subtitle">{profile.login}</div>
                    </h1>
                </div>
            </div>
            <div className="repos">
                <div className="list">
                    {React.Children.toArray(repositories.map((repository: any) => {
                        return (
                            <div className="list-item">
                                <div className="name">{repository.name}</div>
                                <div className="description">{repository.description}</div>
                            </div>
                        )
                    }))}
                </div>
            </div>
        </div>
    );
}