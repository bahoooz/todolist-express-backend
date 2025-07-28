# 🔧 Todolist Backend – Express.js + Prisma + SQLite

API RESTful pour la todolist, codée en TypeScript avec Express.js, Prisma et une base SQLite.  

Développée en 2 jours.

---

## 🚀 Stack utilisée

- 🛠️ [Express.js](https://expressjs.com/)
- 🔄 [Prisma](https://www.prisma.io/) avec base SQLite
- 🔷 TypeScript
- 📡 API RESTful (`GET`, `POST`, `PATCH`, `DELETE`)
- 🔐 CORS configuré pour permettre la communication avec le frontend

---

## 📂 Structure

```
/prisma
  - schema.prisma
/src
  /item
    - item.controller.ts
    - item.routes.ts
  /lib
    - prisma.ts
  - index.ts  // Entrée serveur
```

---

## ⚙️ Lancer le backend

```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev --name init
pnpm dev
```

Serveur en écoute sur [http://localhost:4000](http://localhost:4000)

---

## ✨ Fonctionnalités de l’API

- `GET /items` → Récupère toutes les tâches
- `POST /items` → Crée une nouvelle tâche
- `PATCH /items/:id` → Met à jour une tâche existante
- `DELETE /items/:id` → Supprime une tâche

---

## 🔒 Sécurité & bonnes pratiques

- CORS configuré pour accepter `http://localhost:3000`
- Typage strict (`Request`, `Response`, `Promise<Response>`)
- Gestion des erreurs avec `try/catch` dans chaque controller
- Données persistées localement via SQLite

---

## 🙋‍♂️ À propos

👨‍💻 **Bahoz** – Développeur web fullstack (Express / Prisma / TypeScript)  
📍 Paris – [Mon site web](https://bahoz-dev.com)