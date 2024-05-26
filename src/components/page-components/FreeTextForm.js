import React, { useState } from 'react';
import { fetchData } from '../../api/generic/fetch-data';
import { postData } from '../../api/generic/post-data';

const FreeTextForm = ({ onDataReceived, isLoading, onLoad }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const getData = async (value) => {
        try {
            onLoad(true);
            const postedData = await postData(value);
            onDataReceived(postedData.message);
            onLoad(false);
        } catch (error) {
            // Handle the error appropriately in your component
        }
    };

    const fetchRandomData = async () => {
        try {
            onLoad(true);
            const fetchedData = await fetchData();
            onDataReceived(fetchedData.message);
            onLoad(false);
        } catch (error) {
            // Handle the error appropriately in your component
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();        
        getData(inputValue);
    };

    const handleFetchRandomRecord = () => {
        fetchRandomData();
    };

    return (
        <form onSubmit={handleSubmit} >
            <div>
                <label htmlFor="freeTextInput">Enter text: </label>
                <input
                    type="text"
                    id="freeTextInput"
                    disabled={isLoading}
                    value={inputValue}
                    onChange={handleInputChange}
                />
            </div>
            <button 
                type="submit"
                disabled={isLoading}
            >
                Save text to DB
            </button>
            <button 
                type="button"
                disabled={isLoading}
                onClick={() => {
                        onDataReceived(undefined);
                        setInputValue('');
                    }
                }
            >
                Clear text box input
            </button>
            <button 
                type="button"
                disabled={isLoading}
                onClick={() => {
                        onDataReceived(undefined);
                        handleFetchRandomRecord();
                    }
                }
            >
                Fetch random historical text from DB
            </button>
            <button 
                type="button"
                disabled={isLoading}
                onClick={() => {
                        onDataReceived(undefined);
                        setInputValue('');
                }
                }
            >
                Delete current text from DB
            </button>
        </form>
    );
};

export default FreeTextForm;
