document.getElementById('admin').addEventListener('click', function() {
    fetch(`/admin`)
        .then(response=>{
            if (response.ok){

                window.location.href = '/admin1';
            }
        })
});