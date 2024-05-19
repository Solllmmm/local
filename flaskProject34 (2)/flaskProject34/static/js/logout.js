document.getElementById('logoutc').addEventListener('click', function() {
    fetch(`/logout`)
    .then(response => {
        if (response.ok) {
            window.location.href = '/login';
        }
    });
});