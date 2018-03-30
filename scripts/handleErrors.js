define(function () {

    function handleInputError() {
        
        document.querySelector('.form-control').classList.add('is-invalid');
        return;
    }

    function clearError() {

        document.querySelector('.form-control').classList.remove('is-invalid');

    }

    document.getElementById('search-place-btn').addEventListener('blur', clearError);


    return {

        handleInputError: handleInputError,
    };
});