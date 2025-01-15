import axios from "axios"

export const apiMiddleware =
    ({ dispatch }) =>
        (next) =>
            async(action) => {
                const BASE_URL = 'http://localhost:8000/api/v1'
                if (action.type === 'api/makeCall') {
                    next(action)
                    const { url, onStart, onSuccess, onError } = action.payload
                    dispatch({
                        type: onStart,
                    })
                    try {
                        const response = await axios.get(`${BASE_URL}/${url}`,{
                            withCredentials: true
                        })
                        const data = response.data;
                        dispatch({
                            type: onSuccess,
                            payload: url == "user/me" ? data.user : data.data.tasks,
                        })
                    } catch (err) {
                        dispatch({
                            type: onError,
                            payload: err.response.data.message
                        })
                    }
                }
                else {
                    next(action)
                }
            }

export const fetchData = (payload) => ({ type: 'api/makeCall', payload })
