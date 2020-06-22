/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useContext, useEffect, FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from "graphql-tag";
import SearchHistory from '../map/searchHistory';
import { AuthProvider } from '../../utils/useContext';

// prop
interface Prop {
    setSearchKey: (value: string) => void,
    handleSearch: () => Promise<void>
}

// interface history {
//     userId: string;
//     searchString: string;
//     location: string;
// };

// interface historyData {
//     history: history[];
// }

// interface queryVariable {
//     userID: string | undefined ;
// }

const historyQuery = gql`
query ($userID: String) {
    result(userId: $userID) {
        userId
       searchString
        location
    }
}
`;

const QueryHistory: FC<Prop> = ({ setSearchKey, handleSearch }) => {
    const [searchHistory, setSearchHistory] = useState<any[]>([]);
    const { userId } = useContext(AuthProvider);

    const { loading, data } = useQuery(
        historyQuery,
        { variables: { userID: userId } }
    );

    useEffect(() => {
        //   data.result.map(data)
        if (data && data.result) {
            setSearchHistory(data.result)
        }
    }, [data])

    return (
        <>
            {
                loading ? (<p style={{ textAlign: "center" }}>loading</p>) : (
                    <SearchHistory searchHistory={searchHistory} setSearchKey={setSearchKey} handleSearch={handleSearch} />
                )
            }
        </>
    )
}

export default QueryHistory;