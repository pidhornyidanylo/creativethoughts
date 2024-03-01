import { useState } from 'react';

const useFormState = (action, initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await action(formData); 
      if (result && result.error) {
        setError(result.error);
      } else {
        setError(null); 
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    setError(null);
  };

  return { formData, handleChange, handleSubmit, resetForm, error };
};

export default useFormState;
