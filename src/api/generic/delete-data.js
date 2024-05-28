export const deleteData = async (textId) => {
    try {
        const response = await fetch('/api/data', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ textId }) // Convert object to JSON string
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error so the caller can handle it
    }
};