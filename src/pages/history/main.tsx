import { useNavigate, generatePath } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { IndexedDb } from "helpers";
import * as Names from "names";
import * as Routes from "routes";

export const History = () => {

    const navigate = useNavigate();
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const runIndexDb = async () => {
            const indexedDb = new IndexedDb(Names.DBs.history);
            await indexedDb.createObjectStore([Names.Stores.searchedTerms]);
            indexedDb.getAllValue(Names.Stores.searchedTerms).then(history => {
                setHistory(history);
            }).catch(err => console.log(err));
        }
        runIndexDb();
    }, [])

    const handleOnItemClick = (item: any) => {
        navigate(generatePath(Routes.Users.PROFILE, { username: item.term }));
    }

    return (
        <div className="gui-history">
            <div className="list">
                {React.Children.toArray(history.map((item: any) => (
                    <div className="list-item" onClick={() => handleOnItemClick(item)}>
                        {item.term}
                    </div>
                )))}
            </div>
        </div>
    );
}