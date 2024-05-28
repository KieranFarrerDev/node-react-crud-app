import React, { useState } from 'react';
import { fetchData } from '../../api/generic/fetch-data';
import { postData } from '../../api/generic/post-data';
import { deleteData } from '../../api/generic/delete-data';


const FreeTextForm = ({ onDataReceived, isLoading, onLoad, textId }) => {
    const [inputValue, setInputValue] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const handleInputChange = (event) => {
        setIsDisabled(event.target.value === '');
        setInputValue(event.target.value);
    };

    const postDataCall = async (value) => {
        try {
            onLoad(true);
            const postedData = await postData(value);
            onDataReceived(postedData.message);
            onLoad(false);
        } catch (error) {
            // Handle the error appropriately in your component
        }
    };

    const fetchRandomDataCall = async () => {
        try {
            onLoad(true);
            const fetchedData = await fetchData();
            onDataReceived(fetchedData.message);
            onLoad(false);
        } catch (error) {
            // Handle the error appropriately in your component
        }
    };

    const deleteDataCall = async () => {
        try {
            onLoad(true);
            const fetchedData = await deleteData(textId);
            onDataReceived(fetchedData.message);
            onLoad(false);
        } catch (error) {
            // Handle the error appropriately in your component
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();        
        postDataCall(inputValue);
    };

    const handleFetchRandomRecord = () => {
        fetchRandomDataCall();
    };

    const handleDeleteRecord = () => {
        deleteDataCall();
        onDataReceived(undefined);
        setInputValue('');
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
                disabled={isLoading || isDisabled}
            >
                Save text to DB
            </button>
            <button 
                type="button"
                disabled={isLoading || isDisabled}
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
                    handleDeleteRecord();
                }
                }
            >
                Delete current text from DB
            </button>
        </form>
    );
};

export default FreeTextForm;
