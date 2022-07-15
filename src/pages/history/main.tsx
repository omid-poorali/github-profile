import { useNavigate, generatePath } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import IndexedDB from "helpers/idb";
import * as Utils from "utils";
import * as Models from "models";
import * as Names from "names";
import * as Routes from "routes";

export const History = () => {

    const navigate = useNavigate();
    const [history, setHistory] = useState<Models.History[]>([]);

    useEffect(() => {
        const runIndexDb = async () => {
            const indexedDB = IndexedDB(Names.DBs.history, [Names.Stores.searchedTerms]);
            indexedDB.getAllValue(Names.Stores.searchedTerms).then(history => {
                setHistory(() => history);
            }).catch(() => {
                toast.error("something went wrong", { className: "error-toast" });
            });
        }
        runIndexDb();
    }, [])

    const handleOnItemClick = (item: Models.History) => {
        navigate(generatePath(Routes.Users.PROFILE, { username: item.term }));
    }

    const classes = {
        root: "history-page",
        list: "history-page-list",
        item: "history-page-list-item"
    }

    const sortedHistory = history.sort((a:Models.History, b:Models.History) => {
        return b.searchedAt - a.searchedAt;
    });

    return (
        <div className={classes.root}>
            <ul className={classes.list}>
                {React.Children.toArray(sortedHistory.map((item: Models.History) => (
                    <li className={classes.item} onClick={() => handleOnItemClick(item)}>
                        <span>{item.term}</span>
                        <span>{Utils.Date.getLocaleString(item.searchedAt)}</span>
                    </li>
                )))}
            </ul>
        </div>
    );
}