import {useEffect, useState} from "react";
import axios from "axios";
import {useAuthContext} from "../store/AuthCtxProvider.jsx";

export default function useApiData(apiUrl, initValue = []) {
    const [dataArray, setDataArray] = useState(initValue);
    const [apiError, setApiError] = useState({})

    const {token} = useAuthContext();

    let configs = {};
    if (token !== '') {
        configs = {
            headers: {'Authorization': token}
        }
    }

    useEffect(() => {
        axios
            .get(apiUrl, configs)
            .then((response) => {
                setDataArray(response.data)
            })
            .catch((error) => {
                setApiError(error)
            })
    }, [apiUrl]);


    return [dataArray, setDataArray, apiError];
}
