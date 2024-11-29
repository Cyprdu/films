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


// script.js
const API_BASE_URL = "http://localhost:3000";

// Gestion de la connexion
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const users = await response.json();

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            alert("Connexion réussie !");
            sessionStorage.setItem("isLoggedIn", true);
            window.location.href = "index.html";
        } else {
            alert("Email ou mot de passe incorrect.");
        }
    } catch (err) {
        console.error(err);
        alert("Erreur lors de la connexion.");
    }
});

// Gestion de l'inscription
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            alert("Compte créé avec succès !");
            window.location.href = "login.html";
        } else {
            const error = await response.json();
            alert(error.error || "Erreur lors de la création du compte.");
        }
    } catch (err) {
        console.error(err);
        alert("Erreur lors de la création du compte.");
    }
});

