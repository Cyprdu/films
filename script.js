document.getElementById('search-bar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const channels = document.querySelectorAll('.channel');
    
    channels.forEach(channel => {
        const channelName = channel.querySelector('span').textContent.toLowerCase();
        if (channelName.includes(query)) {
            channel.style.display = 'block';
        } else {
            channel.style.display = 'none';
        }
    });
});
