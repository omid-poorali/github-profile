import { IDBPDatabase, openDB } from 'idb';

let database: IDBPDatabase;

function IndexedDB(dbName: string, tableNames: string[]) {

    const connectDB = async () => {

        if (database) {
            return database;
        }

        database = await openDB(dbName, 1, {
            upgrade(db: IDBPDatabase) {
                for (const tableName of tableNames) {
                    if (db.objectStoreNames.contains(tableName)) {
                        continue;
                    }
                    db.createObjectStore(tableName, { autoIncrement: true, keyPath: 'id' });
                }
            },
        })

        return database;
    }

    const getValue = async (tableName: string, id: number) => {
        const db = await connectDB();
        const tx = db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        console.log('Get Data ', JSON.stringify(result));
        return result;
    }

    const getAllValue = async (tableName: string) => {
        const db = await connectDB();
        const tx = db.transaction(tableName, 'readonly');
        const store = tx.objectStore(tableName);
        const result = await store.getAll();
        console.log('Get All Data', JSON.stringify(result));
        return result;
    }

    const putValue = async (tableName: string, value: object) => {
        const db = await connectDB();
        const tx = db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.put(value);
        console.log('Put Data ', JSON.stringify(result));
        return result;
    }

    const putBulkValue = async (tableName: string, values: object[]) => {
        const db = await connectDB();
        const tx = db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        for (const value of values) {
            const result = await store.put(value);
            console.log('Put Bulk Data ', JSON.stringify(result));
        }
        return getAllValue(tableName);
    }

    const deleteValue = async (tableName: string, id: number) => {
        const db = await connectDB();
        const tx = db.transaction(tableName, 'readwrite');
        const store = tx.objectStore(tableName);
        const result = await store.get(id);
        if (!result) {
            console.log('Id not found', id);
            return result;
        }
        await store.delete(id);
        console.log('Deleted Data', id);
        return id;
    }

    return {
        getValue,
        getAllValue,
        putValue,
        putBulkValue,
        deleteValue
    }
}

export default IndexedDB;