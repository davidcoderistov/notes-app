import { useState } from 'react';


const useFormValue = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleOnValueChange = event => {
        setValue(event.target.value);
    };

    return [value, handleOnValueChange]
};

export { useFormValue }
