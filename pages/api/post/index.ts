import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  const { title, content } = req.body;
  delete req.body;
  const headers = req.headers;
  console.log("cookie: ",headers.cookie);
  const session = await getSession({ req });
  console.log(session);
  console.log(session?.user);
  console.log(session?.user?.email);
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}