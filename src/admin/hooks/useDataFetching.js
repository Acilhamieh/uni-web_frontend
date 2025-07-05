import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

export const useDataFetching = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Fetch data from database
      const response = await fetch(endpoint);

      const result = await response.json();

      //console.log(mockData[endpoint])
      //setData(mockData.endpoint);

      if (response.ok) {
        console.log('Fetched data:', result);
        setData(result.data);
        setError(null);

      } else {
        console.log("response error");
        setError('Error fetching data');
      }

    } catch (err) {
      console.log("request not send")
      setError('Error fetching data');
      toast.error('Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (newData, endpoint) => {
    try {
      console.log("newData", newData);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newData),
      });

      const result = await response.json();

      if (result.success) {
        // Add the returned data from API to the state
        setData([...data, result.data]);
        toast.success(result.message);
      }

      else{
        toast.error(result.message);
      }

    } catch (err) {
      toast.error('Error creating item');
      throw err;
    }
  };

  const handleUpdate = async (updatedData, endpoint) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
  
      const response = await fetch(`${endpoint}${updatedData.id}`, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      const result = await response.json();
  
      if(result.success){
        setData(data.map(item => item.id === updatedData.id ? result.data : item));
        toast.success(result.message);
      }
      else{
        toast.error(result.message);
      }
      
    } catch (err) {
      toast.error('Error updating item');
      throw err;
    }
  };

  const handleDelete = async (id, endpoint) => {
    try {
      // Make DELETE request to the API
      const response = await fetch(`${endpoint}${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.json();

      if (result.success) {
        // Remove the deleted item from state
        setData(data.filter(item => item.id !== id));
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error('Error deleting item');
      throw err;
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return {
    data,
    loading,
    error,
    handleCreate,
    handleUpdate,
    handleDelete,
    refetch: fetchData
  };
}; 