import { useNavigate, generatePath } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { IndexedDb } from "helpers";
import * as Models from "models";
import * as Names from "names";
import * as Routes from "routes";

export const History = () => {

    const navigate = useNavigate();
    const [history, setHistory] = useState<Models.History[]>([]);

    useEffect(() => {
        const runIndexDb = async () => {
            const indexedDb = new IndexedDb(Names.DBs.history);
            await indexedDb.createObjectStore([Names.Stores.searchedTerms]);
            indexedDb.getAllValue(Names.Stores.searchedTerms).then(history => {
                setHistory(()=>history);
            }).catch(() => {
                toast.error("something went wrong", { className: "error-toast" });
            });
        }
        runIndexDb();
    }, [])

    const handleOnItemClick = (item: Models.History) => {
        navigate(generatePath(Routes.Users.PROFILE, { username: item.term }));
    }

    return (
        <div className="gui-history">
            <ul className="list">
                {React.Children.toArray(history.map((item: Models.History) => (
                    <li className="list-item" onClick={() => handleOnItemClick(item)}>
                        {item.term}
                    </li>
                )))}
            </ul>
        </div>
    );
}