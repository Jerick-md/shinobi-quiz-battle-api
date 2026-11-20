# SHINOBI QUIZ BATTLE API

Backend API for ** Shinobi Quiz Battle **, a tournament game for the SorSU Bulan Campus library.
CS 313 Software Engineering 1, A.Y. 2026-2027.

- Developer: Jerick T.  Comedia (Jerick-md), BSCS 3-1
- Group and game concept: Group 2

This is my own build of my group's game concept. Every commit in this repository was made by me, with Git, on my own computer or in my own Codespace.

## Tech stack

| Layer | Tool |
|---|---|
| Runtime | Node.js 22 LTS or newer |
| Web framework | Express 5 |
| Database | PostgreSQL 16 or newer |
| ORM and migrations | Sequelize 6 with sequelize-cli |

## Setup

```
git clone https://github.com/Jerick-md/shinobi-quiz-battle-api.git
cd shinobi-quiz-battle-api
npm install
```

Copy `.env.example` to `.env`, then put your own PostgreSQL password in `DB_PASSWORD`.

```
npm run db:create     (first time only)
npm run db:migrate
npm run db:seed
npm run db:check
npm run dev
```

## Environment variables

| Key | Example | Purpose |
|---|---|---|
| NODE_ENV | development | Which config block to use |
| PORT | 3001 | Port the API listens on (the library assigns the final port at deployment) |
| DB_HOST | 127.0.0.1 | PostgreSQL host |
| DB_PORT | 5432 | PostgreSQL port |
| DB_NAME | your_game_slug | Database name: your game slug, with underscores |
| DB_USER | postgres | Database user |
| DB_PASSWORD | (your own) | Database password. Never commit this. |
| HUB_API_KEY | dev-hub-key | Key the Library Game Hub sends to read results. The library gives the real one at deployment. |

## Endpoints

Base URL: `http://localhost:3001/api/v1`

### Hub Contract Endpoints

| Method | URL | Who may call | Purpose |
|---|---|---|---|
| GET | `/health` | Public | Check API and database status |
| GET | `/game-info` | Public | Get game information |
| GET | `/results` | Library Game Hub (`X-Hub-Key` required) | Get finished games and player results |

### Module 1 — Question Sets

| Method | URL | Who may call | Purpose |
|---|---|---|---|
| GET | `/question-sets` | HOST | List question sets |
| POST | `/question-sets` | HOST | Create a question set |
| GET | `/question-sets/:id` | HOST | Get one question set |
| PATCH | `/question-sets/:id` | HOST | Update a question set |
| DELETE | `/question-sets/:id` | HOST | Delete a question set |

### Module 2 — Sessions and Joining

| Method | URL | Who may call | Purpose |
|---|---|---|---|
| POST | `/sessions` | HOST | Create a game session |
| GET | `/sessions/:code` | Public | Read a game session using its join code |
| GET | `/sessions/:code/players` | Public | List players in a game session |
| POST | `/sessions/:code/players` | Authenticated user | Join or rejoin a game session |
| PATCH | `/sessions/:code` | HOST | Change the game session status |

**Note:** `:id` is the question set ID. `:code` is the six-digit game session join code. `X-Demo-User` is used for demo user identification during development.

## What "completed" means in my game

A player is considered to have completed the game after answering every question in the session, whether their answers are right or wrong. Players who leave the game or fail to answer all questions are marked as incomplete.

## Tables

1.users
2.QuestionSet
3.GameSession
4.Player
5.Question
6.Answer
7.RewardRound
8.RewardObject

## Database scripts

| Command | What it does |
|---|---|
| npm run db:migrate | Runs migrations that have not run yet |
| npm run db:migrate:status | Lists every migration as up or down |
| npm run db:seed | Loads the seed data |
| npm run db:check | Counts the rows in every table |
| npm run db:reset | Empties the database, rebuilds every table and reloads the seed data |
| npm run check | Runs the same automatic check that GitHub runs after every push |
