# fantasy-draft-helper

Next.js fullstack applicaiton that allows users to create their own fnatasy player rankings with the ability to add players to the list, remove players, and rearrange players by dragging and dropping the player to whatever rank you desire. User's with an account can also save the rankings for future use. You can also filter by positions to see the ranks of your players of a certain position. 

Leveraging Server Actions to reduce the load on the frontend, 'server-only' to implement session creations/verification/deletion using JWT to ensure security.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Technology

Next.js, TypeScript, Tanstack Table, dnd-kit

CSS
- tailwind CSS
- heroicons
- headless UI
- react-icons

ORM
- prisma

DB
- supabase (postgresQL)

Auth
- bcrypt
- jose
- zod - for input validations

Global State
- context API

# Functionalities
- create an account
- add players to rankings
- remove players from ranking, with the ability to undo within 4 seconds
- drag and drop players to anywhere on the list for re rankings purposes
- filter players by positions
- if signed in, ability to save the rankings for future use.
- more to come...

# Video Demo
- https://youtu.be/o_FDW9uwTjI



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
