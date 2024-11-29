// server.js
const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config(); // Charge les variables d'environnement depuis le fichier .env

const app = express();
const PORT = 3000;

// Charger la clé API depuis le fichier .env
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = "votre-utilisateur/mon-repository"; // Remplacez par votre utilisateur et dépôt GitHub
const FILE_PATH = "users.json"; // Le fichier où vous stockez les utilisateurs dans votre dépôt GitHub

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Endpoint pour récupérer les utilisateurs (si authentifiés)
app.get("/users", async (req, res) => {
    try {
        const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs.");
        const data = await response.json();
        const users = JSON.parse(Buffer.from(data.content, "base64").toString());
        res.json(users); // Retourne la liste des utilisateurs
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur interne." });
    }
});

// Endpoint pour ajouter un utilisateur lors de l'inscription
app.post("/users", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Récupérer les utilisateurs actuels
        const response = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
            headers: { Authorization: `token ${GITHUB_TOKEN}` }
        });

        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs.");
        const data = await response.json();
        const sha = data.sha; // SHA du fichier actuel
        const users = JSON.parse(Buffer.from(data.content, "base64").toString());

        // Vérifier si l'utilisateur existe déjà
        if (users.find(user => user.email === email)) {
            return res.status(400).json({ error: "Utilisateur déjà existant." });
        }

        // Ajouter le nouvel utilisateur
        users.push({ email, password });

        // Mettre à jour le fichier sur GitHub
        const updateResponse = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE_PATH}`, {
            method: "PUT",
            headers: {
                Authorization: `token ${GITHUB_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: "Ajout d'un nouvel utilisateur",
                content: Buffer.from(JSON.stringify(users, null, 2)).toString("base64"),
                sha: sha
            })
        });

        if (!updateResponse.ok) throw new Error("Erreur lors de la mise à jour des utilisateurs.");
        res.json({ message: "Utilisateur ajouté avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur interne." });
    }
});

// Lancer le serveur
app.listen(PORT, () => console.log(`Backend lancé sur http://localhost:${PORT}`));
