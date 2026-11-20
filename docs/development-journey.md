# Development journey: [your game title] API

Student: [your name] · Section: [3-1 or 3-2] · Group: [group name]

One entry per milestone, written the week you did it. Newest at the bottom.

## M1 · Accounts, passwords and tokens
- Dates worked: Nov 20 to [end date], 2026 · Time spent: [hours so far]
- Goal: Add real accounts to my API: register, login, JWT tokens and roles.
- What I built: So far, the Setup. I installed the Weeks 12-18 kit, merged its
  src/models/user.js and src/repositories/user.repository.js with my Week 11 versions,
  and added JWT_SECRET and CORS_ORIGINS to src/config/env.js.
  [Add the migration, seeder, validators, service, controller and routes as I finish them.]
- Evidence: [pull request link, once it is open] · 384ab6f · [two more commit hashes]
- Problem I hit: My users seed data used lowercase roles ('host', 'player'), but the
  module uses uppercase PLAYER, HOST and ADMIN (for example requireUser('ADMIN')).
  The kit's User model also expected a created_at column that my users table does not have.
- How I solved it: I compared the kit's files with my model and migration. I kept my
  column sizes and timestamps: false, and set the default role to 'PLAYER'.
  [Add how I fixed the existing lowercase roles once I do it.]
- Decision I made and why: I did not edit my Week 10 seeder (demo-users.js). I will add a
  new migration and seeder instead. The cost is two extra files to maintain.
- Changes to my design set: role values become uppercase; the users table gets
  password_hash (STRING 60, nullable).
- What I would explain to a classmate: [one idea from the M1 Learn box in my own words,
  for example why a wrong password and an unknown school ID must give the same 401]
- AI tools: I used Claude to [say exactly what for, for example explain the kit setup,
  compare my files with the kit's, and draft migration code]. I can explain every line I submit.

## M2 · The question bank

## M3 · Gameplay

## M4 · Automated tests and server preparation

## M5 · API documentation and deployment

## M6 · The SE1 portfolio and the release

## M7 · The Test Report
